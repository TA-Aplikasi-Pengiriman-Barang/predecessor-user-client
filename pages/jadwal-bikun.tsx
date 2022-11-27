import Image from "next/image";
import Layout from "../components/Layout";
import bus from "../public/assets/icon/bus/busJadwal.svg";
import location from "../public/assets/icon/location.svg";
import calendar from "../public/assets/icon/calendar.svg";
import fixJadwal from "../data/fixJadwal.json";
import { useState } from "react";
import Draggable from "react-draggable";

export default function jadwalbikun() {
  const [isFilter, setIsFilter] = useState(false);

  const dataSenin = fixJadwal.data.filter((e: any) =>
    e.tanggal.includes("Senin")
  );
  const dataSelasa = fixJadwal.data.filter((e: any) =>
    e.tanggal.includes("Selasa")
  );
  const dataRabu = fixJadwal.data.filter((e: any) =>
    e.tanggal.includes("Rabu")
  );
  const dataKamis = fixJadwal.data.filter((e: any) =>
    e.tanggal.includes("Kamis")
  );
  const dataJumat = fixJadwal.data.filter((e: any) =>
    e.tanggal.includes("Jumat")
  );
  const dataSabtu = fixJadwal.data.filter((e: any) =>
    e.tanggal.includes("Sabtu")
  );
  const dataMinggu = fixJadwal.data.filter((e: any) =>
    e.tanggal.includes("Minggu")
  );

  //   console.log(fixJadwal.data.filter((e: any) =>
  //   e.waktu.includes("06:") ||
  //   e.waktu.includes("07:") ||
  //   e.waktu.includes("08:") ||
  //   e.waktu.includes("09:00")
  // ))

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
                placeholder="Cari halte"
              />
            </div>
            <div
              className="flex space-x-1 rounded-full border-[1px] border-[#EAEAEA] bg-[#FAFAFA] mx-20 px-2 py-1 text-xs"
              onClick={() => setIsFilter(true)}
            >
              <Image src={calendar} alt="" />
              {/* <input
                type="date"
                className="w-full  bg-[#FAFAFA] focus:outline-none text-black"
                placeholder="Filter By Time"
              /> */}
              <p className="font-semibold text-xs ">Filter by time</p>
            </div>
          </div>
        </div>

        {/* Data Jadwal Bikun  */}
        <div className="h-screen overflow-y-scroll bg-white pt-20 px-4 space-y-4">
          {/* looping hari senin */}
          <div>
            <div className="flex space-x-2 w-full pb-2">
              <p className="text-[10px] w-1/2">Senin, 21 November 2022</p>
              <div className="h-[1px] bg-[#D9D9D9] w-full my-auto"></div>
            </div>

            <div className="space-y-2">
              {/* looping jadwal berdasarkan hari */}
              {dataSenin.map((val: any) => (
                <div className="h-[65px] border-[1px] rounded-xl p-3 flex justify-between">
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
              ))}
            </div>
          </div>

          {/* looping hari selasa */}
          <div>
            <div className="flex space-x-2 w-full pb-2">
              <p className="text-[10px] w-1/2">Selasa, 22 November 2022</p>
              <div className="h-[1px] bg-[#D9D9D9] w-full my-auto"></div>
            </div>

            {/* looping jadwal berdasarkan hari */}

            <div className="space-y-2">
              {/* looping jadwal berdasarkan hari */}
              {dataSelasa.map((val: any) => (
                <div className="h-[65px] border-[1px] rounded-xl p-3 flex justify-between">
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
              ))}
            </div>
          </div>

          {/* looping hari rabu */}
          <div>
            <div className="flex space-x-2 w-full pb-2">
              <p className="text-[10px] w-1/2">Rabu, 23 November 2022</p>
              <div className="h-[1px] bg-[#D9D9D9] w-full my-auto"></div>
            </div>

            {/* looping jadwal berdasarkan hari */}
            <div className="space-y-2">
              {/* looping jadwal berdasarkan hari */}
              {dataRabu.map((val: any) => (
                <div className="h-[65px] border-[1px] rounded-xl p-3 flex justify-between">
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
              ))}
            </div>
          </div>

          {/* looping hari kamis */}
          <div>
            <div className="flex space-x-2 w-full pb-2">
              <p className="text-[10px] w-1/2">Kamis, 24 November 2022</p>
              <div className="h-[1px] bg-[#D9D9D9] w-full my-auto"></div>
            </div>

            {/* looping jadwal berdasarkan hari */}
            <div className="space-y-2">
              {/* looping jadwal berdasarkan hari */}
              {dataKamis.map((val: any) => (
                <div className="h-[65px] border-[1px] rounded-xl p-3 flex justify-between">
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
              ))}
            </div>
          </div>

          {/* looping hari jumat */}
          <div>
            <div className="flex space-x-2 w-full pb-2">
              <p className="text-[10px] w-1/2">Jumat, 25 November 2022</p>
              <div className="h-[1px] bg-[#D9D9D9] w-full my-auto"></div>
            </div>

            {/* looping jadwal berdasarkan hari */}
            <div className="space-y-2">
              {/* looping jadwal berdasarkan hari */}
              {dataJumat.map((val: any) => (
                <div className="h-[65px] border-[1px] rounded-xl p-3 flex justify-between">
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
              ))}
            </div>
          </div>

          {/* looping hari sabtu */}
          <div>
            <div className="flex space-x-2 w-full pb-2">
              <p className="text-[10px] w-1/2">Sabtu, 26 November 2022</p>
              <div className="h-[1px] bg-[#D9D9D9] w-full my-auto"></div>
            </div>

            {/* looping jadwal berdasarkan hari */}
            <div className="space-y-2">
              {/* looping jadwal berdasarkan hari */}
              {dataSabtu.map((val: any) => (
                <div className="h-[65px] border-[1px] rounded-xl p-3 flex justify-between">
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
              ))}
            </div>
          </div>

          {/* looping hari minggu */}
          <div>
            <div className="flex space-x-2 w-full pb-2">
              <p className="text-[10px] w-1/2">Minggu, 27 November 2022</p>
              <div className="h-[1px] bg-[#D9D9D9] w-full my-auto"></div>
            </div>

            {/* looping jadwal berdasarkan hari */}
            <div className="space-y-2">
              {/* looping jadwal berdasarkan hari */}
              {dataMinggu.map((val: any) => (
                <div className="h-[65px] border-[1px] rounded-xl p-3 flex justify-between">
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
              ))}
            </div>
          </div>
        </div>

        {isFilter === true ? (
          <>
            {" "}
            <div className="absolute bottom-[40%] w-full">
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
                            <div className="rounded-full py-1 px-2 border-[1px] border-[#EAEAEA] bg-[#FAFAFA] text-xs">
                              21/11/2022
                            </div>
                          </div>
                          <div className="w-1/2 flex flex-col space-y-1">
                            <p className="text-sm">Tanggal Berakhir</p>
                            <div className="rounded-full py-1 px-2 border-[1px] border-[#EAEAEA] bg-[#FAFAFA] text-xs">
                            27/11/2022
                            </div>
                          </div>
                        </div>
                        <div className=" flex flex-col space-y-1">
                          <p className="text-sm">Rentang Jam</p>
                          <div className="flex flex-row space-x-2">
                            <div className="rounded-full py-1 px-5 font-semibold border-[1px] border-[#EAEAEA] bg-[#FAFAFA] text-xs">
                              All
                            </div>
                            <div
                              className="rounded-full py-1 px-5 font-semibold border-[1px] border-[#EAEAEA] bg-[#FAFAFA] text-xs"
                              // onClick={() => (

                              // )}
                            >
                              06 AM - 09 AM
                            </div>
                            <div className="rounded-full py-1 px-5 font-semibold border-[1px] border-[#EAEAEA] bg-[#FAFAFA] text-xs">
                              09 AM - 12 AM
                            </div>
                            {/* <div className="rounded-full py-1 px-5 font-semibold border-[1px] border-[#EAEAEA] bg-[#FAFAFA] text-xs">
                              12 PM - 15 PM
                            </div>
                            <div className="rounded-full py-1 px-5 font-semibold border-[1px] border-[#EAEAEA] bg-[#FAFAFA] text-xs">
                              15 PM - 18 PM
                            </div> */}
                          </div>
                        </div>
                        <div className="flex justify-center">
                          <button className="rounded-full bg-blue-primary">
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
