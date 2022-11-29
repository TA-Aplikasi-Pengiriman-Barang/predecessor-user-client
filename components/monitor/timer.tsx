import busMonitor from "../../public/assets/image/bus/busMonitor.svg";
import Image from "next/image";
import sepi from "../../public/assets/image/monitor/sepi.svg";
import normal from "../../public/assets/image/monitor/ramai.svg";
import penuh from "../../public/assets/image/monitor/penuh.svg";

interface TimeProps {
  estimate: string;
  num: number;
}

export default function MonitorTimer({ estimate, num }: TimeProps) {
  return (
    <div className="h-1/3 border-2 rounded-xl flex flex-row justify-between items-center p-6">
      <div className="w-1/5 flex space-x-4">
        <div>
          <Image alt="" src={busMonitor} />
        </div>
        <div className="bg-white rounded-xl px-12 py-2 my-auto">
          <p className="text-black text-7xl">{num}</p>
        </div>
      </div>
      <div className="w-4/5 flex justify-end">
        <p className="text-white text-8xl">
          akan tiba - <span className="font-semibold">{estimate}</span>{" "}
        </p>
      </div>
    </div>
  );
}

interface EstimateProps {
  num: number;
  timeLeft: number;
}

export function MonitorEstimate({ num, timeLeft }: EstimateProps) {
  return (
    <div className="h-1/3 border-2 rounded-xl flex flex-row justify-between items-center p-6">
      <div className="w-1/5 flex space-x-4">
        <div>
          <Image alt="" src={busMonitor} />
        </div>
        <div className="bg-white rounded-xl px-12 py-2 my-auto">
          <p className="text-black text-7xl">{num}</p>
        </div>
      </div>
      <div className="w-4/5 flex justify-end">
        <p className="text-white text-8xl font-semibold">{timeLeft} Menit </p>
      </div>
    </div>
  );
}

interface RouteProps {
  num: number;
  route: string;
}

export function MonitorRoute({ num, route }: RouteProps) {
  return (
    <div className="h-1/3 border-2 rounded-xl flex flex-row justify-between items-center p-6">
      <div className="w-1/5 flex space-x-4">
        <div>
          <Image alt="" src={busMonitor} />
        </div>
        <div className="bg-white rounded-xl px-12 py-2 my-auto">
          <p className="text-black text-7xl">{num}</p>
        </div>
      </div>
      <div className="w-4/5 flex justify-end">
        <div className="bg-red-primary px-16 py-4 rounded-2xl">
          <p className="text-white text-8xl">{route}</p>
        </div>
      </div>
    </div>
  );
}

interface StatusProps {
  num: number;
  status: string;
}

export function MonitorStatus({ num, status }: StatusProps) {
  return (
    <div className="h-1/3 border-2 rounded-xl flex flex-row justify-between items-center p-6">
      <div className="w-1/5 flex space-x-4">
        <div>
          <Image alt="" src={busMonitor} />
        </div>
        <div className="bg-white rounded-xl px-12 py-2 my-auto">
          <p className="text-black text-7xl">{num}</p>
        </div>
      </div>
      <div className="w-4/5 flex justify-end">
        <div className="flex space-x-4 2xl:space-x-8 w-3/5  2xl:w-1/3">
          <div className="w-16 my-auto">
          {status === "SEPI" ? (
              <Image alt="" src={sepi} />
            ) : status === "NORMAL" ? (
              <Image alt="" src={normal} />
            ) : status === "PENUH" ? (
              <Image alt="" src={penuh} />
            ) : (
              <><p className="text-white text-8xl">{status}</p></>
            )}
            
          </div>
          <div className="w-1/2">
            {status === "SEPI" ? (
              <><p className="text-white text-8xl text-[#3EBC70]">{status}</p></>
            ) : status === "NORMAL" ? (
              <><p className="text-white text-8xl text-[#EDC808]">{status}</p></>
            ) : status === "PENUH" ? (
              <><p className="text-white text-8xl text-red-primary">{status}</p></>
            ) : (
              <><p className="text-white text-8xl">{status}</p></>
            )}

            
          </div>
        </div>
      </div>
    </div>
  );
}
