import Link from "next/link";
import { useEffect, useState } from "react";
import bgLanding from "../../static/image/bgLanding.svg";
import onB from "../../static/image/onB.svg";
import onB3 from "../../static/image/onB3.svg";
import onBoarding1 from "../../static/image/onBoarding/onBoarding1.svg";
import onBoarding2 from "../../static/image/onBoarding/onBoarding2.svg";
import onBoarding3 from "../../static/image/onBoarding/onBoarding3.svg";
import onBoarding4 from "../../static/image/onBoarding/onBoarding4.svg";
import onBoardingBawah2 from "../../static/image/onBoarding/onBoardingBawah2.svg";
import bikunku from "../../static/icon/bikunku.svg";
import Image from "next/image";
import { setCookie } from 'cookies-next';

export default function index() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const addActive = (props: number) => {
    setActiveTabIndex(props);
  };
  const array = [0, 1, 2, 3, 4];

  useEffect(() => {
    setCookie('isOnboarding', true);
  },[])

  return (
    <div className="h-screen">
      <div
        className="flex h-5/6 bg-no-repeat"
        // style={{ backgroundImage: `url(${bgLanding.src})` }}
        id="onb"
      >
        {activeTabIndex === 0 ? (
          <div className="flex flex-col w-full mx-8">
            <div className="flex absolute inset-x-24 justify-center pt-0.5 nav-bikunku">
              <Image src={bikunku} alt="" />
            </div>
            <div className="h-3/4 flex justify-center">
              <Image src={onBoarding1} alt="" />
            </div>
            <div className="h-1/4 text-center space-y-2 pt-6">
              <p className="text-xl font-bold">Selamat Datang di Bikunku</p>
              <p className="text-base text-gray-primary px-6">
                Aplikasi penunjang kebutuhan <br />
                informasi bus kampus <br />
                Universitas Indonesia
              </p>
            </div>
          </div>
        ) : activeTabIndex === 1 ? (
          <div className="flex flex-col w-full mx-8">
            <div className="flex absolute inset-x-24 justify-center pt-0.5 nav-bikunku">
              <Image src={bikunku} alt="" />
            </div>
            <div className="h-3/4 flex justify-center">
              <Image src={onBoarding2} alt="" />
            </div>
            <div className="h-1/4 text-center space-y-2 pt-6">
              <p className="text-xl font-bold">Lacak bikun terdekat</p>
              <p className="text-base text-gray-primary px-6">
                Pilih halte, ketahui informasi <br />
                estimasi waktu kedatangan dan <br />
                lokasi bikun terdekat
              </p>
            </div>
          </div>
        ) : activeTabIndex === 2 ? (
          <div className="flex flex-col w-full mx-8">
            <div className="flex absolute inset-x-24 justify-center pt-0.5 nav-bikunku">
              <Image src={bikunku} alt="" />
            </div>
            <div className="h-3/4 flex justify-center">
              <Image src={onBoarding3} alt="" />
            </div>
            <div className="h-1/4 text-center space-y-2 pt-6">
              <p className="text-xl font-bold">Ketahui informasi umum bikun</p>
              <p className="text-base text-gray-primary px-6">
                Rute? Jadwal? Berita terbaru bikun? <br />
                Semua informasi bikun
                <br />
                tersedia disini
              </p>
            </div>
          </div>
        ) : activeTabIndex === 3 ? (
          <div className="w-full h-full" >
          <div className="flex flex-col w-full">
            <div className="flex absolute inset-x-24 justify-center pt-0.5 nav-bikunku">
              <Image src={bikunku} alt="" />
            </div>
            <div className="h-3/4 pt-16 pl-6 flex justify-center flex flex-col">
              <Image src={onBoarding4} alt="" />
            </div>
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
          <div className="flex flex-col w-full mx-8">
            <div className="flex absolute inset-x-24 justify-center pt-0.5 nav-bikunku">
              <Image src={bikunku} alt="" />
            </div>
            <div className="h-3/4 pt-20">image</div>
            <div className="h-1/4 text-center space-y-2 pt-6">
              <p className="text-xl font-bold">Mari mulai!</p>
              <p className="text-base text-gray-primary px-6">
                Mulai lacak bikun terdekat atau <br />
                ketahui lebih lanjut terkait bikun
              </p>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>
      <div className="flex flex-row w-full absolute bottom-0 justify-between h-16 px-4">
      <Link href="/" className="my-auto text-sm">Lewati</Link>
        <div className="flex flex-row w-1/2justify-center space-x-2">
          {array.map((val, index) => (
            <>
              <a className="my-auto">
                <div
                  onClick={() => addActive(index)}
                  className={
                    index === activeTabIndex
                      ? "h-3 w-3 rounded-full bg-red-400"
                      : "h-3 w-3 rounded-full bg-red-200"
                  }
                ></div>
              </a>
            </>
          ))}
        </div>

        <div className="my-auto text-sm text-blue-primary">Lanjut ></div>
      </div>
    </div>
  );
}
