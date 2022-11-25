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
import busJadwal from "../static/icon/bus/busJadwal.svg";
import Image from "next/image";
import Draggable from "react-draggable";
import halte from "../static/icon/detailHalte/halte.svg";
import terkait from "../static/icon/detailHalte/terkait.svg";
import sekitar from "../static/icon/detailHalte/sekitar.svg";

interface MapProps {
  children: ReactNode;
}
const ws = new WebSocket("wss://api.bikunku.com/bus/stream?type=client");

export default function Map(props: MapProps) {
  // Variabel helper
  const { children } = props;
  const [activePark, setActivePark] = useState<any>(null);
  const { asPath, pathname } = useRouter();
  const router = useRouter();
  const [lat, setLat] = useState(-6.361046716889507);
  const [lng, setLng] = useState(106.8317240044786);
  const [bus, setBus] = useState([]);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [isCentered, setIscenterd] = useState(false);
  const [i, setI] = useState(0);
  const [detailHalte, setDetailHalte] = useState<any>();
  const addActive = (props: number) => {
    setActiveTabIndex(props);
  };
  const array = ["Info Bikun", "Info Halte"];

  // Messaing Websocket
  ws.onopen = () => {
    console.log("connected");
  };
  ws.onmessage = (evt) => {
    setIscenterd(false);
    const message = JSON.parse(evt.data);
    setBus(message);
  };

  // Check already onboarding
  useEffect(() => {
    if (getCookies().isOnboarding) {
    } else {
      router.push({
        pathname: "/onBoarding",
      });
    }
  }, []);

  // switch rute on maps
  const handleRute = () => {
    setI(i + 1);
    if (i === 3) {
      setI(0);
    }
  };

  // get user position
  const getPosition = () => {
    window.navigator.geolocation.getCurrentPosition((position) => {
      setLat(position.coords.latitude);
      setLng(position.coords.longitude);
    });
  };

  // recenter map with user position
  const RecenterAutomatically = ({ lat: x, lng: y }) => {
    const map = useMap();
    useEffect(() => {
      map.setView([x, y]);
    }, [x, y]);
    return null;
  };

  const fetchData = async (park: any) => {
    const req = await fetch(
      "https://api.bikunku.com/terminal/" + park.properties.PARK_ID
    );
    const newData = await req.json();
    console.log(newData.data.name);
    return setDetailHalte(newData.data);
  };

  const DetailHalte = (park: any) => {
    fetchData(park);
  };

  return (
    <div className="w-full">
      {asPath === "/" ? (
        <>
          {/* map component */}
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
                      eventHandlers={{
                        click: (e) => {
                          setActivePark(park);
                          DetailHalte(park);
                        },
                      }}
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
                      eventHandlers={{
                        click: (e) => {
                          setActivePark(park);
                          DetailHalte(park);
                        },
                      }}
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
                          DetailHalte(park);
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
                      eventHandlers={{
                        click: (e) => {
                          setActivePark(park);
                          DetailHalte(park);
                        },
                      }}
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
                      eventHandlers={{
                        click: (e) => {
                          setActivePark(park);
                          DetailHalte(park);
                        },
                      }}
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

          {/* get position icon */}
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

          {/* change rute icon */}
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

          {/* handle detail halte */}
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
                        <div
                          className="absolute top-[4px] right-[30px] bg-base-200 py-1 px-2.5 rounded-lg"
                          onClick={() => {
                            setActivePark(null);
                          }}
                        >
                          X
                        </div>
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
                                      <Image src={busJadwal} alt="" />
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
                                      <Image src={busJadwal} alt="" />
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
                                      <Image src={busJadwal} alt="" />
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
                                      <Image src={busJadwal} alt="" />
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
                                      <Image src={busJadwal} alt="" />
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
                                      <Image src={busJadwal} alt="" />
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
                                      <Image src={busJadwal} alt="" />
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
                                      <Image src={busJadwal} alt="" />
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
                            <div className="flex flex-col justify-center space-y-4">
                              <div>
                                <div className="flex space-x-2">
                                  <Image src={halte} alt="" />
                                  <p className="text-lg">{detailHalte.name}</p>
                                  <p className="bg-blue-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                                    Rute Belok
                                  </p>
                                </div>
                                <hr className="w-2/3 border-[1px] rounded-full" />
                              </div>

                              <div className="flex flex-col">
                                <div className="flex space-x-2 pb-1">
                                  <Image
                                    src={sekitar}
                                    alt=""
                                    className="my-auto w-4 h-6"
                                  />
                                  <div className="flex-col">
                                    <p className="text-lg">Tempat Sekitar</p>
                                    <p className="text-[10px] pl-1 text-[#939393]">
                                      Ketahui tempat sekitar yang dapat anda
                                      kunjungi
                                    </p>
                                  </div>
                                </div>
                                {detailHalte.relatedPlace.map((val: any) => (
                                  <>
                                    <li className="text-sm pl-1.5">{val}</li>
                                  </>
                                ))}
                              </div>
                              <div className="flex flex-col">
                                <div className="flex space-x-2 pb-1">
                                  <Image
                                    src={terkait}
                                    alt=""
                                    className="my-auto w-4 h-6"
                                  />
                                  <div className="flex-col">
                                    <p className="text-lg">Rute Terkait</p>
                                    <p className="text-[10px] pl-1 text-[#939393]">
                                      Ketahui rute terkait halte pilihan anda
                                    </p>
                                  </div>
                                </div>
                                {detailHalte.route === "RED" ? (
                                  <>
                                    {" "}
                                    {detailHalte.relatedTerminal.map(
                                      (val: any, index: number) => (
                                        <>
                                          <div className="flex space-x-6 relative">
                                            <div className="w-4">
                                              {val.id === 1 ? (
                                                <>
                                                  <svg
                                                    className={
                                                      val.past === true
                                                        ? "border-2 border-[#494949] h-4 w-4 rounded-full drop-shadow-xl mt-2"
                                                        : ""
                                                    }
                                                  ></svg>
                                                </>
                                              ) : (
                                                <>
                                                  <svg
                                                    className={
                                                      val.past === true
                                                        ? "bg-[#494949] h-4 my-[-1px] pb-1 w-2 drop-shadow-xl mx-auto"
                                                        : "bg-[#D9D9D9] h-4 my-[-1px] pb-1 w-2 drop-shadow-xl mx-auto"
                                                    }
                                                  ></svg>
                                                  <svg
                                                    className={
                                                      val.past === true
                                                        ? "my-auto border-2 border-[#494949] h-4 w-4 rounded-full drop-shadow-xl"
                                                        : "my-auto border-2 border-[#D9D9D9] h-4 w-4 rounded-full drop-shadow-xl"
                                                    }
                                                  ></svg>
                                                </>
                                              )}
                                            </div>

                                            <p className="absolute bottom-[-4px]">
                                              {val.name}
                                            </p>
                                          </div>
                                        </>
                                      )
                                    )}
                                  </>
                                ) : detailHalte.route === "BLUE" ? (
                                  <>
                                    {detailHalte.relatedTerminal.map(
                                      (val: any, index: number) => (
                                        <>
                                          <div className="flex space-x-6 relative">
                                            <div className="w-4">
                                              {val.id === 17 ? (
                                                <>
                                                  <svg
                                                    className={
                                                      val.past === true
                                                        ? "border-2 border-[#494949] mt-[-2px] h-4 w-4 rounded-full drop-shadow-xl mt-2"
                                                        : "border-2 border-[#D9D9D9] mt-[-2px] h-4 w-4 rounded-full drop-shadow-xl mt-2"
                                                    }
                                                  ></svg>
                                                </>
                                              ) : (
                                                <>
                                                  <svg
                                                    className={
                                                      val.past === true
                                                        ? "bg-[#494949] h-4 my-[-1px] pb-1 w-2 drop-shadow-xl mx-auto"
                                                        : "bg-[#D9D9D9] h-4 my-[-1px] pb-1 w-2 drop-shadow-xl mx-auto"
                                                    }
                                                  ></svg>
                                                  <svg
                                                    className={
                                                      val.past === true
                                                        ? "my-auto border-2 border-[#494949] h-4 w-4 rounded-full drop-shadow-xl"
                                                        : "my-auto border-2 border-[#D9D9D9] h-4 w-4 rounded-full drop-shadow-xl"
                                                    }
                                                  ></svg>
                                                </>
                                              )}
                                            </div>

                                            <p className="absolute bottom-[-4px]">
                                              {val.name}
                                            </p>
                                          </div>
                                        </>
                                      )
                                    )}
                                  </>
                                ) : (
                                  <></>
                                )}
                              </div>
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
          {/* map component */}
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
              {isCentered && <RecenterAutomatically lat={lat} lng={lng} />}
            </MapContainer>
          </div>
          
          {/* get position icon */}
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

          {/* change rute icon */}
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
          {/* non-map component: bantuan, jadwal, & berita bikun */}
          <div className="bg-blue-200">{children}</div>
        </>
      )}
    </div>
  );
}
