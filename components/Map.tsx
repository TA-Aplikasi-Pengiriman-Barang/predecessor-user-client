import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  Polyline,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { ReactNode, useEffect, useState } from "react";
import * as halteRed from "../data/halteRed.json";
import * as halteBlue from "../data/halteBlue.json";
import * as halteMix from "../data/halteMix.json";
import { iconRed } from "./IconRed";
import { iconBlue } from "./IconBlue";
import { iconMix } from "./IconMix";
import { iconBus } from "./IconBus";
import styles from "./Map.module.css";
import RoutineMachine from "./RoutineMachine";
import RoutineMachine2 from "./RoutineMachine2";
import RoutineMachine3 from "./RoutineMachine3";
import { useRouter } from "next/router";
import { getCookies, hasCookie } from "cookies-next";
import userLoc from "../static/icon/userLoc.svg";
import ruteMap from "../static/icon/ruteMap.svg";
import Image from "next/image";

interface MapProps {
  children: ReactNode;
}

export default function Map(props: MapProps) {
  const { children } = props;
  const [activePark, setActivePark] = useState(null);
  const { asPath, pathname } = useRouter();
  const router = useRouter();
  const [a, setA] = useState(-6.348373127525387);
  const [b, setB] = useState(106.83182325822173);
  const [lat, setLat] = useState(-6.361046716889507);
  const [lng, setLng] = useState(106.8317240044786);
  const [bus, setBus] = useState([]);

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
  ];

  const ws = new WebSocket("wss://api.bikunku.com/bus/stream?type=client");
  useEffect(() => {
    if (getCookies().isOnboarding) {
    } else {
      router.push({
        pathname: "/onBoarding",
      });
    }
    ws.onopen = () => {
      console.log("connected");
    };
    ws.onmessage = (evt) => {
      const message = JSON.parse(evt.data);
      console.log(message);
      console.log(message[0].lat);
      console.log(message[0].long);
      console.log(message[0].heading);
      console.log(message[0].speed);
      setA(message[0].lat);
      setB(message[0].long);
      // message.forEach(val => {

      // });
      // console.log(message)
      // setBus(message);
      // console.log(bus)
    };
  }, []);

  const getPosition = () => {
    window.navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    });
  };

  const RecenterAutomatically = ({ lat: x, lng: y }) => {
    const map = useMap();
    useEffect(() => {
      map.setView([x, y]);
    }, [x, y]);
    return null;
  };

  return (
    <div className="w-full">
      {asPath === "/" ? (
        <>
          {" "}
          <div className="h-[100%] w-full" id="map">
            <MapContainer
              center={[lat, lng]}
              zoom={17}
              // scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
              zoomControl={false}
              attributionControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <RoutineMachine />
              <RoutineMachine2 />
              <RoutineMachine3 />

              {halteRed.features.map((park) => (
                <Marker
                  key={park.properties.PARK_ID}
                  position={[
                    park.geometry.coordinates[0],
                    park.geometry.coordinates[1],
                  ]}
                  // onClick={() => {
                  //   setActivePark(park);
                  // }}
                  icon={iconRed}
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

                  {/* <Popup>
                    <h2 className="font-bold text-center">
                      {park.properties.NAME}
                    </h2>
                    <h2>{park.properties.DESCRIPTIO}</h2>
                  </Popup> */}
                </Marker>
                //   <Marker
                //   key={park.properties.PARK_ID}
                //   position={[
                //     park.geometry.coordinates[0],
                //     park.geometry.coordinates[1],
                //   ]}
                //   // onClick={() => {
                //   //   setActivePark(park);
                //   // }}

                // ></Marker>
              ))}
              {halteBlue.features.map((park) => (
                <Marker
                  key={park.properties.PARK_ID}
                  position={[
                    park.geometry.coordinates[0],
                    park.geometry.coordinates[1],
                  ]}
                  // onClick={() => {
                  //   setActivePark(park);
                  // }}
                  icon={iconBlue}
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

                  {/* <Popup>
                    <h2 className="font-bold text-center">
                      {park.properties.NAME}
                    </h2>
                    <h2>{park.properties.DESCRIPTIO}</h2>
                  </Popup> */}
                </Marker>
                //   <Marker
                //   key={park.properties.PARK_ID}
                //   position={[
                //     park.geometry.coordinates[0],
                //     park.geometry.coordinates[1],
                //   ]}
                //   // onClick={() => {
                //   //   setActivePark(park);
                //   // }}

                // ></Marker>
              ))}
              {halteMix.features.map((park) => (
                <Marker
                  key={park.properties.PARK_ID}
                  position={[
                    park.geometry.coordinates[0],
                    park.geometry.coordinates[1],
                  ]}
                  eventHandlers={{
                    click: (e) => {
                      setActivePark(park);
                    },
                  }}
                  icon={iconMix}
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

                  {/* <Popup>
                    <div className="">
                      <p>LOREM IPSUM</p>
                    </div>
                  </Popup> */}

                  {/* <Popup className="absolute bg-red-200 h-[50vh] w-screen absolute inset-x-0 bottom-[-100%]">
                    <div className="">
                      <p>LOREM IPSUM</p>
                    </div>
                  </Popup> */}
                </Marker>
                //   <Marker
                //   key={park.properties.PARK_ID}
                //   position={[
                //     park.geometry.coordinates[0],
                //     park.geometry.coordinates[1],
                //   ]}
                //   // onClick={() => {
                //   //   setActivePark(park);
                //   // }}

                // ></Marker>
              ))}

              {/* {bus.map((val) => (
                <Marker
                  
                  position={[
                    val?.lat,
                    val?.long,
                  ]}
                  // eventHandlers={{
                  //   click: (e) => {
                  //     setActivePark(park);
                  //   },
                  // }}
                  icon={iconMix}
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
]
                </Marker>

              ))} */}

              <Marker position={[a, b]} icon={iconBus}></Marker>
              <Marker position={[lat, lng]}></Marker>
              {/* <Polyline positions={pos}  className={styles.tes} color="red" /> */}

              <RecenterAutomatically lat={lat} lng={lng} />
              {/* {activePark && (
                <Popup
                  position={[
                    activePark.geometry.coordinates[1],
                    activePark.geometry.coordinates[0],
                  ]}
                  
                >
                  <div className="h-screen w-screen bg-white">
                    <p>LOREM IPSUM</p>
                  </div>
                </Popup>
              )} */}
            </MapContainer>
          </div>
          <div className="flex justify-end">
            <button
              id="front2"
              className={styles.currentPos}
              onClick={() => {
                getPosition();
              }}
            >
              <Image alt="" src={userLoc} />
            </button>
          </div>
          <div className="flex justify-end">
            <button
              id="front2"
              className={styles.rute}
              onClick={() => {
                getPosition();
              }}
            >
              <Image alt="" src={ruteMap} />
            </button>
          </div>
          <div className="bg-blue-200">{children}</div>
        </>
      ) : asPath === "/rute-bikun" ? (
        <>
          <div className="h-[100%] w-full" id="map">
            <MapContainer
              // center={[-6.361046716889507, 106.8317240044786]}
              center={[lat, lng]}
              zoom={17}
              // scrollWheelZoom={false}
              style={{ height: "100%", width: "100%" }}
              zoomControl={false}
              attributionControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <RoutineMachine />
              <RoutineMachine2 />
              <RoutineMachine3 />

              {halteRed.features.map((park) => (
                <Marker
                  key={park.properties.PARK_ID}
                  position={[
                    park.geometry.coordinates[0],
                    park.geometry.coordinates[1],
                  ]}
                  // onClick={() => {
                  //   setActivePark(park);
                  // }}
                  icon={iconRed}
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

                  {/* <Popup>
                    <h2 className="font-bold text-center">
                      {park.properties.NAME}
                    </h2>
                    <h2>{park.properties.DESCRIPTIO}</h2>
                  </Popup> */}
                </Marker>
                //   <Marker
                //   key={park.properties.PARK_ID}
                //   position={[
                //     park.geometry.coordinates[0],
                //     park.geometry.coordinates[1],
                //   ]}
                //   // onClick={() => {
                //   //   setActivePark(park);
                //   // }}

                // ></Marker>
              ))}
              {halteBlue.features.map((park) => (
                <Marker
                  key={park.properties.PARK_ID}
                  position={[
                    park.geometry.coordinates[0],
                    park.geometry.coordinates[1],
                  ]}
                  // onClick={() => {
                  //   setActivePark(park);
                  // }}
                  icon={iconBlue}
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

                  {/* <Popup>
                    <h2 className="font-bold text-center">
                      {park.properties.NAME}
                    </h2>
                    <h2>{park.properties.DESCRIPTIO}</h2>
                  </Popup> */}
                </Marker>
                //   <Marker
                //   key={park.properties.PARK_ID}
                //   position={[
                //     park.geometry.coordinates[0],
                //     park.geometry.coordinates[1],
                //   ]}
                //   // onClick={() => {
                //   //   setActivePark(park);
                //   // }}

                // ></Marker>
              ))}
              {halteMix.features.map((park) => (
                <Marker
                  key={park.properties.PARK_ID}
                  position={[
                    park.geometry.coordinates[0],
                    park.geometry.coordinates[1],
                  ]}
                  // onClick={() => {
                  //   setActivePark(park);
                  // }}
                  eventHandlers={{
                    click: (e) => {
                      setActivePark(park);
                    },
                  }}
                  icon={iconMix}
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

                  {/* <Popup>
                    <div className="">
                      <p>LOREM IPSUM</p>
                    </div>
                  </Popup> */}

                  {/* <Popup className="absolute bg-red-200 h-[50vh] w-screen absolute inset-x-0 bottom-[-100%]">
                    <div className="">
                      <p>LOREM IPSUM</p>
                    </div>
                  </Popup> */}
                </Marker>
                //   <Marker
                //   key={park.properties.PARK_ID}
                //   position={[
                //     park.geometry.coordinates[0],
                //     park.geometry.coordinates[1],
                //   ]}
                //   // onClick={() => {
                //   //   setActivePark(park);
                //   // }}

                // ></Marker>
              ))}

              <Marker position={[a, b]} icon={iconBus}></Marker>
              <Marker position={[lat, lng]}></Marker>
              {/* <Polyline positions={pos}  className={styles.tes} color="red" /> */}

              {/* <RecenterAutomatically lat={lat} lng={lng} /> */}
              {/* {activePark && (
                <Popup
                  position={[
                    activePark.geometry.coordinates[1],
                    activePark.geometry.coordinates[0],
                  ]}
                  
                >
                  <div className="h-screen w-screen bg-white">
                    <p>LOREM IPSUM</p>
                  </div>
                </Popup>
              )} */}
            </MapContainer>
          </div>
          <div className="bg-blue-200">{children}</div>
        </>
      ) : (
        <>
          <div className="bg-blue-200">{children}</div>
        </>
      )}
    </div>
  );
}
