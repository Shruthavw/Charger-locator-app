// ToggleMapView.js
import React, { useState } from "react";
import { FaMapMarkedAlt } from "react-icons/fa"; // Icon for the toggle button

const ToggleMapView = ({ setMapTypeId }) => {
  const [mapType, setMapType] = useState("hybrid");

  const toggleMapType = () => {
    // Toggle between 'hybrid' (satellite with labels) and 'roadmap' (standard)
    const nextType = mapType === "hybrid" ? "roadmap" : "hybrid";
    setMapType(nextType); // Update internal state
    setMapTypeId(nextType); // Update map view in parent
  };

  return (
    <button
      onClick={toggleMapType}
      className="absolute bottom-20 left-4 bg-blue-950 p-3 rounded-full shadow-lg flex items-center justify-center z-10"
    >
      <FaMapMarkedAlt size={24} color={"white"} /> {/* Map icon */}
    </button>
  );
};

export default ToggleMapView;
