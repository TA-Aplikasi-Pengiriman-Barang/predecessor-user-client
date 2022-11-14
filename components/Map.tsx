import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { ReactNode } from "react";

export default function Map() {
  
  return (
    <div className="w-full h-full">
      <div className="h-full w-full">
        <MapContainer
          
          center={[-6.366375, 106.829468]}
          zoom={16}
          scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker position={[-6.366375, 106.829468]} draggable={false}>
            <Popup>Hey ! you found me</Popup>
          </Marker>
        </MapContainer>
      </div>

      
    </div>
  );
}

// interface MapProps {
//   children: ReactNode;
// }

// export default function Map(props: MapProps) {
//   const { children } = props;
//   return (
//     <div className="w-full h-full">
//       <div className="h-full w-full z-0">
//         <MapContainer
//           className="z-0"
//           center={[-6.366375, 106.829468]}
//           zoom={16}
//           scrollWheelZoom={false}
//           style={{ height: "100%", width: "100%" }}
//         >
//           <TileLayer
//             attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
//             url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
//           />

//           <Marker position={[-6.366375, 106.829468]} draggable={false}>
//             <Popup>Hey ! you found me</Popup>
//           </Marker>
//         </MapContainer>
//       </div>

//       {children}
//     </div>
//   );
// }
