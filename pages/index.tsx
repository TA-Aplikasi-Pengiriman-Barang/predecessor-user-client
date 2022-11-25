import Image from "next/image";
import Layout from "../components/Layout";
import { useState } from "react";
import location from "../static/icon/location.svg";
import position from "../static/icon/position.svg";
import Draggable from "react-draggable";

export default function Home() {
  const [isHalte, setIsHalte] = useState(false);

  const pickHalte = () => {
    setIsHalte(true);
  };

  

  return (
    <>
      <Layout>
        <div className={isHalte ? "h-full" : ""}>
          <div className="absolute bottom-[40%] w-full">
            <div id="fronttt" className="h-screen hidden">
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

                  <div className="p-4"></div>
                </div>
              </Draggable>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
}
// {/* <div
// id="front2"
// className="bg-blue-primary h-16 absolute w-full rounded-[0_0_1rem_1rem] flex justify-center"
// >
// <div className="h-20 w-5/6 rounded-lg bg-white flex flex-col justify-center mt-2 px-4 space-y-3 drop-shadow-xl">
//   <div className="flex space-x-2 rounded-full border-[1px] border-[#EAEAEA] bg-[#FAFAFA] px-4 py-2 text-sm">
//     <Image src={location} alt="" />
//     <input
//       type="text"
//       className="w-full  bg-[#FAFAFA] focus:outline-none"
//       placeholder="Cari halte"
//       id="inputHalte"
//       onFocus={pickHalte}
//       onBlur={() => {
//         setIsHalte(false);
//         console.log("nmm");
//       }}
//     />
//   </div>
//   {/* <div className="flex flex-row space-x-2 justify-center">
//     <div className="rounded-full border-[1px] border-[#EAEAEA] bg-[#FAFAFA] w-24 py-1 text-center">
//       <p className="text-[10px]"> Pondok Cina</p>
//     </div>
//     <div className="rounded-full border-[1px] border-[#EAEAEA] bg-[#FAFAFA] w-24 py-1 text-center">
//       <p className="text-[10px]"> RIK</p>
//     </div>
//   </div> */}
// </div>
// </div>

// <div className={isHalte ? "bg-white h-full show" : "hidden"}>
// <div className=" pt-24 h-full">
//   <div className="p-4 h-full space-y-4">
//     {/* filter */}
//     <div className="flex justify-center space-x-3">
//       <div className="border-[1px] rounded-full border-[#EAEAEA] px-6 bg-blue-primary text-white">
//         <p className="text-xs text-white">All</p>
//       </div>
//       <div className="border-[1px] rounded-full bg-[#FBFBFB] border-[#EAEAEA] px-6">
//         <p className="text-xs">Today</p>
//       </div>
//       <div className="border-[1px] rounded-full bg-[#FBFBFB] border-[#EAEAEA] px-6">
//         <p className="text-xs">Last 7 days</p>
//       </div>
//     </div>

//     {/* konten */}
//     <div className="flex flex-row space-x-2 my-auto border-[1px] py-2 px-3 rounded-xl h-16">
//       <div className="my-auto flex flex-col space-y-1">
//         <Image src={position} alt="" className="mx-auto" />
//         <p className="text-[8px]">0.1 km</p>
//       </div>
//       <div className="flex-col flex-grow">
//         <p className="text-md">Asrama</p>
//         <div className="flex space-x-2">
//           {" "}
//           <p className="text-xs text-[#959595]">Halte Berikutnya</p>
//           <p className="text-xs text-[#959595]">{">"}</p>
//           <p className="text-xs text-[#959595]">Stasiun UI</p>
//         </div>
//       </div>
//       <div className="my-auto">
//         <p className="bg-red-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
//           Rute Lurus
//         </p>
//       </div>
//     </div>

//     <div className="flex flex-row space-x-2 my-auto border-[1px] py-2 px-3 rounded-xl h-16">
//       <div className="my-auto flex flex-col space-y-1">
//         <Image src={position} alt="" className="mx-auto" />
//         <p className="text-[8px]">0.1 km</p>
//       </div>
//       <div className="flex-col flex-grow">
//         <p className="text-md">Asrama</p>
//         <div className="flex space-x-2">
//           {" "}
//           <p className="text-xs text-[#959595]">Halte Berikutnya</p>
//           <p className="text-xs text-[#959595]">{">"}</p>
//           <p className="text-xs text-[#959595]">Stasiun UI</p>
//         </div>
//       </div>
//       <div className="my-auto">
//         <p className="bg-red-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
//           Rute Lurus
//         </p>
//       </div>
//     </div>

//     <div className="flex flex-row space-x-2 my-auto border-[1px] py-2 px-3 rounded-xl h-16">
//       <div className="my-auto flex flex-col space-y-1">
//         <Image src={position} alt="" className="mx-auto" />
//         <p className="text-[8px]">0.1 km</p>
//       </div>
//       <div className="flex-col flex-grow">
//         <p className="text-md">Asrama</p>
//         <div className="flex space-x-2">
//           {" "}
//           <p className="text-xs text-[#959595]">Halte Berikutnya</p>
//           <p className="text-xs text-[#959595]">{">"}</p>
//           <p className="text-xs text-[#959595]">Stasiun UI</p>
//         </div>
//       </div>
//       <div className="my-auto">
//         <p className="bg-blue-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
//           Rute Kanan
//         </p>
//       </div>
//     </div>

//     <div className="flex flex-row space-x-2 my-auto border-[1px] py-2 px-3 rounded-xl h-16">
//       <div className="my-auto flex flex-col space-y-1">
//         <Image src={position} alt="" className="mx-auto" />
//         <p className="text-[8px]">0.1 km</p>
//       </div>
//       <div className="flex-col flex-grow">
//         <p className="text-md">Asrama</p>
//         <div className="flex space-x-2">
//           {" "}
//           <p className="text-xs text-[#959595]">Halte Berikutnya</p>
//           <p className="text-xs text-[#959595]">{">"}</p>
//           <p className="text-xs text-[#959595]">Stasiun UI</p>
//         </div>
//       </div>
//       <div className="my-auto">
//         <p className="bg-red-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
//           Rute Lurus
//         </p>
//       </div>
//     </div>

//     <div className="flex flex-row space-x-2 my-auto border-[1px] py-2 px-3 rounded-xl h-16">
//       <div className="my-auto flex flex-col space-y-1">
//         <Image src={position} alt="" className="mx-auto" />
//         <p className="text-[8px]">0.1 km</p>
//       </div>
//       <div className="flex-col flex-grow">
//         <p className="text-md">Asrama</p>
//         <div className="flex space-x-2">
//           {" "}
//           <p className="text-xs text-[#959595]">Halte Berikutnya</p>
//           <p className="text-xs text-[#959595]">{">"}</p>
//           <p className="text-xs text-[#959595]">Stasiun UI</p>
//         </div>
//       </div>
//       <div className="my-auto">
//         <p className="bg-red-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
//           Rute Lurus
//         </p>
//       </div>
//     </div>

//     <div className="flex flex-row space-x-2 my-auto border-[1px] py-2 px-3 rounded-xl h-16">
//       <div className="my-auto flex flex-col space-y-1">
//         <Image src={position} alt="" className="mx-auto" />
//         <p className="text-[8px]">0.1 km</p>
//       </div>
//       <div className="flex-col flex-grow">
//         <p className="text-md">Asrama</p>
//         <div className="flex space-x-2">
//           {" "}
//           <p className="text-xs text-[#959595]">Halte Berikutnya</p>
//           <p className="text-xs text-[#959595]">{">"}</p>
//           <p className="text-xs text-[#959595]">Stasiun UI</p>
//         </div>
//       </div>
//       <div className="my-auto">
//         <p className="bg-red-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
//           Rute Lurus
//         </p>
//       </div>
//     </div>

//     <div className="flex flex-row space-x-2 my-auto border-[1px] py-2 px-3 rounded-xl h-16">
//       <div className="my-auto flex flex-col space-y-1">
//         <Image src={position} alt="" className="mx-auto" />
//         <p className="text-[8px]">0.1 km</p>
//       </div>
//       <div className="flex-col flex-grow">
//         <p className="text-md">Asrama</p>
//         <div className="flex space-x-2">
//           {" "}
//           <p className="text-xs text-[#959595]">Halte Berikutnya</p>
//           <p className="text-xs text-[#959595]">{">"}</p>
//           <p className="text-xs text-[#959595]">Stasiun UI</p>
//         </div>
//       </div>
//       <div className="my-auto">
//         <p className="bg-red-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
//           Rute Lurus
//         </p>
//       </div>
//     </div>

//     <div className="flex flex-row space-x-2 my-auto border-[1px] py-2 px-3 rounded-xl h-16">
//       <div className="my-auto flex flex-col space-y-1">
//         <Image src={position} alt="" className="mx-auto" />
//         <p className="text-[8px]">0.1 km</p>
//       </div>
//       <div className="flex-col flex-grow">
//         <p className="text-md">Asrama</p>
//         <div className="flex space-x-2">
//           {" "}
//           <p className="text-xs text-[#959595]">Halte Berikutnya</p>
//           <p className="text-xs text-[#959595]">{">"}</p>
//           <p className="text-xs text-[#959595]">Stasiun UI</p>
//         </div>
//       </div>
//       <div className="my-auto">
//         <p className="bg-blue-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
//           Rute Kanan
//         </p>
//       </div>
//     </div>

//     <div className="flex flex-row space-x-2 my-auto border-[1px] py-2 px-3 rounded-xl h-16">
//       <div className="my-auto flex flex-col space-y-1">
//         <Image src={position} alt="" className="mx-auto" />
//         <p className="text-[8px]">0.1 km</p>
//       </div>
//       <div className="flex-col flex-grow">
//         <p className="text-md">Asrama</p>
//         <div className="flex space-x-2">
//           {" "}
//           <p className="text-xs text-[#959595]">Halte Berikutnya</p>
//           <p className="text-xs text-[#959595]">{">"}</p>
//           <p className="text-xs text-[#959595]">Stasiun UI</p>
//         </div>
//       </div>
//       <div className="my-auto">
//         <p className="bg-blue-primary my-auto px-3 py-[3px] rounded-sm text-white text-[8px] font-semibold">
//           Rute Kanan
//         </p>
//       </div>
//     </div>
//   </div>
// </div>
// </div> */}
