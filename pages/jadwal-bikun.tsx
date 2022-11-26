import Image from "next/image";
import Layout from "../components/Layout";
import bus from "../public/assets/icon/bus/busJadwal.svg";
import location from "../public/assets/icon/location.svg";
import calendar from "../public/assets/icon/calendar.svg";

export default function jadwalbikun() {
  return (
    <Layout>
      <div id="front" className="h-screen overflow-y-scroll bg-white">
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
            <div className="flex space-x-1 rounded-full border-[1px] border-[#EAEAEA] bg-[#FAFAFA] mx-20 px-2 py-1 text-xs">
              <Image src={calendar} alt="" />
              <input
                type="date"
                className="w-full  bg-[#FAFAFA] focus:outline-none text-black"
                placeholder="Filter By Time"
              />
            </div>
          </div>
        </div>

        {/* Data Jadwal Bikun  */}
        <div className="h-screen bg-white pt-20 px-4 space-y-4">
          {/* looping tanggal-tanggal hari */}
          <div>
            <div className="flex space-x-2 w-full pb-2">
              <p className="text-[10px] w-1/2">Senin, 31 Oktober 2022</p>
              <div className="h-[1px] bg-[#D9D9D9] w-full my-auto"></div>
            </div>

            {/* looping jadwal berdasarkan hari */}
            <div className="space-y-2">
              <div className="h-[65px] border-[1px] rounded-xl p-3 flex justify-between">
                <div className="flex flex-col justify-center space-y-1">
                  <div className="flex flex-row space-x-3">
                    <div className="flex space-x-1">
                      <Image src={bus} alt="" />
                      <p className="bg-black-primary my-auto px-2.5 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                        1
                      </p>
                    </div>
                    <p className="bg-red-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                      Rute Lurus
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
                      <Image src={bus} alt="" />
                      <p className="bg-black-primary my-auto px-2.5 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                        1
                      </p>
                    </div>
                    <p className="bg-blue-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                      Rute Kanan
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
                      <Image src={bus} alt="" />
                      <p className="bg-black-primary my-auto px-2.5 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                        1
                      </p>
                    </div>
                    <p className="bg-red-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                      Rute Lurus
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
                      <Image src={bus} alt="" />
                      <p className="bg-black-primary my-auto px-2.5 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                        1
                      </p>
                    </div>
                    <p className="bg-blue-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                      Rute Kanan
                    </p>
                  </div>
                  <p className="text-xs">Senin, 31 Oktober 2022</p>
                </div>
                <p className="my-auto text-xl font-bold">07:36</p>
              </div>
            </div>
          </div>

          {/* looping tanggal-tanggal hari */}
          <div>
            <div className="flex space-x-2 w-full pb-2">
              <p className="text-[10px] w-1/2">Senin, 31 Oktober 2022</p>
              <div className="h-[1px] bg-[#D9D9D9] w-full my-auto"></div>
            </div>

            {/* looping jadwal berdasarkan hari */}
            <div className="space-y-2">
              <div className="h-[65px] border-[1px] rounded-xl p-3 flex justify-between">
                <div className="flex flex-col justify-center space-y-1">
                  <div className="flex flex-row space-x-3">
                    <div className="flex space-x-1">
                      <Image src={bus} alt="" />
                      <p className="bg-black-primary my-auto px-2.5 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                        1
                      </p>
                    </div>
                    <p className="bg-red-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                      Rute Lurus
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
                      <Image src={bus} alt="" />
                      <p className="bg-black-primary my-auto px-2.5 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                        1
                      </p>
                    </div>
                    <p className="bg-blue-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                      Rute Kanan
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
                      <Image src={bus} alt="" />
                      <p className="bg-black-primary my-auto px-2.5 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                        1
                      </p>
                    </div>
                    <p className="bg-red-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                      Rute Lurus
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
                      <Image src={bus} alt="" />
                      <p className="bg-black-primary my-auto px-2.5 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                        1
                      </p>
                    </div>
                    <p className="bg-blue-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
                      Rute Kanan
                    </p>
                  </div>
                  <p className="text-xs">Senin, 31 Oktober 2022</p>
                </div>
                <p className="my-auto text-xl font-bold">07:36</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
