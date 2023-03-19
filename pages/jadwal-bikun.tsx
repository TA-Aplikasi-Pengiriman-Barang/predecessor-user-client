import Image from "next/image";
import Layout from "../components/Layout";
import fixJadwal from "../data/fixJadwal.json";
import { useState, useEffect } from "react";
import Draggable from "react-draggable";
import { days } from "../components/constant/days";
import { httpBaseUrl } from "../components/constant/api";

// import assets
import bus from "../public/assets/icon/bus/busJadwal.svg";
import location from "../public/assets/icon/location.svg";
import calendar from "../public/assets/icon/calendar.svg";
import jadwalNotFound from "../public/assets/image/jadwalNotFound.svg";
import halteNotFound from "../public/assets/image/halteNotFoundBG.svg";
import position from "../public/assets/icon/position.svg";
import { useRouter } from "next/router";

export default function jadwalbikun() {
  const [isFilter, setIsFilter] = useState(false);
  const [startDate, setStartDate] = useState<number>(0);
  const [endDate, setEndDate] = useState<any>(null);
  const [openEndDate, setOpenEndDate] = useState<any>(null);
  const [filterTime, setFilterTime] = useState("all");
  const [dataJadwal, setDataJadwal] = useState(fixJadwal.data);
  const [isShow, setIsShow] = useState(false);
  const [isHalte, setIsHalte] = useState(false);
  const [isFilterHalte, setIsFilterHalte] = useState("ALL");
  const [allHalte, setAllHalte] = useState<any>([]);
  const [wordSearch, setWordSearch] = useState<any>("");

  const loopDay = [0, 1, 2, 3, 4, 5, 6];
  const router = useRouter();

  const handleSearch = async (e: any) => {
    const searchHalte = e.target.value;
    setWordSearch(searchHalte);
  };

  const onClickHalte = (name: any, route: any) => {
    let filteredData;

    if (route === "BLUE") {
      filteredData = fixJadwal.data.filter(
        (e: any) =>
          e.halte.toLowerCase().includes(name) || e.rute.includes("belok")
      );
    }
    if (route === "RED") {
      filteredData = fixJadwal.data.filter(
        (e: any) =>
          e.halte.toLowerCase().includes(name) || e.rute.includes("lurus")
      );
    } else {
      filteredData = fixJadwal.data.filter((e: any) => e.halte.includes(name));
    }

    setIsHalte(false);
    setDataJadwal(filteredData);
    setIsShow(true);
  };

  const clickApplyFilter = () => {
    if (endDate !== null) {
      let tempData = dataJadwal;
      let loopDay = [];
      let conditions: any = [];
      for (let i = startDate; i <= endDate; i++) {
        loopDay.push(i);
        conditions.push(days[i]);
      }

      let filteredData = tempData.filter((val: any) =>
        // @ts-ignore
        conditions.some((el) => val.tanggal.includes(el))
      );

      let newData;
      if (filterTime === "6-9") {
        newData = filteredData.filter((val: any) =>
          ["06:", "07:", "08:", "09:00"].some((el) => val.waktu.includes(el))
        );
      } else if (filterTime === "9-12") {
        newData = filteredData.filter((val: any) =>
          ["09:", "10:", "11:", "12:00"].some((el) => val.waktu.includes(el))
        );
      } else {
        newData = filteredData;
      }

      setIsFilter(false);
      setDataJadwal(newData);
      setIsShow(true);
    }
  };

  // fetch all halte
  const fetchAllHalte = async () => {
    const payload = {
      lat: -6.361046716889507,
      long: 106.8317240044786,
    };
    const req = fetch(`${httpBaseUrl}/terminal/allTerminal`, {
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

  useEffect(() => {
    fetchAllHalte();

    // // Kalau refresh masih ada params yg blm ke cover
    if (Object.keys(router.query).length !== 0) {
      const terminalPayload = router.query;
      onClickHalte(terminalPayload.park, "");
    }
  }, []);

  return (
    <Layout>
      <div className="h-screen bg-white">
        {/* Komponen Cari & Filter Jadwal  */}
        <div
          id="front"
          className="bg-blue-primary h-16 rounded-[0_0_1rem_1rem] flex justify-center"
        >
          <div className="h-28 w-5/6 rounded-lg bg-white flex flex-col justify-center mt-2 px-4 space-y-3 drop-shadow-xl">
            <div className="flex space-x-2 rounded-full border-[1px] border-[#EAEAEA] bg-[#FAFAFA] px-4 py-2 text-sm">
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
              />
            </div>
            <div
              className="flex space-x-1 rounded-full border-[1px] border-[#EAEAEA] bg-[#FAFAFA] mx-20 px-2 py-1 text-xs"
              onClick={() => setIsFilter(true)}
            >
              <Image src={calendar} alt="" />
              <p className="font-semibold text-xs ">Filter by time</p>
            </div>
          </div>
        </div>

        {/* IsHalte */}
        <div
          className={
            isHalte ? "h-full show overflow-y-scroll no-scrollbar" : "hidden"
          }
          id="frontt"
        >
          <div className="h-full">
            <div className="pt-36 p-4 h-full space-y-4">
              {/* filter */}
              <div className="flex justify-center space-x-3">
                <div
                  className={
                    isFilterHalte === "ALL"
                      ? "border-[1px] rounded-full border-[#EAEAEA] px-6 bg-blue-primary text-white"
                      : "border-[1px] rounded-full bg-[#FBFBFB] border-[#EAEAEA] px-6"
                  }
                  onClick={() => {
                    setIsFilterHalte("ALL");
                  }}
                >
                  <p
                    className={
                      isFilterHalte === "ALL"
                        ? "text-xs text-white"
                        : "text-xs text-black-primary"
                    }
                  >
                    All
                  </p>
                </div>
                <div
                  className={
                    isFilterHalte === "RED"
                      ? "border-[1px] rounded-full border-[#EAEAEA] px-6 bg-blue-primary text-white"
                      : "border-[1px] rounded-full bg-[#FBFBFB] border-[#EAEAEA] px-6"
                  }
                  onClick={() => {
                    setIsFilterHalte("RED");
                  }}
                >
                  <p
                    className={
                      isFilterHalte === "RED"
                        ? "text-xs text-white"
                        : "text-xs text-black-primary"
                    }
                  >
                    Rute Lurus
                  </p>
                </div>
                <div
                  className={
                    isFilterHalte === "BLUE"
                      ? "border-[1px] rounded-full border-[#EAEAEA] px-6 bg-blue-primary text-white"
                      : "border-[1px] rounded-full bg-[#FBFBFB] border-[#EAEAEA] px-6"
                  }
                  onClick={() => {
                    setIsFilterHalte("BLUE");
                  }}
                >
                  <p
                    className={
                      isFilterHalte === "BLUE"
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
              {isFilterHalte === "ALL" ? (
                <>
                  {allHalte
                    .filter((e: any) =>
                      e.name.toLowerCase().includes(wordSearch)
                    )
                    .map((val: any, index: any) => (
                      <div>
                        <div
                          className="flex flex-row space-x-3 my-auto border-[1px] py-2 px-3 rounded-xl h-16"
                          key={index}
                          onClick={() => {
                            onClickHalte(val.name.toLowerCase(), val.route);
                          }}
                        >
                          <div className="my-auto w-8 overflow-y-hidden flex flex-col space-y-1">
                            <Image src={position} alt="" className="mx-auto" />
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
                      </div>
                    ))}
                </>
              ) : isFilterHalte === "RED" || isFilterHalte === "BLUE" ? (
                <>
                  {" "}
                  {allHalte
                    .filter(
                      (e: any) =>
                        e.route === isFilterHalte &&
                        e.name.toLowerCase().includes(wordSearch)
                    )
                    .map((val: any, index: any) => (
                      <div
                        className="flex flex-row space-x-3 my-auto border-[1px] py-2 px-3 rounded-xl h-16"
                        key={index}
                        onClick={() => {
                          onClickHalte(val.name.toLowerCase(), val.route);
                        }}
                      >
                        <div className="my-auto w-8 overflow-y-hidden flex flex-col space-y-1">
                          <Image src={position} alt="" className="mx-auto" />
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
                            <p className="text-xs text-[#959595]">{val.next}</p>
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

        {/* Data Jadwal Bikun  */}
        <div
          className={`h-screen overflow-y-scroll bg-white pt-36 px-4 space-y-4 ${
            isHalte && "hidden"
          }`}
        >
          {/* Looping Hari (Tagged False) */}
          {!isHalte && !isShow && (
            <>
              <div className="flex flex-col justify-center items-center mb-4 pt-28">
                <Image src={jadwalNotFound} alt="" />
                <p className="text-[#9B9B9B]">Pilih halte terlebih dahulu</p>
              </div>
            </>
          )}
          {isShow &&
            loopDay.map((angka) => (
              <div key={angka}>
                <div className="flex space-x-2 w-full pb-2">
                  <p className="text-[10px] w-1/2">
                    {days[angka]}, 2{angka + 1} November 2022
                  </p>
                  <div className="h-[1px] bg-[#D9D9D9] w-full my-auto"></div>
                </div>

                <div className="space-y-2">
                  {dataJadwal.filter((e) => e.tanggal.includes(days[angka]))
                    .length === 0 ? (
                    <div className="flex flex-col justify-center items-center mb-4">
                      <Image src={jadwalNotFound} alt="" />
                      <p className="text-[#9B9B9B]">
                        Tidak terdapat jadwal bikun
                      </p>
                    </div>
                  ) : (
                    dataJadwal
                      .filter((e) => e.tanggal.includes(days[angka]))
                      .map((val, index) => (
                        <div
                          className="h-[65px] border-[1px] rounded-xl p-3 flex justify-between"
                          key={index}
                        >
                          <div className="flex flex-col justify-center space-y-1">
                            <div className="flex flex-row space-x-3">
                              <div className="flex space-x-1">
                                <Image src={bus} alt="" />
                                <p className="bg-black-primary my-auto px-2.5 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                                  {val.idBus}
                                </p>
                              </div>
                              <p
                                className={
                                  val.rute === "lurus"
                                    ? "bg-red-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold"
                                    : "bg-blue-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold"
                                }
                              >
                                {val.rute === "lurus" ? (
                                  <>Rute Lurus</>
                                ) : val.rute === "belok" ? (
                                  <>Rute Kanan</>
                                ) : (
                                  <></>
                                )}
                              </p>
                            </div>
                            <p className="text-xs">{val.tanggal}</p>
                          </div>
                          <p className="my-auto text-xl font-bold">
                            {val.waktu}
                          </p>
                        </div>
                      ))
                  )}
                </div>
              </div>
            ))}
        </div>

        {isFilter === true ? (
          <>
            {" "}
            <div
              id="front3"
              className="absolute bottom-[40%] w-full drop-shadow-xl"
            >
              <div id="front3" className="h-screen">
                <Draggable
                  axis="y"
                  bounds={{ left: 0, top: -200, right: 0, bottom: 50 }}
                  defaultPosition={{ x: 0, y: 0 }}
                  cancel=".not-draggable"
                >
                  <div className="bg-white rounded-[3rem_3rem_0_0] space-y-2 pt-1 h-[80%] drop-shadow-xl">
                    <div className="py-2">
                      <div className="h-1.5 bg-[#d9d9d9] mx-24 rounded-full flex justify-center"></div>
                      <div
                        className="absolute top-[4px] right-[30px] bg-base-200 py-1 px-2.5 rounded-lg not-draggable"
                        onClick={() => {
                          setIsFilter(false);
                        }}
                      >
                        X
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex flex-row w-full pb-4 justify-center">
                        <p className="font-semibold">Filter</p>
                      </div>
                      <div className="overflow-y-scroll no-scrollbar h-[440px] not-draggable space-y-4">
                        <div className="flex justify-between space-x-2">
                          <div className="w-1/2 flex flex-col space-y-1">
                            <p className="text-sm">Tanggal Mulai</p>
                            <select
                              className="rounded-full py-1 px-2 border-[1px] border-[#EAEAEA] bg-[#FAFAFA] text-xs"
                              onChange={(e) => {
                                setStartDate(parseInt(e.target.value));
                                setOpenEndDate(true);
                                setEndDate(parseInt(e.target.value));
                              }}
                            >
                              <option disabled selected>
                                {" "}
                                Pilih tanggal{" "}
                              </option>
                              <option value={0}> 21/11/2022 </option>
                              <option value={1}> 22/11/2022 </option>
                              <option value={2}> 23/11/2022 </option>
                              <option value={3}> 24/11/2022 </option>
                              <option value={4}> 25/11/2022 </option>
                              <option value={5}> 26/11/2022 </option>
                              <option value={6}> 27/11/2022 </option>
                            </select>
                          </div>
                          <div className="w-1/2 flex flex-col space-y-1">
                            <p className="text-sm">Tanggal Berakhir</p>
                            <select
                              className="rounded-full py-1 px-2 border-[1px] border-[#EAEAEA] bg-[#FAFAFA] text-xs"
                              onChange={(e) => {
                                setEndDate(parseInt(e.target.value));
                              }}
                            >
                              {openEndDate &&
                                [...Array(7 - startDate)].map((_, index) => (
                                  <option value={startDate + index} key={index}>
                                    {" "}
                                    2{startDate + 1 + index}/11/2022{" "}
                                  </option>
                                ))}
                            </select>
                          </div>
                        </div>
                        <div className=" flex flex-col space-y-1">
                          <p className="text-sm">Rentang Jam</p>
                          <div className="flex flex-row space-x-2">
                            <div
                              className={`rounded-full py-1 px-5 font-semibold border-[1px] border-[#EAEAEA] text-xs ${
                                filterTime === "all"
                                  ? "bg-blue-primary text-white"
                                  : "bg-[#FAFAFA]"
                              }`}
                              onClick={() => {
                                setFilterTime("all");
                              }}
                            >
                              All
                            </div>
                            <div
                              className={`rounded-full py-1 px-5 font-semibold border-[1px] border-[#EAEAEA] text-xs ${
                                filterTime === "6-9"
                                  ? "bg-blue-primary text-white"
                                  : "bg-[#FAFAFA]"
                              }`}
                              onClick={() => {
                                setFilterTime("6-9");
                              }}
                            >
                              06 AM - 09 AM
                            </div>
                            <div
                              className={`rounded-full py-1 px-5 font-semibold border-[1px] border-[#EAEAEA] text-xs ${
                                filterTime === "9-12"
                                  ? "bg-blue-primary text-white"
                                  : "bg-[#FAFAFA]"
                              }`}
                              onClick={() => {
                                setFilterTime("9-12");
                              }}
                            >
                              09 AM - 12 AM
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <button
                            className="rounded-full bg-blue-primary"
                            onClick={clickApplyFilter}
                          >
                            <p className="flex items-center justify-center font-medium text-base text-white h-8 px-24">
                              Terapkan
                            </p>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Draggable>
              </div>
            </div>
          </>
        ) : (
          <></>
        )}
      </div>
    </Layout>
  );
}
