import Image from "next/image";
import Layout from "../components/Layout";
import bus from "../public/assets/icon/bus/busJadwal.svg";
import location from "../public/assets/icon/location.svg";
import calendar from "../public/assets/icon/calendar.svg";
import jadwalNotFound from "../public/assets/image/jadwalNotFound.svg";
import fixJadwal from "../data/fixJadwal.json";
import { useState } from "react";
import Draggable from "react-draggable";
import { days } from "../components/constant/days";

export default function jadwalbikun() {
  const [isFilter, setIsFilter] = useState(false);
  const [searchWord, setSearchWord] = useState<any>(null);
  const [startDate, setStartDate] = useState<number>(0);
  const [endDate, setEndDate] = useState<any>(null);
  const [filterTime, setFilterTime] = useState("all");
  const [dataJadwal, setDataJadwal] = useState(fixJadwal.data);

  const loopDay = [0, 1, 2, 3, 4, 5, 6];

  const handleSearch = (keyword: String) => {
    const filteredSearchData = fixJadwal.data.filter((e: any) =>
      e.halte.toLowerCase().includes(keyword.toLowerCase())
    );
    setSearchWord(keyword);
    setDataJadwal(filteredSearchData);
  };

  const clearKeyword = () => {
    setSearchWord(null);
    setDataJadwal(fixJadwal.data);
  };

  const clickApplyFilter = () => {
    if (endDate !== null) {
      let tempData = fixJadwal.data;
      let loopDay = []
      let conditions: any = [];
      for (let i = startDate; i <= endDate; i++) {
        loopDay.push(i)
        conditions.push(days[i])
      }

      // @ts-ignore
      let filteredData = tempData.filter((val: any) => conditions.some(el => val.tanggal.includes(el)))

      let newData
      if (filterTime === "6-9") {
        newData = filteredData.filter((val: any) => ["06:", "07:", "08:", "09:00"].some(el => val.waktu.includes(el)))
      } else if (filterTime === "9-12") {
        newData = filteredData.filter((val: any) => ["09:", "10:", "11:", "12:00"].some(el => val.waktu.includes(el)))
      } else {
        newData = filteredData
      }

      setDataJadwal(newData)
    }
  }

  return (
    <Layout>
      <div id="front" className="h-screen bg-white">
        {/* Komponen Cari & Filter Jadwal  */}
        <div className="bg-blue-primary h-16 rounded-[0_0_1rem_1rem] flex justify-center">
          <div className="h-28 w-5/6 rounded-lg bg-white flex flex-col justify-center mt-2 px-4 space-y-3 drop-shadow-xl">
            <div className="flex space-x-2 rounded-full border-[1px] border-[#EAEAEA] bg-[#FAFAFA] px-4 py-2 text-sm">
              <Image src={location} alt="" />
              <input
                type="text"
                className="w-full  bg-[#FAFAFA] focus:outline-none text-black"
                placeholder={searchWord ? searchWord : "Cari halte"}
                disabled={searchWord ? true : false}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    // @ts-ignore
                    if (event.target.value !== "") {
                      // @ts-ignore
                      handleSearch(event.target.value);
                    }
                  }
                }}
              />
              {searchWord && (
                <div className="text-blue-primary" onClick={clearKeyword}>
                  Reset
                </div>
              )}
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

        {/* Data Jadwal Bikun  */}
        <div className="h-screen overflow-y-scroll bg-white pt-20 px-4 space-y-4">
          {/* Looping Hari */}
          {loopDay.map((angka) => (
            <div key={angka}>
              <div className="flex space-x-2 w-full pb-2">
                <p className="text-[10px] w-1/2">
                  {days[angka]}, 2{angka + 1} November 2022
                </p>
                <div className="h-[1px] bg-[#D9D9D9] w-full my-auto"></div>
              </div>

              <div className="space-y-2">
                {/* looping jadwal berdasarkan hari */}
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
                      <div className="h-[65px] border-[1px] rounded-xl p-3 flex justify-between" key={index}>
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
                        <p className="my-auto text-xl font-bold">{val.waktu}</p>
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
            <div className="absolute bottom-[40%] w-full drop-shadow-xl">
              <div id="front1" className="h-screen">
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
                                setEndDate(parseInt(e.target.value));
                              }}
                              value={startDate}
                            >
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
                            <select className="rounded-full py-1 px-2 border-[1px] border-[#EAEAEA] bg-[#FAFAFA] text-xs"
                              onChange={(e) => {
                                setEndDate(parseInt(e.target.value));
                              }}
                            >
                              {startDate &&
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
                          <button className="rounded-full bg-blue-primary" 
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
