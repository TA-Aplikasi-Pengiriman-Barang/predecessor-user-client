import Image from "next/image";
import Layout from "../components/Layout";
import Draggable from "react-draggable";
import { useState } from "react";
import ruteAll from "../static/image/ruteAll.svg";
import ruteBiru from "../static/image/ruteBiru.svg";
import ruteMerah from "../static/image/ruteMerah.svg";
import error from "../static/icon/error.svg";

export default function rutebikun() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const addActive = (props: number) => {
    setActiveTabIndex(props);
  };
  const array = ["Semua", "Rute Lurus", "Rute Kanan"];

  return (
    <>
      <Layout>
        <div className="absolute bottom-[40%] w-full">
          <div id="fronttt" className="h-screen">
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

                <div className="p-4">
                  <div className="flex flex-row w-full">
                    {array.map((val, index) => (
                      <>
                        <a
                          className={
                            index === activeTabIndex
                              ? "not-draggable w-1/3 text-center text-blue-primary h-8 border-b-4 border-blue-primary"
                              : "not-draggable w-1/3 text-center text-[#d9d9d9] h-8 border-b-4 border-[#d9d9d9]"
                          }
                        >
                          <div onClick={() => addActive(index)}>{val}</div>
                        </a>
                      </>
                    ))}
                  </div>
                  <div className="overflow-y-scroll h-[440px] not-draggable p-6">
                    {activeTabIndex === 0 ? (
                      <div className="flex flex-col justify-center">
                        <Image src={ruteAll} alt="" />
                        <div className="flex flex-row space-x-1 py-4">
                          <div className="w-1/6">
                            <Image src={error} alt="" />
                          </div>
                          <p className="text-xs font-semibold">
                            Terdapat perubahan pada hari kerja pukul 06.00-09.00
                            WIB . Bikun rute lurus (merah) tidak akan melewati
                            FEB sampai dengan Stasiun UI. Pada bikun rute kanan
                            (biru), tidak melewati Stasiun UI sampai Menwa.
                          </p>
                        </div>
                      </div>
                    ) : activeTabIndex === 1 ? (
                      <div className="flex flex-col justify-center">
                        <Image src={ruteMerah} alt="" />
                        <div className="flex flex-row space-x-1 py-4">
                          <div className="w-1/6">
                            <Image src={error} alt="" />
                          </div>
                          <p className="text-xs font-semibold">
                            Terdapat perubahan rute pada hari kerja pukul
                            06.00-09.00 WIB. Bikun rute lurus (merah) tidak akan
                            melewati FEB sampai dengan Stasiun UI.{" "}
                          </p>
                        </div>
                      </div>
                    ) : activeTabIndex === 2 ? (
                      <div className="flex flex-col justify-center">
                        <Image src={ruteBiru} alt="" />
                        <div className="flex flex-row space-x-1 py-4">
                          <div className="w-12">
                            <Image src={error} alt="" />
                          </div>
                          <p className="text-xs font-semibold">
                            Terdapat perubahan rute pada hari kerja pukul
                            06.00-09.00 WIB . Bikun rute kanan (biru), tidak
                            melewati Stasiun UI sampai Menwa.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )}
                  </div>
                </div>
              </div>
            </Draggable>
          </div>
        </div>
      </Layout>
    </>
  );
}
