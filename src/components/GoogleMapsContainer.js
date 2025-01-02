import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { useState } from "react";
import ToggleMapView from "./ToggleMapView";

const GoogleMapContainer = ({
  mapContainerStyle,
  center,
  zoom,
  onPlaceClick,
  onLoad,
  location,
  options,
}) => {
  const [mapTypeId, setMapTypeId] = useState("hybrid"); // Default to 'hybrid'

  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={zoom}
      onClick={(t) => onPlaceClick(t)}
      onLoad={onLoad}
      options={options}
      mapTypeId={mapTypeId}
    >
      {/* Render the Marker component */}
      {location && <MarkerF position={location} />}

       {/* Button to toggle between hybrid and roadmap views */}
      <ToggleMapView setMapTypeId={setMapTypeId} />

    </GoogleMap>
  );
};

export default GoogleMapContainer;
