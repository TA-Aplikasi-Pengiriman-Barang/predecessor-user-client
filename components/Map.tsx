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
import halteAll from "../data/halteAll.json";
import iconRed from "./IconRed";
import iconBlue from "./IconBlue";
import iconMix from "./IconMix";
import iconBus from "./iconBus/IconBus";
import iconBus1 from "./iconBus/IconBus1";
import iconBus2 from "./iconBus/IconBus2";
import iconBus3 from "./iconBus/IconBus3";
import iconBus4 from "./iconBus/IconBus4";
import iconBus5 from "./iconBus/IconBus5";
import iconBus6 from "./iconBus/IconBus6";
import iconBus7 from "./iconBus/IconBus7";
import iconBus8 from "./iconBus/IconBus8";
import iconBus9 from "./iconBus/IconBus9";
import iconBus10 from "./iconBus/IconBus10";
import styles from "./Map.module.css";
import RoutineMachine from "./RoutineMachine";
import RoutineMachine2 from "./RoutineMachine2";
import RoutineMachine3 from "./RoutineMachine3";
import RoutineMachine4 from "./RoutineMachine4";
import RoutineMachine5 from "./RoutineMachine4";
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
import position from "../public/assets/icon/position.svg";
import gambar1 from "../public/assets/image/donts/1.svg";
import gambar2 from "../public/assets/image/donts/2.svg";
import gambar3 from "../public/assets/image/donts/3.svg";
import gambar4 from "../public/assets/image/donts/4.svg";
import gambar5 from "../public/assets/image/donts/5.svg";
import gambar6 from "../public/assets/image/donts/6.svg";
import bus from "../public/assets/image/bus/bus.svg";
import bus1 from "../public/assets/image/bus/bus1.svg";
import bus2 from "../public/assets/image/bus/bus2.svg";
import bus3 from "../public/assets/image/bus/bus3.svg";
import bus4 from "../public/assets/image/bus/bus4.svg";
import bus5 from "../public/assets/image/bus/bus5.svg";
import bus6 from "../public/assets/image/bus/bus6.svg";
import bus7 from "../public/assets/image/bus/bus7.svg";
import bus8 from "../public/assets/image/bus/bus8.svg";
import bus9 from "../public/assets/image/bus/bus9.svg";
import bus10 from "../public/assets/image/bus/bus10.svg";
import halteNotFound from "../public/assets/image/halteNotFoundBG.svg";
import L from "leaflet";
import Link from "next/link";
import "leaflet-routing-machine";
import { createControlComponent } from "@react-leaflet/core";

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
  const [isHalteClicked, setIsHalteClicked] = useState(false);
  const [isBanner, setIsBanner] = useState(true);
  const [isDonts, setIsDonts] = useState(true);
  const [isHalte, setIsHalte] = useState(false);
  const [isFirstInit, setIsFirstInit] = useState(true);
  const [isFilter, setIsFilter] = useState("ALL");
  const [wordSearch, setWordSearch] = useState("");
  const [i, setI] = useState(0);
  const [detailHalte, setDetailHalte] = useState<any>();
  const [allHalte, setAllHalte] = useState<any>([]);
  const [busEstimation, setBusEstimation] = useState<any>([]);
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
    setIsHalteClicked(false);
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
    fetchAllHalte();
  }, []);

  // switch rute on maps
  const handleRute = () => {
    setI(i + 1);
    if (i === 3) {
      setI(0);
    }
  };

  const getHalteClicked = (park: any) => {
    setLat(park.geometry.coordinates[0]);
    setLng(park.geometry.coordinates[1]);
  };

  const getHalteClickedById = (val: any) => {
    const HalteClickedById = halteAll.features.filter(
      (e: any) => e.properties.PARK_ID === val
    );
    setLat(HalteClickedById[0].geometry.coordinates[0]);
    setLng(HalteClickedById[0].geometry.coordinates[1]);
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

  // fetch data one halte
  const fetchData = async (park: any) => {
    const req = await fetch(
      "https://api.bikunku.com/terminal/" + park.properties.PARK_ID
    );
    const newData = await req.json();
    return setDetailHalte(newData.data);
  };

  const fetchDataByID = async (park: number) => {
    const req = await fetch("https://api.bikunku.com/terminal/" + park);
    const newData = await req.json();
    return setDetailHalte(newData.data);
  };

  const getBusEstimation = async (park: number) => {
    const req = fetch("https://api.bikunku.com/bus/info/" + park, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const date = new Date();
        data.data.bus.forEach((element: any) => {
          const parsedData = new Date(date.getTime() + (element.estimate * 60000))
          element.finalTime = parsedData.getHours() + ":" + parsedData.getMinutes();
        });

        setBusEstimation(data.data.bus);
        const interval = setInterval(() => {
          const req = fetch("https://api.bikunku.com/bus/info/" + park, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              const date = new Date();
              data.data.bus.forEach((element: any) => {
                const parsedData = new Date(date.getTime() + (element.estimate * 60000))
                element.finalTime = parsedData.getHours() + ":" + parsedData.getMinutes();
              });
              setBusEstimation(data.data.bus);
            });
        }, 5000);
        return () => clearInterval(interval);
      });
  };

  // fetch all halte
  const fetchAllHalte = async () => {
    const payload = {
      lat: -6.361046716889507,
      long: 106.8317240044786,
    };
    const req = fetch("https://api.bikunku.com/terminal/allTerminal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        setAllHalte(data.data.terminal);
      });
  };

  const handleSearch = async (e: any) => {
    const searchHalte = e.target.value;
    setWordSearch(searchHalte);
  };

  const DetailHalte = (park: any) => {
    fetchData(park);
  };

  const DetailHalteByID = (park: any) => {
    fetchDataByID(park);
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
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                // url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager_labels_under/{z}/{x}/{y}{r}.png"
                // url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
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
                          setIsHalteClicked(true);
                          getHalteClicked(park);
                          getBusEstimation(park.properties.PARK_ID);
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
                          setIsHalteClicked(true);
                          getHalteClicked(park);
                          getBusEstimation(park.properties.PARK_ID);
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
                          setIsHalteClicked(true);
                          getHalteClicked(park);
                          getBusEstimation(park.properties.PARK_ID);
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
                          setIsHalteClicked(true);
                          getHalteClicked(park);
                          getBusEstimation(park.properties.PARK_ID);
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
                          setIsHalteClicked(true);
                          getHalteClicked(park);
                          getBusEstimation(park.properties.PARK_ID);
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
                <>
                  {val?.number === 0 ? (
                    <>
                      {" "}
                      <Marker
                        position={[val?.lat, val?.long]}
                        icon={iconBus}
                      ></Marker>
                    </>
                  ) : val?.number === 1 ? (
                    <>
                      {" "}
                      <Marker
                        position={[val?.lat, val?.long]}
                        icon={iconBus1}
                      ></Marker>
                    </>
                  ) : val?.number === 2 ? (
                    <>
                      {" "}
                      <Marker
                        position={[val?.lat, val?.long]}
                        icon={iconBus2}
                      ></Marker>
                    </>
                  ) : val?.number === 3 ? (
                    <>
                      {" "}
                      <Marker
                        position={[val?.lat, val?.long]}
                        icon={iconBus3}
                      ></Marker>
                    </>
                  ) : val?.number === 4 ? (
                    <>
                      {" "}
                      <Marker
                        position={[val?.lat, val?.long]}
                        icon={iconBus4}
                      ></Marker>
                    </>
                  ) : val?.number === 5 ? (
                    <>
                      {" "}
                      <Marker
                        position={[val?.lat, val?.long]}
                        icon={iconBus5}
                      ></Marker>
                    </>
                  ) : val?.number === 6 ? (
                    <>
                      {" "}
                      <Marker
                        position={[val?.lat, val?.long]}
                        icon={iconBus6}
                      ></Marker>
                    </>
                  ) : val?.number === 7 ? (
                    <>
                      {" "}
                      <Marker
                        position={[val?.lat, val?.long]}
                        icon={iconBus7}
                      ></Marker>
                    </>
                  ) : val?.number === 8 ? (
                    <>
                      {" "}
                      <Marker
                        position={[val?.lat, val?.long]}
                        icon={iconBus1}
                      ></Marker>
                    </>
                  ) : val?.number === 8 ? (
                    <>
                      {" "}
                      <Marker
                        position={[val?.lat, val?.long]}
                        icon={iconBus1}
                      ></Marker>
                    </>
                  ) : val?.number === 9 ? (
                    <>
                      {" "}
                      <Marker
                        position={[val?.lat, val?.long]}
                        icon={iconBus9}
                      ></Marker>
                    </>
                  ) : val?.number === 10 ? (
                    <>
                      {" "}
                      <Marker
                        position={[val?.lat, val?.long]}
                        icon={iconBus10}
                      ></Marker>
                    </>
                  ) : (
                    <>
                      {" "}
                      <Marker
                        position={[val?.lat, val?.long]}
                        icon={iconBus}
                      ></Marker>
                    </>
                  )}
                </>
              ))}
              <Marker position={[lat, lng]}></Marker>
              {isCentered && <RecenterAutomatically lat={lat} lng={lng} />}
              {isHalteClicked && <RecenterAutomatically lat={lat} lng={lng} />}
            </MapContainer>
          </div>

          {/* cari halte */}
          <div className="flex justify-center">
            <div id="front3" className="bg-blue-primary h-12 cariHalte">
              <div className="bg-white h-20 flex justify-center items-center rounded-lg mx-8 mt-4">
                <div className="flex  w-full mx-4 space-x-2 rounded-full border-[1px] border-[#EAEAEA] bg-[#FAFAFA] px-4 py-2 text-sm">
                  <Image src={location} alt="" />
                  <input
                    type="text"
                    className="w-full  bg-[#FAFAFA] focus:outline-none"
                    placeholder="Cari halte"
                    onFocus={() => {
                      setIsHalte(true);
                    }}
                    onChange={() => {
                      handleSearch(event);
                    }}
                    // onBlur={() => {
                    //   setIsHalte(false);
                    // }}
                  />
                </div>
              </div>
            </div>

            <div
              className={
                isHalte
                  ? "bg-white h-full show overflow-y-scroll no-scrollbar"
                  : "hidden"
              }
              id="front2"
            >
              <div className=" pt-24 h-full">
                <div className="p-4 h-full space-y-4">
                  {/* filter */}
                  <div className="flex justify-center space-x-3">
                    <div
                      className={
                        isFilter === "ALL"
                          ? "border-[1px] rounded-full border-[#EAEAEA] px-6 bg-blue-primary text-white"
                          : "border-[1px] rounded-full bg-[#FBFBFB] border-[#EAEAEA] px-6"
                      }
                      onClick={() => {
                        setIsFilter("ALL");
                      }}
                    >
                      <p
                        className={
                          isFilter === "ALL"
                            ? "text-xs text-white"
                            : "text-xs text-black-primary"
                        }
                      >
                        All
                      </p>
                    </div>
                    <div
                      className={
                        isFilter === "RED"
                          ? "border-[1px] rounded-full border-[#EAEAEA] px-6 bg-blue-primary text-white"
                          : "border-[1px] rounded-full bg-[#FBFBFB] border-[#EAEAEA] px-6"
                      }
                      onClick={() => {
                        setIsFilter("RED");
                      }}
                    >
                      <p
                        className={
                          isFilter === "RED"
                            ? "text-xs text-white"
                            : "text-xs text-black-primary"
                        }
                      >
                        Rute Lurus
                      </p>
                    </div>
                    <div
                      className={
                        isFilter === "BLUE"
                          ? "border-[1px] rounded-full border-[#EAEAEA] px-6 bg-blue-primary text-white"
                          : "border-[1px] rounded-full bg-[#FBFBFB] border-[#EAEAEA] px-6"
                      }
                      onClick={() => {
                        setIsFilter("BLUE");
                      }}
                    >
                      <p
                        className={
                          isFilter === "BLUE"
                            ? "text-xs text-white"
                            : "text-xs text-black-primary"
                        }
                      >
                        Rute Kanan
                      </p>
                    </div>
                  </div>

                  {allHalte.filter((e: any) =>
                    e.name.toLowerCase().includes(wordSearch)
                  ).length === 0 ? (
                    <>
                      <div className="flex justify-center">
                        <Image alt="" src={halteNotFound} />
                      </div>
                    </>
                  ) : (
                    <></>
                  )}

                  {/* konten */}
                  {isFilter === "ALL" ? (
                    <>
                      {allHalte
                        .filter((e: any) =>
                          e.name.toLowerCase().includes(wordSearch)
                        )
                        .map((val: any, index: any) => (
                          <div>
                            <div
                              className="flex flex-row space-x-3 my-auto border-[1px] py-2 px-3 rounded-xl h-16"
                              onClick={() => {
                                DetailHalteByID(val.id);
                                setIsHalte(false);
                                setActivePark(val.id);
                                setIsHalteClicked(true);
                                getHalteClickedById(val.id);
                                getBusEstimation(val.id);
                              }}
                            >
                              <div className="my-auto w-8 overflow-y-hidden flex flex-col space-y-1">
                                <Image
                                  src={position}
                                  alt=""
                                  className="mx-auto"
                                />
                                <p className="text-[8px] text-center">
                                  {val.distance} km
                                </p>
                              </div>
                              <div className="flex-col flex-grow">
                                <p className="text-base">{val.name}</p>
                                <div className="flex space-x-2">
                                  {" "}
                                  <p className="text-xs text-[#959595]">
                                    Halte Berikutnya
                                  </p>
                                  <p className="text-xs text-[#959595]">
                                    {">"}
                                  </p>
                                  <p className="text-xs text-[#959595]">
                                    {val.next}
                                  </p>
                                </div>
                              </div>
                              <div className="my-auto w-[70px]">
                                <p
                                  className={
                                    val.route === "RED"
                                      ? "bg-red-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold"
                                      : "bg-blue-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold"
                                  }
                                >
                                  {val.route === "RED" ? (
                                    <>Rute Lurus</>
                                  ) : val.route === "BLUE" ? (
                                    <>Rute Kanan</>
                                  ) : (
                                    <></>
                                  )}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                    </>
                  ) : isFilter === "RED" || isFilter === "BLUE" ? (
                    <>
                      {" "}
                      {allHalte
                        .filter(
                          (e: any) =>
                            e.route === isFilter &&
                            e.name.toLowerCase().includes(wordSearch)
                        )
                        .map((val: any, index: any) => (
                          <div
                            className="flex flex-row space-x-3 my-auto border-[1px] py-2 px-3 rounded-xl h-16"
                            onClick={() => {
                              DetailHalteByID(val.id);
                              setIsHalte(false);
                              setActivePark(val.id);
                              setIsHalteClicked(true);
                              getHalteClickedById(val.id);
                              getBusEstimation(val.id);
                            }}
                          >
                            <div className="my-auto w-8 overflow-y-hidden flex flex-col space-y-1">
                              <Image
                                src={position}
                                alt=""
                                className="mx-auto"
                              />
                              <p className="text-[8px] text-center">
                                {val.distance} km
                              </p>
                            </div>
                            <div className="flex-col flex-grow">
                              <p className="text-base">{val.name}</p>
                              <div className="flex space-x-2">
                                {" "}
                                <p className="text-xs text-[#959595]">
                                  Halte Berikutnya
                                </p>
                                <p className="text-xs text-[#959595]">{">"}</p>
                                <p className="text-xs text-[#959595]">
                                  {val.next}
                                </p>
                              </div>
                            </div>
                            <div className="my-auto w-[70px]">
                              <p
                                className={
                                  val.route === "RED"
                                    ? "bg-red-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold"
                                    : "bg-blue-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold"
                                }
                              >
                                {val.route === "RED" ? (
                                  <>Rute Lurus</>
                                ) : val.route === "BLUE" ? (
                                  <>Rute Kanan</>
                                ) : (
                                  <></>
                                )}
                              </p>
                            </div>
                          </div>
                        ))}
                    </>
                  ) : (
                    <>
                      <p></p>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* get position icon */}
          <div className="flex justify-end">
            <button
              id="front1"
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
                  id="front1"
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
                  id="front1"
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
                  id="front1"
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
                  id="front1"
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
            className={
              isBanner === false ? "hidden" : "flex justify-center h-[100%]"
            }
          >
            <div id="front1" className={styles.banner}>
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
            className={
              isDonts === false
                ? "hidden"
                : "flex h-[100%] justify-center overflow-y-scroll no-scrollbar"
            }
          >
            <div id="front3" className={styles.donts}>
              <div className="flex flex-col h-[100%] items-center justify-center ">
                <button
                  className="pr-3 py-3 absolute top-0 right-0 lg:px-3"
                  onClick={() => {
                    setIsDonts(false);
                  }}
                >
                  <p className="bg-white text-xl text-black-primary">X</p>
                </button>
                <div className="flex flex-col text-center pb-2">
                  <p className="text-lg font-bold">Dos and Dont’s Bikun</p>
                </div>
                <div className="flex flex-row space-x-2 w-full px-6 py-4 h-20">
                  <div className="w-1/5 mx-auto flex justify-center items-center">
                    <Image src={gambar1} alt="" />
                  </div>
                  <p className="w-4/5 my-auto">
                    Tertib dan dahulukan penumpang turun, please!
                  </p>
                </div>
                <hr className="h-[1px] border-[1px] border-[#d4d4d4]" />
                <div className="flex flex-row space-x-2 w-full px-6 py-4 h-20">
                  <div className="w-1/5 mx-auto flex justify-center items-center">
                    <Image src={gambar2} alt="" />
                  </div>
                  <p className="w-4/5 my-auto">
                    Tetap gunakan masker dan jaga protokol kesehatan, ya!
                  </p>
                </div>
                <hr className="h-[1px] border-[1px] border-[#d4d4d4]" />
                <div className="flex flex-row space-x-2 w-full px-6 py-4 h-20">
                  <div className="w-1/5 mx-auto flex justify-center items-center">
                    <Image src={gambar3} alt="" />
                  </div>
                  <p className="w-4/5 my-auto">
                    Ucapkan terima kasih kepada supir sebelum turun guys!
                  </p>
                </div>
                <hr className="h-[1px] border-[1px] border-[#d4d4d4]" />
                <div className="flex flex-row space-x-2 w-full px-6 py-4 h-20">
                  <div className="w-1/5 mx-auto flex justify-center items-center">
                    <Image src={gambar4} alt="" />
                  </div>
                  <p className="w-4/5 my-auto">
                    Jangan berkerumun pada bagian tengah bikun ya {":("}
                  </p>
                </div>
                <hr className="h-[1px] border-[1px] border-[#d4d4d4]" />
                <div className="flex flex-row space-x-2 w-full px-6 py-4 h-20">
                  <div className="w-1/5 mx-auto flex justify-center items-center">
                    <Image src={gambar5} alt="" />
                  </div>
                  <p className="w-4/5 my-auto">
                    Jangan buang sampah sembarangan!
                  </p>
                </div>
                <hr className="h-[1px] border-[1px] border-[#d4d4d4]" />
                <div className="flex flex-row space-x-2 w-full px-6 py-4 h-20">
                  <div className="w-1/5 mx-auto flex justify-center items-center">
                    <Image src={gambar6} alt="" />
                  </div>
                  <p className="w-4/5 my-auto">
                    Waspada dan cegah pelecehan seksual serta pencurian!
                  </p>
                </div>
                <hr className="pb-4" />

                <button className="rounded-full bg-blue-primary">
                  <p
                    className="flex items-center justify-center font-semibold text-base text-white h-10 px-16"
                    onClick={() => {
                      setIsDonts(false);
                    }}
                  >
                    Baik, saya mengerti
                  </p>
                </button>
              </div>
            </div>
          </div>

          {/* handle detail halte */}
          {activePark === null ? (
            <></>
          ) : (
            <>
              {" "}
              <div className="absolute bottom-[40%] w-full">
                <div id="front1" className="h-screen">
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
                                <div
                                  onClick={() => addActive(index)}
                                  className="relative h-8"
                                >
                                  {val}
                                  <svg
                                    className={
                                      val === "Info Bikun"
                                        ? "bg-red-primary h-2 w-2 rounded-full absolute top-0 right-0 animate-pulse"
                                        : "h-0"
                                    }
                                  ></svg>
                                </div>
                              </a>
                            </>
                          ))}
                        </div>
                        <div className="overflow-y-scroll no-scrollbar h-[440px] not-draggable space-y-2">
                          {activeTabIndex === 0 ? (
                            <div className="flex flex-col justify-center space-y-2">
                              {busEstimation.map((val: any, indx: any) => (
                                <>
                                  <div className="h-[65px] border-[1px] rounded-xl p-3 flex justify-between">
                                    <div className="flex flex-col justify-center space-y-1">
                                      <div className="flex flex-row space-x-3">
                                        <div className="flex space-x-1">
                                          <Image src={busJadwal} alt="" />
                                          <p className="bg-black-primary my-auto px-2.5 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                                            {val.id}
                                          </p>
                                        </div>
                                        <p
                                          className={
                                            val?.route === "RED"
                                              ? "bg-red-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold"
                                              : "bg-blue-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold"
                                          }
                                        >
                                          {val?.route === "RED" ? (
                                            <>Rute Lurus</>
                                          ) : val?.route === "BLUE" ? (
                                            <>Rute Kanan</>
                                          ) : (
                                            <></>
                                          )}
                                        </p>
                                      </div>
                                      <div className="flex pt-0.5 space-x-1.5">
                                        <p className="text-xs">
                                          Akan tiba {val.finalTime}
                                        </p>
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
                                        {val.estimate}
                                      </p>
                                      <p className="text-xs">menit</p>
                                    </div>
                                  </div>
                                </>
                              ))}

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

          {/* bottom drawer */}
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
                    <div className="overflow-y-scroll no-scrollbar h-[440px] not-draggable p-6 justify-center">
                      {activeTabIndex === 0 ? (
                        <div className="flex flex-col justify-center">
                          <div className="flex mx-auto">
                            <Image src={ruteAll} alt="" />
                          </div>
                          <div className="flex flex-row space-x-1 py-4">
                            <div className="w-1/6 lg:w-12 ">
                              <Image src={error} alt="" />
                            </div>
                            <p className="text-xs font-semibold my-auto">
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
                          <div className="flex mx-auto">
                            <Image src={ruteMerah} alt="" />
                          </div>
                          <div className="flex flex-row space-x-1 py-4">
                            <div className="w-1/6 lg:w-12 ">
                              <Image src={error} alt="" />
                            </div>
                            <p className="text-xs font-semibold my-auto">
                              Terdapat perubahan rute pada hari kerja pukul
                              06.00-09.00 WIB. Bikun rute lurus (merah) tidak
                              akan melewati FEB sampai dengan Stasiun UI.{" "}
                            </p>
                          </div>
                        </div>
                      ) : activeTabIndex === 2 ? (
                        <div className="flex flex-col justify-center">
                          <div className="flex mx-auto">
                            <Image src={ruteBiru} alt="" />
                          </div>
                          <div className="flex flex-row space-x-1 py-4">
                            <div className="w-1/6 lg:w-12 ">
                              <Image src={error} alt="" />
                            </div>
                            <p className="text-xs font-semibold my-auto">
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
          {/* <div className="bg-blue-200">{children}</div> */}
        </>
      )}
    </div>
  );
}
