"use client";

import { useEffect, useState } from "react";
import Map, { Marker } from "react-map-gl";

export default function MapWrapper({
  center,
  setCenter,
  formData,
  setFormData,
}) {
  const [userLocation, setUserLocation] = useState(null);
  const [viewState, setViewState] = useState({
    latitude: center[0],
    longitude: center[1],
    zoom: 18,
  });

  useEffect(() => {
    if ("geolocation" in navigator) {
      const watchId = navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;
          setUserLocation({ latitude, longitude });
        },
        (err) => {
          console.error("Error getting position:", err);
          alert(`خطا: ${err.message}`);
        },
        {
          enableHighAccuracy: true,
          maximumAge: 1000,
          timeout: 5000,
        }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    } else {
      alert("مرورگر شما از موقعیت مکانی پشتیبانی نمی‌کند.");
    }
  }, []);

 
  
  useEffect(() => {
    if (center) {
      setViewState((prev) => ({
        ...prev,
        latitude: center[0],
        longitude: center[1],
      }));
    }
  }, [center]);

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        height: "400px",
        margin: "auto",
        marginTop: "2rem",
        borderRadius: "12px",
        overflow: "hidden",
        boxShadow: "0 0 15px rgba(0,0,0,0.2)",
      }}
    >
      {userLocation ? (
        <Map
          mapboxAccessToken="pk.eyJ1IjoiaHNvbHRhbmkxMyIsImEiOiJjbTlwdnlucHYxOGNrMmlyMDVobXRmYm02In0.3eatUm58bbSFy4JC6dqOCA"
          {...viewState}
          mapStyle="mapbox://styles/mapbox/streets-v11"
          dragPan={true}
          scrollZoom={true} 
          doubleClickZoom={true} 
          touchZoomRotate={true} 
        >
          <Marker latitude={center[0]} longitude={center[1]} color="blue" />
        </Map>
      ) : (
        <p style={{ padding: "2rem", textAlign: "center" }}>
          در حال دریافت موقعیت مکانی شما...
        </p>
      )}
    </div>
  );
}
