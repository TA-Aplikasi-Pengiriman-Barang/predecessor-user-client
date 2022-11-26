import Link from "next/link";
import { useEffect, useState } from "react";
// import bgLanding from "../../static/image/bgLanding.svg";
// import onB from "../../static/image/onB.svg";
// import onB3 from "../../static/image/onB3.svg";
// import onBoardingBawah2 from "../../static/image/onBoarding/onBoardingBawah2.svg";
import onBoarding1 from "../../static/image/onBoarding/onBoarding1.svg";
import onBoarding2 from "../../static/image/onBoarding/onBoarding2.svg";
import onBoarding3 from "../../static/image/onBoarding/onBoarding3.svg";
import onBoarding4 from "../../static/image/onBoarding/onBoarding4.svg";
import onBoarding5 from "../../static/image/onBoarding/onBoarding5.svg";
import bikunku from "../../static/icon/bikunku.svg";
import Image from "next/image";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

export default function index() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const addActive = (props: number) => {
    setActiveTabIndex(props);
  };
  const router = useRouter();
  const [i, setI] = useState(1);

  const handleOnBoarding = () => {
    setI(i + 1);
    setActiveTabIndex(i);

    if (i === 5) {
      router.push({
        pathname: "/",
      });
    }
  };

  const array = [0, 1, 2, 3, 4];

  useEffect(() => {
    setCookie("isOnboarding", true);
  }, []);

  return (
    <div className="flex justify-center">
      <div className="h-screen w-[450px] overflow-y-hidden md:hidden">
        {activeTabIndex === 0 ? (
          <div className="flex h-5/6 bg-no-repeat bg-[center_top_-2rem]" style={{ backgroundImage: `url(${onBoarding1.src})` }}>
            <div className="flex flex-col w-full mx-8">
              <div className="flex absolute inset-x-24 justify-center pt-0.5 nav-bikunku">
                <Image src={bikunku} alt="" />
              </div>
              <div className="h-3/4 flex justify-center"></div>
              <div className="h-1/4 text-center space-y-2 pt-6">
                <p className="text-xl font-bold">Selamat Datang di Bikunku</p>
                <p className="text-base text-gray-primary px-6">
                  Aplikasi penunjang kebutuhan <br />
                  informasi bus kampus <br />
                  Universitas Indonesia
                </p>
              </div>
            </div>
          </div>
        ) : activeTabIndex === 1 ? (
<div className="flex h-5/6 bg-no-repeat bg-[center_top_-2rem]" style={{ backgroundImage: `url(${onBoarding2.src})` }}>
            <div className="flex flex-col w-full">
              <div className="flex absolute inset-x-24 justify-center pt-0.5 nav-bikunku">
                <Image src={bikunku} alt="" />
              </div>
              <div className="h-3/4 flex justify-center"></div>
              <div className="h-1/4 text-center space-y-2 pt-6">
                <p className="text-xl font-bold">Lacak bikun terdekat</p>
                <p className="text-base text-gray-primary px-6">
                  Pilih halte, ketahui informasi <br />
                  estimasi waktu kedatangan dan <br />
                  lokasi bikun terdekat
                </p>
              </div>
            </div>
          </div>
        ) : activeTabIndex === 2 ? (
          <div className="flex h-5/6 bg-no-repeat bg-[center_top_-2rem]" style={{ backgroundImage: `url(${onBoarding3.src})` }}>
            <div className="flex flex-col w-full mx-8">
              <div className="flex absolute inset-x-24 justify-center pt-0.5 nav-bikunku">
                <Image src={bikunku} alt="" />
              </div>
              <div className="h-3/4 flex justify-center"></div>
              <div className="h-1/4 text-center space-y-2 pt-6">
                <p className="text-xl font-bold">
                  Ketahui informasi umum bikun
                </p>
                <p className="text-base text-gray-primary px-6">
                  Rute? Jadwal? Berita terbaru bikun? <br />
                  Semua informasi bikun
                  <br />
                  tersedia disini
                </p>
              </div>
            </div>
          </div>
        ) : activeTabIndex === 3 ? (
          <div className="flex h-5/6 bg-no-repeat bg-[center_top_-2rem]" style={{ backgroundImage: `url(${onBoarding4.src})` }}>
            <div className="flex flex-col w-full mx-8">
              <div className="flex absolute inset-x-24 justify-center pt-0.5 nav-bikunku">
                <Image src={bikunku} alt="" />
              </div>
              <div className="h-3/4 flex justify-center"></div>
              <div className="h-1/4 text-center space-y-2 pt-6">
                <p className="text-xl font-bold">
                  Buka navigasi untuk jelajah fitur
                </p>
                <p className="text-base text-gray-primary px-6">
                  Anda dapat klik ikon menu navigasi <br />
                  di kiri atas untuk menjelajahi fitur
                  <br />
                  yang tersedia
                </p>
              </div>
            </div>
          </div>
        ) : activeTabIndex === 4 ? (
          <div className="flex h-5/6 bg-no-repeat bg-[center_top_-2rem]" style={{ backgroundImage: `url(${onBoarding5.src})` }}>
            <div className="flex flex-col w-full mx-8">
              <div className="flex absolute inset-x-24 justify-center pt-0.5 nav-bikunku">
                <Image src={bikunku} alt="" />
              </div>
              <div className="h-3/4 flex justify-center"></div>
              <div className="h-1/4 text-center space-y-2 pt-6">
                <p className="text-xl font-bold">Mari mulai!</p>
                <p className="text-base text-gray-primary px-6">
                  Mulai lacak bikun terdekat atau <br />
                  ketahui lebih lanjut terkait bikun
                </p>
              </div>
            </div>
          </div>
        ) : (
          <></>
        )}

        {activeTabIndex === 4 ? (
          <>
            <div className="flex w-full justify-center h-full mt-[-1.5rem]">
              <div className="space-y-6 text-center">
                <Link href="/" className="px-6 h-12 rounded-full flex items-center justify-center bg-blue-primary text-white">
                  Mulai sekarang
                </Link>
                <Link href="/bantuan/faq" className="px-6 h-12 rounded-full flex items-center justify-center border-2 border-black-primary">
                  Pertama kali menggunakan bikun?
                </Link>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="flex flex-row w-full absolute bottom-0 justify-between h-16 px-4">
              <Link href="/" className="my-auto text-sm">
                Lewati
              </Link>
              <div className="flex flex-row w-1/2justify-center space-x-2">
                {array.map((val, index) => (
                  <>
                    <a className="my-auto">
                      <div
                        onClick={() => addActive(index)}
                        className={
                          index === activeTabIndex
                            ? "h-3 w-3 rounded-full bg-blue-primary"
                            : "h-3 w-3 rounded-full bg-[#c4c4c4]"
                        }
                      ></div>
                    </a>
                  </>
                ))}
              </div>
              <div
                className="my-auto text-sm text-blue-primary"
                onClick={() => {
                  handleOnBoarding();
                }}
              >
                Lanjut {">"}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
