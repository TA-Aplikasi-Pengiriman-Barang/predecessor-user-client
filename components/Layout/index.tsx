import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import arrow_back from "../../static/icon/arrow_back.svg";
import dynamic from "next/dynamic";
import bikunku from "../../static/icon/bikunku.svg";
import ctaBerita from "../../static/icon/ctaBerita.svg";
import navBeranda from "../../static/icon/navbar/navBeranda.svg";
import navBerita from "../../static/icon/navbar/navBerita.svg";
import navRute from "../../static/icon/navbar/navRute.svg";
import navJadwal from "../../static/icon/navbar/navJadwal.svg";
import navBantuan from "../../static/icon/navbar/navBantuan.svg";
import navBerandaActive from "../../static/icon/navbar/navBerandaActive.svg";
import navBeritaActive from "../../static/icon/navbar/navBeritaActive.svg";
import navRuteActive from "../../static/icon/navbar/navRuteActive.svg";
import navJadwalActive from "../../static/icon/navbar/navJadwalActive.svg";
import navBantuanActive from "../../static/icon/navbar/navBantuanActive.svg";

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

  const MyAwesomeMap = dynamic(() => import("../Map"), { ssr: false });

  return (
    <div className="drawer h-screen">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />

      <div className="relative drawer-content flex flex-col h-screen">
        {/* <!-- Navbar --> */}
        <div className="w-full h-[8%] navbar bg-blue-primary text-white sticky top-0">
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
                <h1 className="font-semibold"> Berita Bikun</h1>
              </div>
            </>
          ) : asPath === "/rute-bikun" ? (
            <>
              {" "}
              <div className="flex absolute inset-x-24 justify-center pt-0.5 nav-bikunku">
                <h1 className="font-semibold"> Rute Bikun</h1>
              </div>
            </>
          ) : asPath === "/jadwal-bikun" ? (
            <>
              {" "}
              <div className="flex absolute inset-x-24 justify-center pt-0.5 nav-bikunku">
                <h1 className="font-semibold"> Jadwal Bikun</h1>
              </div>
            </>
          ) : asPath === "/bantuan" ? (
            <>
              <div className="flex absolute inset-x-24 justify-center pt-0.5 nav-bikunku">
                <h1 className="font-semibold"> Bantuan</h1>
              </div>
            </>
          ) : asPath === "/bantuan/faq" ? (
            <>
              <div className="flex absolute inset-x-24 justify-center pt-0.5 nav-bikunku">
                <h1 className="font-semibold"> FAQ</h1>
              </div>
            </>
          ) : asPath === "/bantuan/kebijakan-privasi" ? (
            <>
              <div className="flex absolute inset-x-24 justify-center pt-0.5 nav-bikunku">
                <h1 className="font-semibold"> Kebijakan Privasi</h1>
              </div>
            </>
          ) : asPath === "/bantuan/tentang-bikunku" ? (
            <>
              <div className="flex absolute inset-x-24 justify-center pt-0.5 nav-bikunku">
                <h1 className="font-semibold"> Tentang BikunKu</h1>
              </div>
            </>
          ) : (
            <div>
              <div className="flex absolute inset-x-24 justify-center pt-0.5 nav-bikunku">
                <Image src={bikunku} alt="" />
              </div>
              <Link
                href="/berita"
                className="flex absolute inset-y-0 right-6 justify-center pt-0.5 nav-bikunku"
              >
                <Image src={ctaBerita} alt="" />
              </Link>
            </div>
          )}

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

        {/* Konten Navbar */}
        <div id="frontt" className="h-[92%] overflow-y-hidden top-[8%]">
          <MyAwesomeMap>{children}</MyAwesomeMap>
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-6 w-64 bg-base-100 space-y-4">
          {/* <!-- Sidebar content here --> */}
          <Link href="/">
            <div
              className={
                pathname === "/"
                  ? "flex justify-between space-x-2.5 h-[44px] bg-[#EFF6FF] p-2 rounded-md"
                  : "flex justify-between space-x-2.5 h-[44px] p-2"
              }
            >
              <Image
                src={pathname == "/" ? navBerandaActive : navBeranda}
                alt=""
              />
              <p
                className={
                  pathname == "/"
                    ? "my-auto flex-grow font-semibold text-blue-primary text-lg"
                    : "my-auto flex-grow text-lg"
                }
              >
                Beranda
              </p>
            </div>
          </Link>
          <Link href="/berita">
            <div
              className={
                asPath.includes("/berita")
                  ? "flex justify-between space-x-2.5 h-[44px] bg-[#EFF6FF] p-2 rounded-md"
                  : "flex justify-between space-x-2.5 h-[44px] p-2"
              }
            >
              <Image
                src={asPath.includes("/berita") ? navBeritaActive : navBerita}
                alt=""
              />
              <p
                className={
                  asPath.includes("/berita")
                    ? "my-auto flex-grow font-semibold text-blue-primary text-lg"
                    : "my-auto flex-grow text-lg"
                }
              >
                Berita Bikun
              </p>
              <div className="my-auto text-xs bg-red-primary rounded-full h-6 w-6 text-center">
                <p className="font-light py-1 text-white">2</p>
              </div>
            </div>
          </Link>
          <Link href="/rute-bikun">
            {" "}
            <div
              className={
                asPath.includes("/rute-bikun")
                  ? "flex justify-between space-x-2.5 h-[44px] bg-[#EFF6FF] p-2 rounded-md"
                  : "flex justify-between space-x-2.5 h-[44px] p-2"
              }
            >
              <Image
                src={asPath.includes("/rute-bikun") ? navRuteActive : navRute}
                alt=""
              />
              <p
                className={
                  asPath.includes("/rute-bikun")
                    ? "my-auto flex-grow font-semibold text-blue-primary text-lg"
                    : "my-auto flex-grow text-lg"
                }
              >
                Rute Bikun
              </p>
            </div>
          </Link>
          <Link href="/jadwal-bikun">
            {" "}
            <div
              className={
                asPath.includes("/jadwal-bikun")
                  ? "flex justify-between space-x-2.5 h-[44px] bg-[#EFF6FF] p-2 rounded-md"
                  : "flex justify-between space-x-2.5 h-[44px] p-2"
              }
            >
              <Image
                src={
                  asPath.includes("/jadwal-bikun") ? navJadwalActive : navJadwal
                }
                alt=""
              />
              <p
                className={
                  asPath.includes("/jadwal-bikun")
                    ? "my-auto flex-grow font-semibold text-blue-primary text-lg"
                    : "my-auto flex-grow text-lg"
                }
              >
                Jadwal Bikun
              </p>
            </div>
          </Link>
          <Link href="/bantuan">
            {" "}
            <div
              className={
                asPath.includes("/bantuan")
                  ? "flex justify-between space-x-2.5 h-[44px] bg-[#EFF6FF] p-2 rounded-md"
                  : "flex justify-between space-x-2.5 h-[44px] p-2"
              }
            >
              <Image
                src={
                  asPath.includes("/bantuan") ? navBantuanActive : navBantuan
                }
                alt=""
              />
              <p
                className={
                  asPath.includes("/bantuan")
                    ? "my-auto flex-grow font-semibold text-blue-primary text-lg"
                    : "my-auto flex-grow text-lg"
                }
              >
                Bantuan
              </p>
            </div>
          </Link>
        </ul>
      </div>
    </div>
  );
}
