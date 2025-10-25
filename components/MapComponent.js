import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function MapComponent({ lat, lng, address }) {
  return (
    <div style={{ height: "400px", width: "100%" }}>
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <Marker position={[lat, lng]}>
          <Popup>{address}</Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}

export default MapComponent;
