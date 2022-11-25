import Image from "next/image";
import Layout from "../../components/Layout";
import beritaIcon from "../../static/icon/berita.svg";
import schedule from "../../static/icon/schedule.svg";
import chevron_right from "../../static/icon/chevron_right.svg";
import Link from "next/link";
import beritaNotFoundBG from "../../static/image/beritaNotFoundBG.svg";

export default function berita() {
  const isExist = true;

  return (
    <Layout>
      {" "}
      <div id="front" className="bg-white h-screen overflow-y-scroll space-y-6 pt-6 pb-36">
        {/* filter */}
        <div className="flex justify-center space-x-3">
          <div className="border-[1px] rounded-full border-[#EAEAEA] px-6 bg-blue-primary text-white">
            <p className="text-white">All</p>
          </div>
          <div className="border-[1px] rounded-full bg-[#FBFBFB] border-[#EAEAEA] px-6">
            <p>Today</p>
          </div>
          <div className="border-[1px] rounded-full bg-[#FBFBFB] border-[#EAEAEA] px-6">
            <p>Last 7 days</p>
          </div>
        </div>

        {isExist ? (
          <>
            {/* konten */}
            <div className="flex flex-col space-y-4 px-4 bg-white">
              {/* loop */}
              <Link href="/berita/detail" className="border-[1px] rounded-xl">
                <div className="flex justify-between py-4 px-3">
                  <div className="my-auto justify-center">
                    <Image src={beritaIcon} alt="" height={20} width={20} />
                  </div>

                  <div className="w-5/6 lg:w-11/12">
                    <div className="flex flex-col space-y-[0.8] px-1 lg:px-2">
                      <p className="truncate text-base text-black-primary">
                        Bikun tidak beroperasi, 31 Oktober...
                      </p>
                      <p className="truncate text-xs text-[#959595]">
                        Terdapat tanggal merah hari Sumpah Pemuda bikun...
                      </p>
                      <div className="flex text-[8px] text-[#959595] space-x-1 pt-0.5">
                        <Image src={schedule} alt="" />
                        <p>31 Oktober 2022 pukul 07.32</p>
                      </div>
                    </div>
                  </div>

                  <div className="my-auto">
                    <Image src={chevron_right} alt="" height={20} width={20} />
                  </div>
                </div>
              </Link>

              <div className="border-[1px] rounded-xl">
                <div className="flex justify-between py-4 px-3">
                  <div className="my-auto justify-center">
                    <Image src={beritaIcon} alt="" height={20} width={20} />
                  </div>

                  <div className="w-5/6 lg:w-11/12">
                    <div className="flex flex-col space-y-[0.8] px-1 lg:px-2">
                      <p className="truncate text-base">
                        Bikun tidak beroperasi, 31 Oktober...
                      </p>
                      <p className="truncate text-xs text-[#959595]">
                        Terdapat tanggal merah hari Sumpah Pemuda bikun...
                      </p>
                      <div className="flex text-[8px] text-[#959595] space-x-1 pt-0.5">
                        <Image src={schedule} alt="" />
                        <p>31 Oktober 2022 pukul 07.32</p>
                      </div>
                    </div>
                  </div>

                  <div className="my-auto">
                    <Image src={chevron_right} alt="" height={20} width={20} />
                  </div>
                </div>
              </div>

              <div className="border-[1px] rounded-xl">
                <div className="flex justify-between py-4 px-3">
                  <div className="my-auto justify-center">
                    <Image src={beritaIcon} alt="" height={20} width={20} />
                  </div>

                  <div className="w-5/6 lg:w-11/12">
                    <div className="flex flex-col space-y-[0.8] px-1 lg:px-2">
                      <p className="truncate text-base">
                        Bikun tidak beroperasi, 31 Oktober...
                      </p>
                      <p className="truncate text-xs text-[#959595]">
                        Terdapat tanggal merah hari Sumpah Pemuda bikun...
                      </p>
                      <div className="flex text-[8px] text-[#959595] space-x-1 pt-0.5">
                        <Image src={schedule} alt="" />
                        <p>31 Oktober 2022 pukul 07.32</p>
                      </div>
                    </div>
                  </div>

                  <div className="my-auto">
                    <Image src={chevron_right} alt="" height={20} width={20} />
                  </div>
                </div>
              </div>

              <div className="border-[1px] rounded-xl">
                <div className="flex justify-between py-4 px-3">
                  <div className="my-auto justify-center">
                    <Image src={beritaIcon} alt="" height={20} width={20} />
                  </div>

                  <div className="w-5/6 lg:w-11/12">
                    <div className="flex flex-col space-y-[0.8] px-1 lg:px-2">
                      <p className="truncate text-base">
                        Bikun tidak beroperasi, 31 Oktober...
                      </p>
                      <p className="truncate text-xs text-[#959595]">
                        Terdapat tanggal merah hari Sumpah Pemuda bikun...
                      </p>
                      <div className="flex text-[8px] text-[#959595] space-x-1 pt-0.5">
                        <Image src={schedule} alt="" />
                        <p>31 Oktober 2022 pukul 07.32</p>
                      </div>
                    </div>
                  </div>

                  <div className="my-auto">
                    <Image src={chevron_right} alt="" height={20} width={20} />
                  </div>
                </div>
              </div>

              <div className="border-[1px] rounded-xl">
                <div className="flex justify-between py-4 px-3">
                  <div className="my-auto justify-center">
                    <Image src={beritaIcon} alt="" height={20} width={20} />
                  </div>

                  <div className="w-5/6 lg:w-11/12">
                    <div className="flex flex-col space-y-[0.8] px-1 lg:px-2">
                      <p className="truncate text-base">
                        Bikun tidak beroperasi, 31 Oktober...
                      </p>
                      <p className="truncate text-xs text-[#959595]">
                        Terdapat tanggal merah hari Sumpah Pemuda bikun...
                      </p>
                      <div className="flex text-[8px] text-[#959595] space-x-1 pt-0.5">
                        <Image src={schedule} alt="" />
                        <p>31 Oktober 2022 pukul 07.32</p>
                      </div>
                    </div>
                  </div>

                  <div className="my-auto">
                    <Image src={chevron_right} alt="" height={20} width={20} />
                  </div>
                </div>
              </div>

              <div className="border-[1px] rounded-xl">
                <div className="flex justify-between py-4 px-3">
                  <div className="my-auto justify-center">
                    <Image src={beritaIcon} alt="" height={20} width={20} />
                  </div>

                  <div className="w-5/6 lg:w-11/12">
                    <div className="flex flex-col space-y-[0.8] px-1 lg:px-2">
                      <p className="truncate text-base">
                        Bikun tidak beroperasi, 31 Oktober...
                      </p>
                      <p className="truncate text-xs text-[#959595]">
                        Terdapat tanggal merah hari Sumpah Pemuda bikun...
                      </p>
                      <div className="flex text-[8px] text-[#959595] space-x-1 pt-0.5">
                        <Image src={schedule} alt="" />
                        <p>31 Oktober 2022 pukul 07.32</p>
                      </div>
                    </div>
                  </div>

                  <div className="my-auto">
                    <Image src={chevron_right} alt="" height={20} width={20} />
                  </div>
                </div>
              </div>

              <div className="border-[1px] rounded-xl">
                <div className="flex justify-between py-4 px-3">
                  <div className="my-auto justify-center">
                    <Image src={beritaIcon} alt="" height={20} width={20} />
                  </div>

                  <div className="w-5/6 lg:w-11/12">
                    <div className="flex flex-col space-y-[0.8] px-1 lg:px-2">
                      <p className="truncate text-base">
                        Bikun tidak beroperasi, 31 Oktober...
                      </p>
                      <p className="truncate text-xs text-[#959595]">
                        Terdapat tanggal merah hari Sumpah Pemuda bikun...
                      </p>
                      <div className="flex text-[8px] text-[#959595] space-x-1 pt-0.5">
                        <Image src={schedule} alt="" />
                        <p>31 Oktober 2022 pukul 07.32</p>
                      </div>
                    </div>
                  </div>

                  <div className="my-auto">
                    <Image src={chevron_right} alt="" height={20} width={20} />
                  </div>
                </div>
              </div>

            </div>
          </>
        ) : (
          <>
            <div
              className="h-full bg-white pt-6 bg-no-repeat bg-[top]"
              style={{ backgroundImage: `url(${beritaNotFoundBG.src})` }}
            ></div>
          </>
        )}
      </div>
    </Layout>
  );
}
