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
import RoutineMachine4 from "./RoutineMachine4";
import { useRouter } from "next/router";
import { getCookies, hasCookie } from "cookies-next";
import userLoc from "../static/icon/userLoc.svg";
import ruteMap from "../static/icon/ruteMap.svg";
import ruteMapBlue from "../static/icon/ruteMapBlue.svg";
import ruteMapRed from "../static/icon/ruteMapRed.svg";
import ruteMapMix from "../static/icon/ruteMapMix.svg";
import gambar1 from "../static/image/donts/1.svg";
import gambar2 from "../static/image/donts/2.svg";
import gambar3 from "../static/image/donts/3.svg";
import gambar4 from "../static/image/donts/4.svg";
import gambar5 from "../static/image/donts/5.svg";
import gambar6 from "../static/image/donts/6.svg";
import busIcon from "../static/icon/bus.svg";
import Image from "next/image";
import Draggable from "react-draggable";

interface MapProps {
  children: ReactNode;
}
const ws = new WebSocket("wss://api.bikunku.com/bus/stream?type=client");

export default function Map(props: MapProps) {
  const { children } = props;
  const [activePark, setActivePark] = useState<any>(null);
  const { asPath, pathname } = useRouter();
  const router = useRouter();
  const [a, setA] = useState(-6.348373127525387);
  const [b, setB] = useState(106.83182325822173);
  const [lat, setLat] = useState(-6.361046716889507);
  const [lng, setLng] = useState(106.8317240044786);
  const [bus, setBus] = useState([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isCentered, setIscenterd] = useState(false);
  const [i, setI] = useState(0);
  const addActive = (props: number) => {
    setActiveTabIndex(props);
  };
  const ruteArr = [0, 1, 2, 3];
  const array = ["Info Bikun", "Info Halte"];

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

  const handleRute = () => {
    setI(i + 1);

    if (i === 3) {
      setI(0);
    }
  };

  ws.onopen = () => {
    console.log("connected");
  };
  ws.onmessage = (evt) => {
    setIscenterd(false);
    const message = JSON.parse(evt.data);

    // console.log(message[0].lat);
    // console.log(message[0].long);
    // console.log(message[0].heading);
    // console.log(message[0].speed);
    // setA(message[0].lat);
    // setB(message[0].long);
    setBus(message);
  };

  // setTimeout(() => {
  //   ws.onopen = () => {
  //     console.log("connected");
  //   };
  //   ws.onmessage = (evt) => {
  //     const message = JSON.parse(evt.data);
  //     console.log(message);
  //     // console.log(message[0].lat);
  //     // console.log(message[0].long);
  //     // console.log(message[0].heading);
  //     // console.log(message[0].speed);
  //     setTimeout(() => {
  //       setA(message[0].lat);
  //       setB(message[0].long);
  //     }, 20000)

  //     // message.forEach(val => {

  //     // });
  //     // console.log(message)
  //     // setBus(message);
  //     // console.log(bus)
  //   };
  // }, 2000);

  useEffect(() => {
    if (getCookies().isOnboarding) {
    } else {
      router.push({
        pathname: "/onBoarding",
      });
    }
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
              style={{ height: "100%", width: "100%" }}
              zoomControl={false}
              attributionControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {i === 0 ? (
                <>
                  {halteRed.features.map((park) => (
                    <Marker
                      key={park.properties.PARK_ID}
                      position={[
                        park.geometry.coordinates[0],
                        park.geometry.coordinates[1],
                      ]}
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
                    </Marker>
                  ))}
                  {halteBlue.features.map((park) => (
                    <Marker
                      key={park.properties.PARK_ID}
                      position={[
                        park.geometry.coordinates[0],
                        park.geometry.coordinates[1],
                      ]}
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
                    </Marker>
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
                          console.log(park);
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
                    </Marker>
                  ))}
                  <RoutineMachine />
                  <RoutineMachine2 />
                  <RoutineMachine3 />
                </>
              ) : i === 1 ? (
                <>
                  {" "}
                  {halteBlue.features.map((park) => (
                    <Marker
                      key={park.properties.PARK_ID}
                      position={[
                        park.geometry.coordinates[0],
                        park.geometry.coordinates[1],
                      ]}
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
                    </Marker>
                  ))}
                  <RoutineMachine4 />
                </>
              ) : i === 2 ? (
                <>
                  {halteRed.features.map((park) => (
                    <Marker
                      key={park.properties.PARK_ID}
                      position={[
                        park.geometry.coordinates[0],
                        park.geometry.coordinates[1],
                      ]}
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
                    </Marker>
                  ))}
                  <RoutineMachine />
                </>
              ) : i === 3 ? (
                <></>
              ) : (
                <></>
              )}

              {bus.map((val: any, index) => (
                <Marker
                  position={[val?.lat, val?.long]}
                  icon={iconBus}
                ></Marker>
              ))}
              <Marker position={[lat, lng]}></Marker>
              {isCentered && <RecenterAutomatically lat={lat} lng={lng} />}
            </MapContainer>
          </div>
          <div className="flex justify-end">
            <button
              id="front2"
              className={styles.currentPos}
              onClick={() => {
                getPosition();
                setIscenterd(true);
              }}
            >
              <Image alt="" src={userLoc} />
            </button>
          </div>
          <div className="flex justify-end">
            {i === 0 ? (
              <>
                {" "}
                <button
                  id="front2"
                  className={styles.rute}
                  onClick={() => {
                    handleRute();
                  }}
                >
                  <Image alt="" src={ruteMapMix} />
                </button>
              </>
            ) : i === 1 ? (
              <>
                {" "}
                <button
                  id="front2"
                  className={styles.rute}
                  onClick={() => {
                    handleRute();
                  }}
                >
                  <Image alt="" src={ruteMapBlue} />
                </button>
              </>
            ) : i === 2 ? (
              <>
                {" "}
                <button
                  id="front2"
                  className={styles.rute}
                  onClick={() => {
                    handleRute();
                  }}
                >
                  <Image alt="" src={ruteMapRed} />
                </button>
              </>
            ) : i === 3 ? (
              <>
                {" "}
                <button
                  id="front2"
                  className={styles.rute}
                  onClick={() => {
                    handleRute();
                  }}
                >
                  <Image alt="" src={ruteMap} />
                </button>
              </>
            ) : (
              <></>
            )}
          </div>
          {activePark === null ? (
            <></>
          ) : (
            <>
              {" "}
              <div className="absolute bottom-[40%] w-full">
                <div id="front2" className="h-screen">
                  <Draggable
                    axis="y"
                    bounds={{ left: 0, top: -300, right: 0, bottom: 50 }}
                    defaultPosition={{ x: 0, y: 0 }}
                    cancel=".not-draggable"
                  >
                    <div className="bg-white rounded-[3rem_3rem_0_0] space-y-2 pt-1 h-[90%]">
                      <div className="py-2">
                        <div className="h-1.5 bg-[#d9d9d9] mx-24 rounded-full flex justify-center"></div>
                      </div>

                      <div className="p-4">
                        <div className="flex flex-row w-full pb-4">
                          {array.map((val, index) => (
                            <>
                              <a
                                className={
                                  index === activeTabIndex
                                    ? "not-draggable w-1/2 text-center text-blue-primary h-8 border-b-4 border-blue-primary"
                                    : "not-draggable w-1/2 text-center text-[#d9d9d9] h-8 border-b-4 border-[#d9d9d9]"
                                }
                              >
                                <div onClick={() => addActive(index)}>
                                  {val}
                                </div>
                              </a>
                            </>
                          ))}
                        </div>
                        <div className="overflow-y-scroll h-[440px] not-draggable space-y-2">
                          {activeTabIndex === 0 ? (
                            <div className="flex flex-col justify-center space-y-2">
                              <div className="h-[65px] border-[1px] rounded-xl p-3 flex justify-between">
                                <div className="flex flex-col justify-center space-y-1">
                                  <div className="flex flex-row space-x-3">
                                    <div className="flex space-x-1">
                                      <Image src={busIcon} alt="" />
                                      <p className="bg-black-primary my-auto px-2.5 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                                        1
                                      </p>
                                    </div>
                                    <p className="bg-blue-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                                      Rute Belok
                                    </p>
                                  </div>
                                  <p className="text-xs">
                                    Senin, 31 Oktober 2022
                                  </p>
                                </div>
                                <p className="my-auto text-xl font-bold">
                                  07:36
                                </p>
                              </div>

                              <div className="h-[65px] border-[1px] rounded-xl p-3 flex justify-between">
                                <div className="flex flex-col justify-center space-y-1">
                                  <div className="flex flex-row space-x-3">
                                    <div className="flex space-x-1">
                                      <Image src={busIcon} alt="" />
                                      <p className="bg-black-primary my-auto px-2.5 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                                        1
                                      </p>
                                    </div>
                                    <p className="bg-blue-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                                      Rute Belok
                                    </p>
                                  </div>
                                  <p className="text-xs">
                                    Senin, 31 Oktober 2022
                                  </p>
                                </div>
                                <p className="my-auto text-xl font-bold">
                                  07:36
                                </p>
                              </div>

                              <div className="h-[65px] border-[1px] rounded-xl p-3 flex justify-between">
                                <div className="flex flex-col justify-center space-y-1">
                                  <div className="flex flex-row space-x-3">
                                    <div className="flex space-x-1">
                                      <Image src={busIcon} alt="" />
                                      <p className="bg-black-primary my-auto px-2.5 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                                        1
                                      </p>
                                    </div>
                                    <p className="bg-blue-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                                      Rute Belok
                                    </p>
                                  </div>
                                  <p className="text-xs">
                                    Senin, 31 Oktober 2022
                                  </p>
                                </div>
                                <p className="my-auto text-xl font-bold">
                                  07:36
                                </p>
                              </div>

                              <div className="h-[65px] border-[1px] rounded-xl p-3 flex justify-between">
                                <div className="flex flex-col justify-center space-y-1">
                                  <div className="flex flex-row space-x-3">
                                    <div className="flex space-x-1">
                                      <Image src={busIcon} alt="" />
                                      <p className="bg-black-primary my-auto px-2.5 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                                        1
                                      </p>
                                    </div>
                                    <p className="bg-blue-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                                      Rute Belok
                                    </p>
                                  </div>
                                  <p className="text-xs">
                                    Senin, 31 Oktober 2022
                                  </p>
                                </div>
                                <p className="my-auto text-xl font-bold">
                                  07:36
                                </p>
                              </div>

                              <div className="h-[65px] border-[1px] rounded-xl p-3 flex justify-between">
                <div className="flex flex-col justify-center space-y-1">
                  <div className="flex flex-row space-x-3">
                    <div className="flex space-x-1">
                      <Image src={busIcon} alt="" />
                      <p className="bg-black-primary my-auto px-2.5 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                        1
                      </p>
                    </div>
                    <p className="bg-blue-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                      Rute Belok
                    </p>
                  </div>
                  <p className="text-xs">Senin, 31 Oktober 2022</p>
                </div>
                <p className="my-auto text-xl font-bold">07:36</p>
              </div>

              <div className="h-[65px] border-[1px] rounded-xl p-3 flex justify-between">
                <div className="flex flex-col justify-center space-y-1">
                  <div className="flex flex-row space-x-3">
                    <div className="flex space-x-1">
                      <Image src={busIcon} alt="" />
                      <p className="bg-black-primary my-auto px-2.5 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                        1
                      </p>
                    </div>
                    <p className="bg-blue-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                      Rute Belok
                    </p>
                  </div>
                  <p className="text-xs">Senin, 31 Oktober 2022</p>
                </div>
                <p className="my-auto text-xl font-bold">07:36</p>
              </div>

              <div className="h-[65px] border-[1px] rounded-xl p-3 flex justify-between">
                <div className="flex flex-col justify-center space-y-1">
                  <div className="flex flex-row space-x-3">
                    <div className="flex space-x-1">
                      <Image src={busIcon} alt="" />
                      <p className="bg-black-primary my-auto px-2.5 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                        1
                      </p>
                    </div>
                    <p className="bg-blue-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                      Rute Belok
                    </p>
                  </div>
                  <p className="text-xs">Senin, 31 Oktober 2022</p>
                </div>
                <p className="my-auto text-xl font-bold">07:36</p>
              </div>

                              <div className="h-[65px] border-[1px] rounded-xl p-3 flex justify-between">
                                <div className="flex flex-col justify-center space-y-1">
                                  <div className="flex flex-row space-x-3">
                                    <div className="flex space-x-1">
                                      <Image src={busIcon} alt="" />
                                      <p className="bg-black-primary my-auto px-2.5 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                                        1
                                      </p>
                                    </div>
                                    <p className="bg-blue-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                                      Rute Belok
                                    </p>
                                  </div>
                                  <p className="text-xs">
                                    Senin, 31 Oktober 2022
                                  </p>
                                </div>
                                <p className="my-auto text-xl font-bold">
                                  07:36
                                </p>
                              </div>
                            </div>
                          ) : activeTabIndex === 1 ? (
                            <div className="flex flex-col justify-center">
                              <p>asa</p>
                            </div>
                          ) : (
                            <></>
                          )}
                        </div>
                      </div>
                    </div>
                  </Draggable>
                </div>
              </div>
            </>
          )}
          <div className="bg-blue-200">{children}</div>
        </>
      ) : asPath === "/rute-bikun" ? (
        <>
          <div className="h-[100%] w-full" id="map">
            <MapContainer
              center={[lat, lng]}
              zoom={17}
              style={{ height: "100%", width: "100%" }}
              zoomControl={false}
              attributionControl={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              {i === 0 ? (
                <></>
              ) : i === 1 ? (
                <>
                  <RoutineMachine />
                  <RoutineMachine2 />
                  <RoutineMachine3 />
                </>
              ) : i === 2 ? (
                <>
                  {" "}
                  <RoutineMachine4 />
                </>
              ) : i === 3 ? (
                <>
                  <RoutineMachine />
                </>
              ) : (
                <></>
              )}

              {/* <RoutineMachine2 />
              <RoutineMachine3 /> */}

              {halteRed.features.map((park) => (
                <Marker
                  key={park.properties.PARK_ID}
                  position={[
                    park.geometry.coordinates[0],
                    park.geometry.coordinates[1],
                  ]}
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
                </Marker>
              ))}
              {halteBlue.features.map((park) => (
                <Marker
                  key={park.properties.PARK_ID}
                  position={[
                    park.geometry.coordinates[0],
                    park.geometry.coordinates[1],
                  ]}
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
                </Marker>
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
                      console.log(park);
                      console.log("park");
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
                </Marker>
              ))}
              <Marker position={[a, b]} icon={iconBus}></Marker>
              <Marker position={[lat, lng]}></Marker>
              {isCentered && <RecenterAutomatically lat={lat} lng={lng} />}
            </MapContainer>
          </div>
          <div className="flex justify-end">
            <button
              id="front2"
              className={styles.currentPos}
              onClick={() => {
                getPosition();
                setIscenterd(true);
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
                handleRute();
              }}
            >
              <Image alt="" src={ruteMap} />
            </button>
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
