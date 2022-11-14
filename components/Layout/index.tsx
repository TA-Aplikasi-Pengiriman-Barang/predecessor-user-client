import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import arrow_back from "../../static/icon/arrow_back.svg";
import location from "../../static/icon/location.svg";
import calendar from "../../static/icon/calendar.svg";
import Map from "../Map";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import dynamic from "next/dynamic"


if (typeof window !== "undefined") {
  // browser code
}


interface LayoutProps {
  children: ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { children } = props;

  const { asPath, pathname } = useRouter();

  const isSlash = asPath.split("/").length - 1;
  
  const position: [number, number] = [51.505, -0.09];

  const MyAwesomeMap = dynamic(() => import("../Map"), { ssr:false })



  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* <!-- Navbar --> */}
        {/* {asPath.includes("/jadwal-bikun") ? (<></>) : (<></>)} */}
        <div className="w-full navbar bg-blue-primary text-white relative">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              {isSlash > 1 ? (
                <>
                  <Link href="./">
                    <Image src={arrow_back} alt="" />
                  </Link>
                </>
              ) : (
                <>
                  {" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block w-6 h-6 stroke-current"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 6h16M4 12h16M4 18h16"
                    ></path>
                  </svg>
                </>
              )}
            </label>
          </div>
          {/* Handle Navbar title */}
          {asPath.includes("/berita") ? (
            <>
              <div className="flex absolute inset-x-24 justify-center pt-0.5 nav-bikunku">
                Berita Bikun
              </div>
            </>
          ) : asPath === "/rute-bikun" ? (
            <>
              {" "}
              <div className="flex absolute inset-x-24 justify-center pt-0.5 nav-bikunku">
                Rute Bikun
              </div>
            </>
          ) : asPath === "/jadwal-bikun" ? (
            <>
              {" "}
              <div className="flex absolute inset-x-24 justify-center pt-0.5 nav-bikunku">
                Jadwal Bikun
              </div>
            </>
          ) : asPath === "/bantuan" ? (
            <>
              <div className="flex absolute inset-x-24 justify-center pt-0.5 nav-bikunku">
                Bantuan
              </div>
            </>
          ) : asPath === "/bantuan/faq" ? (
            <>
              <div className="flex absolute inset-x-24 justify-center pt-0.5 nav-bikunku">
                FAQ
              </div>
            </>
          ) : asPath === "/bantuan/kebijakan-privasi" ? (
            <>
              <div className="flex absolute inset-x-24 justify-center pt-0.5 nav-bikunku">
                Kebijakan Privasi
              </div>
            </>
          ) : asPath === "/bantuan/tentang-bikunku" ? (
            <>
              <div className="flex absolute inset-x-24 justify-center pt-0.5 nav-bikunku">
                Tentang BikunKu
              </div>
            </>
          ) : (
            <>default</>
          )}
          {/* <div className="flex-1 px-2 mx-2">Navbar Title</div> */}

          <div className="flex-none hidden lg:block px-2">
            <ul className="menu menu-horizontal space-x-2">
              <Link href="/">Beranda</Link>
              <Link href="/berita">Berita Bikun</Link>
              <Link href="/rute-bikun">Rute Bikun</Link>
              <Link href="/jadwal-bikun">Jadwal Bikun</Link>
              <Link href="/bantuan">Bantuan</Link>
            </ul>
          </div>
        </div>

        {/* {asPath.includes("/jadwal-bikun") ? (
          <div className="bg-blue-primary h-16 rounded-[0_0_1rem_1rem] z-10 flex justify-center">
            <div className="h-28 w-5/6 rounded-lg bg-white flex flex-col justify-center mt-2 px-4 space-y-3 drop-shadow-xl">
              <div className="flex space-x-2 rounded-full border-[1px] border-[#EAEAEA] bg-[#FAFAFA] px-4 py-2 text-sm">
                <Image src={location} alt="" />
                <input type="text" className="w-full  bg-[#FAFAFA] focus:outline-none" placeholder="Cari halte" />
              </div>
              <div className="flex space-x-1 rounded-full border-[1px] border-[#EAEAEA] bg-[#FAFAFA] mx-20 px-2 py-1 text-xs">
              <Image src={calendar} alt="" />
                <input type="date" className="w-full  bg-[#FAFAFA] focus:outline-none" placeholder="Filter By Time" />
              </div>
            </div>
          </div>
        ) : (
          <></>
        )} */}
        {/* <!-- Page content here --> */}
        {/* <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        </MapContainer> */}
        
        <div className="bg-blue-200 h-full">
          <div className="z-50">{children}</div>
          <div className="h-full z-0">
          <MyAwesomeMap></MyAwesomeMap>
          </div>
          
          
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 bg-base-100">
          {/* <!-- Sidebar content here --> */}
          <Link href="/">Beranda</Link>
          <Link href="/berita">Berita Bikun</Link>
          <Link href="/rute-bikun">Rute Bikun</Link>
          <Link href="/jadwal-bikun">Jadwal Bikun</Link>
          <Link href="/bantuan">Bantuan</Link>
        </ul>
      </div>
    </div>
  );
}
