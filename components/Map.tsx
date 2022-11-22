import { MapContainer, TileLayer, Marker, Popup, Tooltip, Polyline } from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { ReactNode, useState } from "react";
import * as halteData from "../data/halte.json";
import { iconPerson } from "./Icon";
import styles from "./Map.module.css";
import RoutineMachine from "./RoutineMachine";


interface MapProps {
  children: ReactNode;
}

export default function Map(props: MapProps) {
  const { children } = props;

  const [activePark, setActivePark] = useState(null);

  const pos = [
    [-6.348373127525387, 106.8297679527903],
[-6.353465386293707, 106.83182325822173],
[-6.361046716889507, 106.8317240044786],
[-6.364864762651361, 106.83223079221105],
[-6.368205271318413, 106.83184387661237],
[-6.370190241285223, 106.83109626794518],
[-6.371697905932189, 106.8293758480366],
[-6.371101272862191, 106.82696734342873],
[-6.369838377677364, 106.82575903066468],
[-6.367004060974791, 106.82448615509534],
[-6.366114158411598, 106.82167086626085],
[-6.361069834121701, 106.82321257394592],
[-6.359443306471211, 106.82575218376806],
[-6.361133065901284, 106.82970210098532],
[-6.361723672481245, 106.83030996654941],
[-6.362172631787366, 106.83083040668357],
[-6.348373127525387, 106.8297679527903],
  ]

  const state = {
    lat: 57.74,
    lng: 11.94,
    zoom: 13,
    isMapInit: false
  };
  const saveMap = (map: any) => {
    map = map;
    useState({
      isMapInit: true
    });
  };


  return (
    <div className="w-full">
      <div className="h-[100%] w-full" id="map">
        <MapContainer
          center={[-6.361046716889507, 106.8317240044786]}
          zoom={16}
          // scrollWheelZoom={false}
          style={{ height: "100%", width: "100%" }}
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <RoutineMachine  />
          

          {halteData.features.map((park) => (
            <Marker
              key={park.properties.PARK_ID}
              position={[
                park.geometry.coordinates[0],
                park.geometry.coordinates[1],
              ]}
              // onClick={() => {
              //   setActivePark(park);
              // }}
              icon={iconPerson}
            >
              <Tooltip
                direction="top"
                offset={[0, 0]}
                className={styles.leaflet}
                opacity={1}
                permanent
              >
                {park.properties.NAME}
              </Tooltip>

              <Popup>
                <h2 className="font-bold text-center">
                  {park.properties.NAME}
                </h2>
                <h2>{park.properties.DESCRIPTIO}</h2>
              </Popup>
            </Marker>
            
          ))}
          {/* <Polyline positions={pos}  className={styles.tes} color="red" /> */}
        </MapContainer>
      </div>
      <div className="bg-blue-200">{children}</div>
    </div>
  );
}
// center={[-6.366375, 106.829468]}
