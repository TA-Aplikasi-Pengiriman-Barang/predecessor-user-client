import Layout from "../../components/Layout";
import beritaNotFoundBG from "../../public/assets/image/beritaNotFoundBG.svg";
import News from "../../components/News";
import { useState } from "react";

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
  const isExist = data.data.length > 0;

  const [filter, setFilter] = useState<FilterType>(FilterType.ALL);

  const AllMapper = (dt: NewsData[]) => {
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
        className="bg-white h-screen overflow-y-scroll space-y-6 pt-6 pb-36"
      >
        {/* filter */}
        <div className="flex justify-center space-x-3">
          <div
            className="border-[1px] rounded-full border-[#EAEAEA] px-6 bg-blue-primary text-white"
            onClick={() => setFilter(FilterType.ALL)}
          >
            <p className="text-white">All</p>
          </div>
          <div
            className="border-[1px] rounded-full bg-[#FBFBFB] border-[#EAEAEA] px-6"
            onClick={() => setFilter(FilterType.TODAY)}
          >
            <p>Today</p>
          </div>
          <div
            className="border-[1px] rounded-full bg-[#FBFBFB] border-[#EAEAEA] px-6"
            onClick={() => setFilter(FilterType.LAST_7_DAY)}
          >
            <p>Last 7 days</p>
          </div>
        </div>

        {isExist ? (
          <>
            {/* konten */}
            <div className="flex flex-col space-y-4 px-4 bg-white">
              {/* loop */}
              {filter == FilterType.ALL
                ? AllMapper(data.data)
                : filter == FilterType.TODAY
                ? TodayMapper(data.data)
                : Last7DayMapper(data.data)}
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

export async function getServerSideProps() {
  const res = await fetch(`https://api.bikunku.com/news/`, { method: "GET" });
  const data = await res.json();

  return { props: { data: data.data.news } };
}
