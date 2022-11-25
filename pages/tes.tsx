import Image from "next/image";
import { useEffect } from "react";
import ruteAll from "../static/image/ruteAll.svg";

export default function tes() {
  let i = 0;
  const update = () => {
    i++;
    console.log(i);
  };

  return (
    <div className="h-screen bg-blue-800">
      {i === 1 ? (
        <>
          <div className="" id="1">
            konten 1
          </div>{" "}
        </>
      ) : i === 2 ? (
        <>
          <div className="" id="1">
            konten 2
          </div>{" "}
        </>
      ) : (
        <>
          {" "}
          <div className="" id="1">
            konten 3
          </div>
          <div className="" id="1">
            konten 4
          </div>
          <div className="" id="1">
            konten 5
          </div>
        </>
      )}

      <button onClick={() => update()}>klik me</button>
    </div>
  );
}
