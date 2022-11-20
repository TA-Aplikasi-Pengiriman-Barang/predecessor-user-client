import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import Sidebar from "../components/Sidebar";
import Layout from "../components/Layout";
import Draggable from "react-draggable";
import { useState } from "react";
import location from "../static/icon/location.svg";
import calendar from "../static/icon/calendar.svg";

export default function Home() {


  return (
    <>
      <Layout>
        <div className="" id="front">
        <div className="bg-blue-primary h-16 rounded-[0_0_1rem_1rem] flex justify-center">
          <div className="h-28 w-5/6 rounded-lg bg-white flex flex-col justify-center mt-2 px-4 space-y-3 drop-shadow-xl">
            <div className="flex space-x-2 rounded-full border-[1px] border-[#EAEAEA] bg-[#FAFAFA] px-4 py-2 text-sm">
              <Image src={location} alt="" />
              <input
                type="text"
                className="w-full  bg-[#FAFAFA] focus:outline-none"
                placeholder="Cari halte"
              />
            </div>
            {/* <div className="flex space-x-1 rounded-full border-[1px] border-[#EAEAEA] bg-[#FAFAFA] mx-20 px-2 py-1 text-xs">
              <Image src={calendar} alt="" />
              <input
                type="date"
                className="w-full  bg-[#FAFAFA] focus:outline-none"
                placeholder="Filter By Time"
              />
            </div> */}
          </div>
        </div>

        </div>
      </Layout>
    </>
  );
}
