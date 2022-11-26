import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";
import { ReactNode, useEffect, useState } from "react";
import halteRed from "../data/halteRed.json";
import halteBlue from "../data/halteBlue.json";
import halteMix from "../data/halteMix.json";
import iconRed from "./IconRed";
import iconBlue from "./IconBlue";
import iconMix from "./IconMix";
import iconBus from "./IconBus";
import styles from "./Map.module.css";
import RoutineMachine from "./RoutineMachine";
import RoutineMachine2 from "./RoutineMachine2";
import RoutineMachine3 from "./RoutineMachine3";
import RoutineMachine4 from "./RoutineMachine4";
import { useRouter } from "next/router";
import { getCookies } from "cookies-next";
import userLoc from "../public/assets/icon/userLoc.svg";
import ruteMap from "../public/assets/icon/ruteMap.svg";
import ruteMapBlue from "../public/assets/icon/ruteMapBlue.svg";
import ruteMapRed from "../public/assets/icon/ruteMapRed.svg";
import ruteMapMix from "../public/assets/icon/ruteMapMix.svg";
import busJadwal from "../public/assets/icon/bus/busJadwal.svg";
import Image from "next/image";
import Draggable from "react-draggable";
import halte from "../public/assets/icon/detailHalte/halte.svg";
import terkait from "../public/assets/icon/detailHalte/terkait.svg";
import sekitar from "../public/assets/icon/detailHalte/sekitar.svg";
import redCrowd from "../public/assets/icon/crowd/redCrowd.svg";
import location from "../public/assets/icon/location.svg";
import ruteAll from "../public/assets/image/ruteAll.svg";
import ruteBiru from "../public/assets/image/ruteBiru.svg";
import ruteMerah from "../public/assets/image/ruteMerah.svg";
import error from "../public/assets/icon/error.svg";
import L from "leaflet";
import Link from "next/link";

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
  const [isBanner, setIsBanner] = useState(true);
  const [i, setI] = useState(0);
  const [detailHalte, setDetailHalte] = useState<any>();
  const [allHalte, setAllHalte] = useState<any>();
  const addActive = (props: number) => {
    setActiveTabIndex(props);
  };
  const array = ["Info Bikun", "Info Halte"];
  const arrayRute = ["Semua", "Rute Lurus", "Rute Kanan"];

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
    // fetchAllHalte()
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
  const RecenterAutomatically = ({ lat: x, lng: y }: any) => {
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
    return setDetailHalte(newData.data);
  };

  const fetchAllHalte = async (park: any) => {
    const req = await fetch("https://api.bikunku.com/terminal/allTerminal");
    const newData = await req.json();
    // console.log(newData);
    return setAllHalte(newData.data);
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

          {/* cari halte */}
          <div className="flex justify-center">
            <div id="front2" className="bg-blue-primary h-12 cariHalte">
              <div className="bg-white h-20 flex justify-center items-center rounded-lg mx-8 mt-4">
                <div className="flex  w-full mx-4 space-x-2 rounded-full border-[1px] border-[#EAEAEA] bg-[#FAFAFA] px-4 py-2 text-sm">
                  <Image src={location} alt="" />
                  <input
                    type="text"
                    className="w-full  bg-[#FAFAFA] focus:outline-none"
                    placeholder="Cari halte"
                  />
                </div>
              </div>
            </div>
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

          {/* banner icon */}
          <div
            className={isBanner === false ? "hidden" : "flex justify-center"}
          >
            <div id="front2" className={styles.banner}>
              <Image alt="" src={error} className="lg:ml-3" />
              <p className="text-[11.5px] font-semibold px-1 lg:px-4 flex-grow">
                Pilih halte atau klik ikon halte langsung pada map
              </p>
              <button
                className="pr-2 py-1 lg:px-3"
                onClick={() => {
                  setIsBanner(false);
                }}
              >
                <p className="bg-white text-black-primary">X</p>
              </button>
            </div>
          </div>

          {/* donts */}
          <div
            className={isBanner === false ? "hidden" : "flex justify-center"}
          >
            <div id="front2" className={styles.banner}>
              <Image alt="" src={error} className="lg:ml-3" />
              <p className="text-[11.5px] font-semibold px-1 lg:px-4 flex-grow">
                Pilih halte atau klik ikon halte langsung pada map
              </p>
              <button
                className="pr-2 py-1 lg:px-3"
                onClick={() => {
                  setIsBanner(false);
                }}
              >
                <p className="bg-white text-black-primary">X</p>
              </button>
            </div>
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
                          className="absolute top-[4px] right-[30px] bg-base-200 py-1 px-2.5 rounded-lg not-draggable"
                          onClick={() => {
                            setActivePark(null);
                            console.log("a");
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
                                <div onClick={() => addActive(index)} className="relative">
                                  {val}
                                  <svg className={val === "Info Bikun" ? "bg-red-primary h-2 w-2 rounded-full absolute top-0 right-0 animate-pulse" : "" }></svg>
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
                                      Rute Kanan
                                    </p>
                                  </div>
                                  <div className="flex pt-0.5 space-x-1.5">
                                    <p className="text-xs">Akan tiba 08:32</p>
                                    <div className="bg-black w-0.5 h-0.5 rounded-full my-auto"></div>
                                    <div className="flex space-x-1 my-auto">
                                      <Image src={redCrowd} alt="" />
                                      <p className="text-xs text-red-primary my-auto">
                                        Penuh
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <p className="my-auto text-base font-bold">
                                  Sekarang
                                </p>
                              </div>

                              <div className="h-[65px] border-[1px] rounded-xl p-3 flex justify-between">
                                <div className="flex flex-col justify-center space-y-1">
                                  <div className="flex flex-row space-x-3">
                                    <div className="flex space-x-1">
                                      <Image src={busJadwal} alt="" />
                                      <p className="bg-black-primary my-auto px-2.5 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                                        3
                                      </p>
                                    </div>
                                    <p className="bg-blue-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                                      Rute Kanan
                                    </p>
                                  </div>
                                  <div className="flex pt-0.5 space-x-1.5">
                                    <p className="text-xs">Akan tiba 08:37</p>
                                    <div className="bg-black w-0.5 h-0.5 rounded-full my-auto"></div>
                                    <div className="flex space-x-1 my-auto">
                                      <Image src={redCrowd} alt="" />
                                      <p className="text-xs text-red-primary my-auto">
                                        Penuh
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <p className="my-auto text-xl text-center font-bold mx-auto">
                                    5
                                  </p>
                                  <p className="text-xs">menit</p>
                                </div>
                              </div>

                              <div className="h-[65px] border-[1px] rounded-xl p-3 flex justify-between">
                                <div className="flex flex-col justify-center space-y-1">
                                  <div className="flex flex-row space-x-3">
                                    <div className="flex space-x-1">
                                      <Image src={busJadwal} alt="" />
                                      <p className="bg-black-primary my-auto px-2.5 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                                        2
                                      </p>
                                    </div>
                                    <p className="bg-red-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                                      Rute Lurus
                                    </p>
                                  </div>
                                  <div className="flex pt-0.5 space-x-1.5">
                                    <p className="text-xs">Akan tiba 08:47</p>
                                    <div className="bg-black w-0.5 h-0.5 rounded-full my-auto"></div>
                                    <div className="flex space-x-1 my-auto">
                                      <Image src={redCrowd} alt="" />
                                      <p className="text-xs text-red-primary my-auto">
                                        Penuh
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <p className="my-auto text-xl text-center font-bold mx-auto">
                                    10
                                  </p>
                                  <p className="text-xs">menit</p>
                                </div>
                              </div>

                              <div className="h-[65px] border-[1px] rounded-xl p-3 flex justify-between">
                                <div className="flex flex-col justify-center space-y-1">
                                  <div className="flex flex-row space-x-3">
                                    <div className="flex space-x-1">
                                      <Image src={busJadwal} alt="" />
                                      <p className="bg-black-primary my-auto px-2.5 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                                        4
                                      </p>
                                    </div>
                                    <p className="bg-red-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                                      Rute Lurus
                                    </p>
                                  </div>
                                  <div className="flex pt-0.5 space-x-1.5">
                                    <p className="text-xs">Akan tiba 08:52</p>
                                    <div className="bg-black w-0.5 h-0.5 rounded-full my-auto"></div>
                                    <div className="flex space-x-1 my-auto">
                                      <Image src={redCrowd} alt="" />
                                      <p className="text-xs text-red-primary my-auto">
                                        Penuh
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <p className="my-auto text-xl text-center font-bold mx-auto">
                                    15
                                  </p>
                                  <p className="text-xs">menit</p>
                                </div>
                              </div>

                              <div className="h-[65px] border-[1px] rounded-xl p-3 flex justify-between">
                                <div className="flex flex-col justify-center space-y-1">
                                  <div className="flex flex-row space-x-3">
                                    <div className="flex space-x-1">
                                      <Image src={busJadwal} alt="" />
                                      <p className="bg-black-primary my-auto px-2.5 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                                        5
                                      </p>
                                    </div>
                                    <p className="bg-blue-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                                      Rute Kanan
                                    </p>
                                  </div>
                                  <div className="flex pt-0.5 space-x-1.5">
                                    <p className="text-xs">Akan tiba 08:57</p>
                                    <div className="bg-black w-0.5 h-0.5 rounded-full my-auto"></div>
                                    <div className="flex space-x-1 my-auto">
                                      <Image src={redCrowd} alt="" />
                                      <p className="text-xs text-red-primary my-auto">
                                        Penuh
                                      </p>
                                    </div>
                                  </div>
                                </div>
                                <div>
                                  <p className="my-auto text-xl text-center font-bold mx-auto">
                                    20
                                  </p>
                                  <p className="text-xs">menit</p>
                                </div>
                              </div>

                              <Link
                                href="/jadwal-bikun"
                                className="px-6 h-10 rounded-full flex items-center justify-center bg-blue-primary "
                              >
                                <p className="text-white font-semibold">
                                  Lihat jadwal rutin
                                </p>
                              </Link>
                            </div>
                          ) : activeTabIndex === 1 ? (
                            <div className="flex flex-col justify-center space-y-4">
                              <div>
                                <div className="flex space-x-2">
                                  <Image src={halte} alt="" />
                                  <p className="text-lg">{detailHalte.name}</p>
                                  {detailHalte.name === "Asrama UI" ||
                                  detailHalte.name === "Menwa" ||
                                  detailHalte.name === "Stasiun UI" ? (
                                    <>
                                      <p
                                        className={
                                          "bg-blue-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold"
                                        }
                                      >
                                        Rute Kanan
                                      </p>
                                      <p
                                        className={
                                          "bg-red-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold"
                                        }
                                      >
                                        Rute Lurus
                                      </p>
                                    </>
                                  ) : (
                                    <>
                                      {" "}
                                      <p
                                        className={
                                          detailHalte.route === "RED"
                                            ? "bg-red-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold"
                                            : "bg-blue-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold"
                                        }
                                      >
                                        {detailHalte.route === "RED" ? (
                                          <>Rute Lurus</>
                                        ) : detailHalte.route === "BLUE" ? (
                                          <>Rute Kanan</>
                                        ) : (
                                          <></>
                                        )}
                                      </p>
                                    </>
                                  )}
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
                                {detailHalte?.relatedPlace?.map((val: any) => (
                                  <>
                                    {val !== "" ? (
                                      <>
                                        <li className="text-sm text-black-primary pl-1.5">
                                          {val}
                                        </li>
                                      </>
                                    ) : (
                                      <></>
                                    )}
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
              {activeTabIndex === 0 ? (
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
              ) : activeTabIndex === 2 ? (
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
              ) : activeTabIndex === 1 ? (
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
              className={styles.currentPos2}
              onClick={() => {
                getPosition();
                setIscenterd(true);
              }}
            >
              <Image alt="" src={userLoc} />
            </button>
          </div>

          {/* change rute icon */}
          <div className="flex justify-end hidden">
            <button
              id="front2"
              className={styles.rute2}
              onClick={() => {
                handleRute();
              }}
            >
              <Image alt="" src={ruteMap} />
            </button>
          </div>

          <div className="absolute bottom-[40%] w-full">
            <div id="fronttt" className="h-screen">
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
                    <div className="flex flex-row w-full">
                      {arrayRute.map((val, index) => (
                        <>
                          <a
                            className={
                              index === activeTabIndex
                                ? "not-draggable w-1/3 text-center text-blue-primary h-8 border-b-4 border-blue-primary"
                                : "not-draggable w-1/3 text-center text-[#d9d9d9] h-8 border-b-4 border-[#d9d9d9]"
                            }
                          >
                            <div onClick={() => addActive(index)}>{val}</div>
                          </a>
                        </>
                      ))}
                    </div>
                    <div className="overflow-y-scroll h-[440px] not-draggable p-6">
                      {activeTabIndex === 0 ? (
                        <div className="flex flex-col justify-center">
                          <Image src={ruteAll} alt="" />
                          <div className="flex flex-row space-x-1 py-4">
                            <div className="w-1/6">
                              <Image src={error} alt="" />
                            </div>
                            <p className="text-xs font-semibold">
                              Terdapat perubahan pada hari kerja pukul
                              06.00-09.00 WIB . Bikun rute lurus (merah) tidak
                              akan melewati FEB sampai dengan Stasiun UI. Pada
                              bikun rute kanan (biru), tidak melewati Stasiun UI
                              sampai Menwa.
                            </p>
                          </div>
                        </div>
                      ) : activeTabIndex === 1 ? (
                        <div className="flex flex-col justify-center">
                          <Image src={ruteMerah} alt="" />
                          <div className="flex flex-row space-x-1 py-4">
                            <div className="w-1/6">
                              <Image src={error} alt="" />
                            </div>
                            <p className="text-xs font-semibold">
                              Terdapat perubahan rute pada hari kerja pukul
                              06.00-09.00 WIB. Bikun rute lurus (merah) tidak
                              akan melewati FEB sampai dengan Stasiun UI.{" "}
                            </p>
                          </div>
                        </div>
                      ) : activeTabIndex === 2 ? (
                        <div className="flex flex-col justify-center">
                          <Image src={ruteBiru} alt="" />
                          <div className="flex flex-row space-x-1 py-4">
                            <div className="w-12">
                              <Image src={error} alt="" />
                            </div>
                            <p className="text-xs font-semibold">
                              Terdapat perubahan rute pada hari kerja pukul
                              06.00-09.00 WIB . Bikun rute kanan (biru), tidak
                              melewati Stasiun UI sampai Menwa.
                            </p>
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
