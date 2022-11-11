import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";
import Draggable from "react-draggable";
import { useState } from "react";
import ruteAll from "../static/image/ruteAll.svg";
import ruteBiru from "../static/image/ruteBiru.svg";
import ruteMerah from "../static/image/ruteMerah.svg";

export default function rutebikun() {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const addActive = (props: number) => {
    setActiveTabIndex(props);
    console.log(activeTabIndex);
  };

  const handleDrag = () => {
    console.log("activeTabIndex");
  };

  const array = ["All", "Rute Lurus", "Rute Belok"];

  return (
    <>
      <Layout>
        <div className="relative h-full overflow-y-hidden">
          SI PALING BIKUN
          <Draggable
            axis="y"
            bounds={{ left: 0, top: -400, right: 0, bottom: 0 }}
            defaultPosition={{ x: 0, y: 0 }}
            cancel=".not-draggable"
          >
            <div className="bg-white rounded-[3rem_3rem_0_0] absolute w-full h-full bottom-[-85%] z-10 space-y-4">
              <div className="h-2 bg-[#d9d9d9] mx-24 my-2 rounded-full flex justify-center"></div>
              <div className="p-4">
                <div className="flex flex-row w-full">
                  {array.map((val, index) => (
                    <>
                      <a
                        className={
                          index === activeTabIndex
                            ? "not-draggable w-1/3 text-center text-blue-primary h-8 border-b-4 border-blue-primary"
                            : "not-draggable w-1/3 text-center text-[#D9D9D9] h-8 border-b-4"
                        }
                      >
                        <div onClick={() => addActive(index)}>{val}</div>
                      </a>
                    </>
                  ))}
                </div>
                <div className="overflow-y-scroll no-scrollbar h-[440px] not-draggable p-6">
                  {activeTabIndex === 0 ? (
                    <div className="flex justify-center">
                      <Image src={ruteAll} alt="" />
                      {/* <p>asdasdas asljdasdjn jalsdnalsj</p>
                      <p>asdasdas asljdasdjn jalsdnalsj</p>
                      <p>asdasdas asljdasdjn jalsdnalsj</p>
                      <p>asdasdas asljdasdjn jalsdnalsj</p>
                      <p>asdasdas asljdasdjn jalsdnalsj</p>
                      <p>asdasdas asljdasdjn jalsdnalsj</p> */}
                    </div>
                  ) : activeTabIndex === 1 ? (
                    <div className="flex justify-center">
                      <Image src={ruteMerah} alt="" />
                    </div>
                  ) : activeTabIndex === 2 ? (
                    <div className="flex justify-center">
                      <Image src={ruteBiru} alt="" />
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </Draggable>
        </div>
      </Layout>
    </>
  );
}
