import { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

type Location = {
  lat: number;
  lng: number;
} | null;

const MapComponent = () => {
  const [location, setLocation] = useState<Location>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error obtaining location:", error);
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  }, []);

  const mapContainerStyle = {
    width: "100%",
    height: "100%",
  };

  const center = location || { lat: 0, lng: 0 }; // Default to (0, 0) if location is null

  return (
    <LoadScript googleMapsApiKey="AIzaSyByA5qgmUsnXcDL7tZLulWCxL5arrjI6XA">
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        center={center}
        zoom={15}
      >
        {location && <Marker position={location} />}
      </GoogleMap>
    </LoadScript>
  );
};

export default MapComponent;
