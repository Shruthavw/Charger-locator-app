import React, { useState, useRef, useMemo, useEffect } from "react";
import { LoadScript } from "@react-google-maps/api";
import axios from "axios";

import Header from "./components/Header";
import GoogleMapContainer from "./components/GoogleMapsContainer";
import AutocompleteSearch from "./components/AutocompleteSearch";
import GeolocationBtn from "./components/GeolocationBtn";
import UpdateButton from "./components/UpdateButton";
import ChragerInfo from "./components/ChargerInfo";
import ConfirmationModal from "./components/ConfirmationModal";
import Popup from "./components/Popup";
import Loader from "./components/Loader";

// Map Libraries
const libraries = ["places", "marker"];

function App() {
  const [location, setLocation] = useState(null); // Current selected location
  const [map, setMap] = useState(null); // Reference to the Google Map
  const [searchQuery, setSearchQuery] = useState(""); // User input for search
  const autocompleteRef = useRef(null); // Reference for the autocomplete input
  const [center, setCenter] = useState({ lat: 0, lng: 0 }); // Map center coordinates
  const [zoom, setZoom] = useState(2); // Initial map zoom level
  const [showConfirmation, setShowConfirmation] = useState(false); // Toggle confirmation modal
  const [showPopup, setShowPopup] = useState({ visible: false, message: "" }); // Popup message handling
  const [isLoading, setIsLoading] = useState(true); // Loading state for map
  const [depotInfo, setDepotInfo] = useState(null); // Information about the depot

  const mapContainerStyle = useMemo(
    () => ({
      width: "100%",
      height: "75vh",
    }),
    []
  );

  useEffect(() => {
    const fetchDepotInfo = async () => {
      // Fetch depotId and chargerId from the URL
      const depotId = window.location.href.split("/")[4];
      const chargerId = window.location.href.split("/")[5].split("?")[0];
      // Parse the token from the URL
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get("token");
      // Check if the token is present
      if (!token) {
        setShowPopup({
          visible: true,
          message: "Session has expired. Please contact the Incharge person.",
        });
        setIsLoading(false);
        return;
      }
      if (depotId && chargerId) {
        try {
          const response = await axios.get(
            `${process.env.REACT_APP_API_BASE_URL}/charger-locator/${depotId}/${chargerId}/location`,
            { headers: { Authorization: `Bearer ${token}` } }
            // Include token in headers
          );
          const depotData = response.data.response;
          //check if the depotId is valid or exists
          if (depotData && depotData.depotId === depotId) {
            // Check if charger exists for the given depotId
            if (depotData && depotData.chargerId === chargerId) {
              // Set depot and charger information
              setDepotInfo({
                depotName: depotData.depotName,
                depotId: depotData.depotId,
                chargerId: depotData.chargerId,
              });
              // Set map center and marker to depot's coordinates
              const latitude = parseFloat(depotData.address.latitude);
              const longitude = parseFloat(depotData.address.longitude);
              if (!isNaN(latitude) && !isNaN(longitude)) {
                setCenter({ lat: latitude, lng: longitude });
                setLocation({ lat: latitude, lng: longitude });
                setZoom(15);
                // Set appropriate zoom for viewing the depot
              } else {
                setShowPopup({
                  visible: true,
                  message: "Invalid coordinates received for the depot.",
                });
              }
            } else {
              // Show message when chargerId does not belong to the depotId
              setShowPopup({
                visible: true,
                message: "No charger was found for the specified depot.",
              });
            }
          } else {
            //show message when depotId does not exists or not valid
            setShowPopup({
              visible: true,
              message:
                "DepotId does not exists or is in valid. Please log in again",
            });
          }
        } catch (error) {
          if (error.response && error.response.status === 401) {
            // Token has expired
            setShowPopup({
              visible: true,
              message: "Session has expired. Please log in again.",
            });
          } else {
            console.error("Error fetching the charger information", error);
            setShowPopup({
              visible: true,
              message: "Failed to fetch Charger Information.",
            });
          }
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };
    fetchDepotInfo();
  }, []);

  // Event handler for when the map is clicked to set a new location
  const onMapClick = (e) => {
    setLocation({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
    console.log(location);
  };

  // calulate the distance between the selected location and the depot location
  const calulateDistance = (lat1, lng1, lat2, lng2) => {
    const toRadians = (deg) => deg * (Math.PI / 180);
    const earthRadius = 6371 * 1000// In meters

    const deltaLat = toRadians(lat2 - lat1);
    const deltaLng = toRadians(lng2 - lng1);

    const a =  Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2)+
    Math.cos(toRadians(lat1)) *
    Math.cos(toRadians(lat2)) *
    Math.sin(deltaLng / 2) * Math.sin(deltaLng / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return earthRadius * c;
  };

  // Show confirmation modal before updating the location
  const handleUpdateClick = () => {
    const depotLatitude = center.lat;
    const depotLongitude = center.lng;

    if(location){
      const selectedLatitude = location.lat;
      const selectedLongitude = location.lng;

      const distance = calulateDistance(
        depotLatitude, depotLongitude, selectedLatitude, selectedLongitude
      );

      const thresholdDistance = 200 //200 meters

      if(distance <= thresholdDistance){
        setShowConfirmation(true);
      }
      else{
        //show popup if the location is too far
        setShowPopup({
        visible : true,
        message: `The Selected location is too far from the depot Location. Please select the location within the ${thresholdDistance} meters.`,
      });
      setTimeout(() => setShowPopup({ visible: false, message: ""}), 5000);
      }
    }
  };

  const handleConfirm = async () => {
    try {
      const { depotId, chargerId } = depotInfo;

      if (depotId && chargerId && location) {
        await axios.put(
          `${process.env.REACT_APP_API_BASE_URL}/charger-locator/location`,
          {
            latitude: location.lat,
            longitude: location.lng,
            chargerId: chargerId,
            siteId: depotId,
          }
        );

        setShowPopup({
          visible: true,
          message: "Location updated successfully!",
        });
        setTimeout(() => setShowPopup({ visible: false, message: "" }), 3000);
      } else {
        setShowPopup({
          visible: true,
          message: "Depot or Charger ID not found. Failed to update location.",
        });
        setTimeout(() => setShowPopup({ visible: false, message: "" }), 3000);
      }
    } catch (error) {
      console.error("Error updating location:", error);
      setShowPopup({ visible: true, message: "Failed to update location." });
    } finally {
      setShowConfirmation(false);
    }
  };

  // Cancel the update if the user decides not to proceed
  const handleCancel = () => {
    setShowConfirmation(false);
  };

  // Handle place selection
  const handlePlaceSelect = () => {
    const place = autocompleteRef.current.getPlace();
    if (place.geometry) {
      const newLocation = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setLocation(newLocation); // Set the location
      if (map) {
        map.panTo(newLocation);
        map.setZoom(15);
      }
    }
  };

  // Get current user location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(currentLocation); // Set the location to user's current position
          if (map) {
            map.panTo(currentLocation);
            map.setZoom(15);
          }
        },
        () => {
          setShowPopup({
            visible: true,
            message: "Error: The Geolocation service failed.",
          });
          setTimeout(() => setShowPopup({ visible: false, message: "" }), 3000);
        }
      );
    } else {
      setShowPopup({
        visible: true,
        message: "Error: Your browser doesn't support geolocation.",
      });
      setTimeout(() => setShowPopup({ visible: false, message: "" }), 3000);
    }
  };

  // Save the autocomplete instance
  const onLoad = (autocomplete) => {
    autocompleteRef.current = autocomplete;
  };

  const options = {
    tilt: 0,
    rotateControl:false,
    mapTypeId:'hybrid',
    streetViewControl: false,
    mapTypeControl: false,
    fullscreenControl: false,
    zoomControl: false,
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {/* Use LoadScript to load Google Maps API */}
      <LoadScript
        googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY} // Make sure to set your API key here
        libraries={libraries} // Use predefined libraries array
      >
        {/* Header section */}
        <Header />

        {/* Map Section */}
        <div className="relative h-3/4">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {/* Google Map Component */}
              <GoogleMapContainer
                mapContainerStyle={mapContainerStyle}
                center={center}
                zoom={zoom}
                onLoad={setMap}
                onPlaceClick={onMapClick}
                options={options}
                location={location}
              />

              {/* Autocomplete Search */}
              <AutocompleteSearch
                onLoad={onLoad}
                handlePlaceSelect={handlePlaceSelect}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
              />

              {/* Geolocation Button */}
              <GeolocationBtn getCurrentLocation={getCurrentLocation} />
              </>

             
          )}
        </div>

        {/* Information Display Section */}
        <div className="h-1/4 bg-white p-4 flex justify-between items-center">
          <ChragerInfo depotInfo={depotInfo} />
          {showConfirmation && (
            <ConfirmationModal
              handleCancel={handleCancel}
              handleConfirm={handleConfirm}
            />
          )}
          {showPopup.visible && (
            <Popup
              message={showPopup.message}
              onClose={() => setShowPopup({ visible: false, message: "" })}
            />
          )}
           {/* Update Location Button */}
           <UpdateButton onClick={handleUpdateClick} location={location} /> 
           
           
        </div>

      </LoadScript>
    </div>
  );
}

export default App;
