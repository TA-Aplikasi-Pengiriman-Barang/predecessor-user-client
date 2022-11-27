import Image from "next/image";
import { useEffect, useState } from "react";
import busMonitor from "../public/assets/image/bus/busMonitor.svg";
import sepi from "../public/assets/image/monitor/sepi.svg";
import penuh from "../public/assets/image/monitor/penuh.svg";

export default function monitor() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setI(prevCount => prevCount + 1);
      if (i === 3) {
        setI(0)
      }
    }, 15000);
    return () => clearInterval(interval);
  })

  return (
    <>
      {i === 0 ? (
        <>
          {" "}
          <div className="bg-black h-screen w-screen flex flex-col space-y-6 p-8 text-white">
            <div className="h-1/3 border-2 rounded-xl flex flex-row justify-between items-center p-6">
              <div className="w-1/5 flex space-x-4">
                <div>
                  <Image alt="" src={busMonitor} />
                </div>
                <div className="bg-white rounded-xl px-12 py-2 my-auto">
                  <p className="text-black text-7xl">2</p>
                </div>
              </div>
              <div className="w-4/5 flex justify-end">
                <p className="text-white text-8xl">
                  akan tiba - <span className="font-semibold"> 08:37</span>{" "}
                </p>
              </div>
            </div>
            <div className="h-1/3 border-2 rounded-xl flex flex-row justify-between items-center p-6">
              <div className="w-1/5 flex space-x-4">
                <div>
                  <Image alt="" src={busMonitor} />
                </div>
                <div className="bg-white rounded-xl px-12 py-2 my-auto">
                  <p className="text-black text-7xl">2</p>
                </div>
              </div>
              <div className="w-4/5 flex justify-end">
                <p className="text-white text-8xl">
                  akan tiba - <span className="font-semibold"> 08:37</span>{" "}
                </p>
              </div>
            </div>{" "}
            <div className="h-1/3 border-2 rounded-xl flex flex-row justify-between items-center p-6">
              <div className="w-1/5 flex space-x-4">
                <div>
                  <Image alt="" src={busMonitor} />
                </div>
                <div className="bg-white rounded-xl px-12 py-2 my-auto">
                  <p className="text-black text-7xl">2</p>
                </div>
              </div>
              <div className="w-4/5 flex justify-end">
                <p className="text-white text-8xl">
                  akan tiba - <span className="font-semibold"> 08:37</span>{" "}
                </p>
              </div>
            </div>
          </div>{" "}
        </>
      ) : i === 1 ? (
        <>
          {" "}
          <div className="bg-black h-screen w-screen flex flex-col space-y-6 p-8 text-white">
            <div className="h-1/3 border-2 rounded-xl flex flex-row justify-between items-center p-6">
              <div className="w-1/5 flex space-x-4">
                <div>
                  <Image alt="" src={busMonitor} />
                </div>
                <div className="bg-white rounded-xl px-12 py-2 my-auto">
                  <p className="text-black text-7xl">2</p>
                </div>
              </div>
              <div className="w-4/5 flex justify-end">
                <p className="text-white text-8xl font-semibold">10 Menit </p>
              </div>
            </div>{" "}
            <div className="h-1/3 border-2 rounded-xl flex flex-row justify-between items-center p-6">
              <div className="w-1/5 flex space-x-4">
                <div>
                  <Image alt="" src={busMonitor} />
                </div>
                <div className="bg-white rounded-xl px-12 py-2 my-auto">
                  <p className="text-black text-7xl">2</p>
                </div>
              </div>
              <div className="w-4/5 flex justify-end">
                <p className="text-white text-8xl font-semibold">10 Menit </p>
              </div>
            </div>{" "}
            <div className="h-1/3 border-2 rounded-xl flex flex-row justify-between items-center p-6">
              <div className="w-1/5 flex space-x-4">
                <div>
                  <Image alt="" src={busMonitor} />
                </div>
                <div className="bg-white rounded-xl px-12 py-2 my-auto">
                  <p className="text-black text-7xl">2</p>
                </div>
              </div>
              <div className="w-4/5 flex justify-end">
                <p className="text-white text-8xl font-semibold">10 Menit </p>
              </div>
            </div>
          </div>
        </>
      ) : i === 2 ? (
        <>
          {" "}
          <div className="bg-black h-screen w-screen flex flex-col space-y-6 p-8 text-white">
            <div className="h-1/3 border-2 rounded-xl flex flex-row justify-between items-center p-6">
              <div className="w-1/5 flex space-x-4">
                <div>
                  <Image alt="" src={busMonitor} />
                </div>
                <div className="bg-white rounded-xl px-12 py-2 my-auto">
                  <p className="text-black text-7xl">2</p>
                </div>
              </div>
              <div className="w-4/5 flex justify-end">
                <div className="bg-red-primary px-16 py-4 rounded-2xl">
                  <p className="text-white text-8xl">Rute lurus </p>
                </div>
              </div>
            </div>{" "}
            <div className="h-1/3 border-2 rounded-xl flex flex-row justify-between items-center p-6">
              <div className="w-1/5 flex space-x-4">
                <div>
                  <Image alt="" src={busMonitor} />
                </div>
                <div className="bg-white rounded-xl px-12 py-2 my-auto">
                  <p className="text-black text-7xl">2</p>
                </div>
              </div>
              <div className="w-4/5 flex justify-end">
                <div className="bg-red-primary px-16 py-4 rounded-2xl">
                  <p className="text-white text-8xl">Rute lurus </p>
                </div>
              </div>
            </div>{" "}
            <div className="h-1/3 border-2 rounded-xl flex flex-row justify-between items-center p-6">
              <div className="w-1/5 flex space-x-4">
                <div>
                  <Image alt="" src={busMonitor} />
                </div>
                <div className="bg-white rounded-xl px-12 py-2 my-auto">
                  <p className="text-black text-7xl">2</p>
                </div>
              </div>
              <div className="w-4/5 flex justify-end">
                <div className="bg-red-primary px-16 py-4 rounded-2xl">
                  <p className="text-white text-8xl">Rute lurus </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : i === 3 ? (
        <>
          {" "}
          <div className="bg-black h-screen w-screen flex flex-col space-y-6 p-8 text-white">
            <div className="h-1/3 border-2 rounded-xl flex flex-row justify-between items-center p-6">
              <div className="w-1/5 flex space-x-4">
                <div>
                  <Image alt="" src={busMonitor} />
                </div>
                <div className="bg-white rounded-xl px-12 py-2 my-auto">
                  <p className="text-black text-7xl">2</p>
                </div>
              </div>
              <div className="w-4/5 flex justify-end">
                <div className="flex space-x-4 2xl:space-x-8 w-2/5 2xl:w-1/3">
                  <Image alt="" src={sepi} />
                  <p className="text-white text-8xl text-[#3EBC70]">Sepi </p>
                </div>
              </div>
            </div>{" "}
            <div className="h-1/3 border-2 rounded-xl flex flex-row justify-between items-center p-6">
              <div className="w-1/5 flex space-x-4">
                <div>
                  <Image alt="" src={busMonitor} />
                </div>
                <div className="bg-white rounded-xl px-12 py-2 my-auto">
                  <p className="text-black text-7xl">2</p>
                </div>
              </div>
              <div className="w-4/5 flex justify-end">
                <div className="flex space-x-4 2xl:space-x-8 w-2/5 2xl:w-1/3">
                  <Image alt="" src={penuh} />
                  <p className="text-white text-8xl text-red-primary">
                    Penuh{" "}
                  </p>
                </div>
              </div>
            </div>{" "}
            <div className="h-1/3 border-2 rounded-xl flex flex-row justify-between items-center p-6">
              <div className="w-1/5 flex space-x-4">
                <div>
                  <Image alt="" src={busMonitor} />
                </div>
                <div className="bg-white rounded-xl px-12 py-2 my-auto">
                  <p className="text-black text-7xl">2</p>
                </div>
              </div>
              <div className="w-4/5 flex justify-end">
                <div className="flex space-x-4 2xl:space-x-8 w-2/5 2xl:w-1/3">
                  <Image alt="" src={penuh} />
                  <p className="text-white text-8xl text-red-primary">
                    Penuh{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>aa</>
      )}
    </>
  );
}
