import Image from "next/image";
import { useEffect, useState } from "react";
import busMonitor from "../public/assets/image/bus/busMonitor.svg";
import penuh from "../public/assets/image/monitor/penuh.svg";
import MonitorTimer, {
  MonitorEstimate,
  MonitorRoute,
  MonitorStatus,
} from "../components/monitor/timer";

const mockData = [
  {
    number: 1,
    estimate: "15:30",
    timeLeft: 10,
    route: "LURUS",
    status: "SEPI",
  },
  {
    number: 2,
    estimate: "15:37",
    timeLeft: 17,
    route: "LURUS",
    status: "NORMAL",
  },
  {
    number: 3,
    estimate: "15:44",
    timeLeft: 24,
    route: "LURUS",
    status: "PENUH",
  },
];

export default function monitor() {
  const [i, setI] = useState(0);

  const getInterval = (mode: number) => {
    switch (mode) {
      case 0:
        return 15000;
      case 1:
        return 15000;
      case 2:
        return 5000;
      default:
        setI(0);
        return 50000;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setI((prevCount) => prevCount + 1);
    }, getInterval(i));
    return () => clearInterval(interval);
  });

  return (
    <>
      {i === 0 ? (
        <>
          <div className="bg-black h-screen w-screen flex flex-col space-y-6 p-8 text-white">
            {mockData.map((d) => {
              return <MonitorTimer estimate={d.estimate} num={d.number} />;
            })}
          </div>
        </>
      ) : i === 1 ? (
        <>
          <div className="bg-black h-screen w-screen flex flex-col space-y-6 p-8 text-white">
            {mockData.map((d) => {
              return <MonitorEstimate timeLeft={d.timeLeft} num={d.number} />;
            })}
          </div>
        </>
      ) : i === 2 ? (
        <>
          <div className="bg-black h-screen w-screen flex flex-col space-y-6 p-8 text-white">
            {mockData.map((d) => {
              return <MonitorRoute route={d.route} num={d.number} />;
            })}
          </div>
        </>
      ) : i === 3 ? (
        <>
          {" "}
          <div className="bg-black h-screen w-screen flex flex-col space-y-6 p-8 text-white">
            <div className="bg-black h-screen w-screen flex flex-col space-y-6 p-8 text-white">
              {mockData.map((d) => {
                return <MonitorStatus status={d.status} num={d.number} />;
              })}
            </div>
          </div>
        </>
      ) : (
        <>aa</>
      )}
    </>
  );
}
