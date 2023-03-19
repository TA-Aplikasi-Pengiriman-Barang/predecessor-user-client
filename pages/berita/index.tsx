import Layout from "../../components/Layout";
import beritaNotFoundBG from "../../public/assets/image/beritaNotFoundBG.svg";
import News, { NotFoundNews } from "../../components/News";
import { useState } from "react";

import { httpBaseUrl } from "../../components/constant/api";

interface NewsData {
  id: number;
  detail: string;
  title: string;
  createdAt: string;
}

interface Data {
  data: NewsData[];
}

enum FilterType {
  ALL,
  TODAY,
  LAST_7_DAY,
}

export default function berita(data: Data) {
  const [filter, setFilter] = useState<FilterType>(FilterType.ALL);

  const AllMapper = (dt: NewsData[]) => {
    if (dt.length == 0) {
      return <NotFoundNews />;
    }
    return dt.map((d: NewsData) => (
      <News
        key={d.id}
        title={d.title}
        detail={d.detail}
        createdAt={d.createdAt}
        id={d.id}
      />
    ));
  };

  const TodayMapper = (dt: NewsData[]) => {
    dt = dt.filter(
      (d: NewsData) =>
        new Date(d.createdAt).toDateString() == new Date().toDateString()
    );
    if (dt.length == 0) {
      return <NotFoundNews />;
    }
    return dt.map((d: NewsData) => (
      <News
        key={d.id}
        title={d.title}
        detail={d.detail}
        createdAt={d.createdAt}
        id={d.id}
      />
    ));
  };

  const Last7DayMapper = (dt: NewsData[]) => {
    dt = dt.filter((d: NewsData) => {
      const then = new Date(d.createdAt);
      const now = new Date();
      const msBetweenDates = Math.abs(then.getTime() - now.getTime());
      const daysBetweenDates = msBetweenDates / (24 * 60 * 60 * 1000);
      return daysBetweenDates < 7;
    });

    if (dt.length == 0) {
      return <NotFoundNews />;
    }

    return dt.map((d: NewsData) => (
      <News
        key={d.id}
        title={d.title}
        detail={d.detail}
        createdAt={d.createdAt}
        id={d.id}
      />
    ));
  };

  return (
    <Layout>
      <div
        id="front"
        className="bg-white h-screen overflow-y-scroll no-scrollbar space-y-6 pt-6 pb-36"
      >
        {/* filter */}
        <div className="flex justify-center space-x-3">
          <div
            className={`border-[1px] rounded-full border-[#EAEAEA] px-6  text-white ${
              filter == FilterType.ALL ? "bg-blue-primary" : "bg-[#FBFBFB]"
            }`}
            onClick={() => setFilter(FilterType.ALL)}
          >
            <p
              className={`${
                filter == FilterType.ALL
                  ? "text-white text-xs"
                  : "text-black text-xs"
              }`}
            >
              Semua
            </p>
          </div>
          <div
            className={`border-[1px] rounded-full  border-[#EAEAEA] px-6 ${
              filter == FilterType.TODAY ? "bg-blue-primary" : "bg-[#FBFBFB]"
            }`}
            onClick={() => setFilter(FilterType.TODAY)}
          >
            <p
              className={`${
                filter == FilterType.TODAY
                  ? "text-white text-xs"
                  : "text-black text-xs"
              }`}
            >
              Hari ini
            </p>
          </div>
          <div
            className={`border-[1px] rounded-full  border-[#EAEAEA] px-6 ${
              filter == FilterType.LAST_7_DAY
                ? "bg-blue-primary"
                : "bg-[#FBFBFB]"
            }`}
            onClick={() => setFilter(FilterType.LAST_7_DAY)}
          >
            <p
              className={`${
                filter == FilterType.LAST_7_DAY
                  ? "text-white text-xs"
                  : "text-black text-xs"
              }`}
            >
              7 Hari Terakhir
            </p>
          </div>
        </div>

        {/* konten */}
        <div className="flex flex-col space-y-4 px-4 bg-white h-full">
          {/* loop */}
          {filter == FilterType.ALL
            ? AllMapper(data.data)
            : filter == FilterType.TODAY
            ? TodayMapper(data.data)
            : Last7DayMapper(data.data)}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await fetch(`${httpBaseUrl}/news/`, { method: "GET" });
  const data = await res.json();

  return { props: { data: data.data.news } };
}
