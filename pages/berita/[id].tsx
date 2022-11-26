import Image from "next/image";
import Layout from "../../components/Layout";
import schedule from "../../public/assets/icon/schedule.svg";
import beritaBG from "../../public/assets/image/beritaBG.svg";

interface NewsData {
  id: number;
  detail: string;
  title: string;
  createdAt: string;
}

interface Data {
  data: NewsData;
}

export default function detail({ data }: Data) {
  console.log(data);
  return (
    <Layout>
      <div
        id="front"
        className="h-full bg-white space-y-6 pt-6 px-6 bg-no-repeat bg-[right_top_-3rem]"
        style={{ backgroundImage: `url(${beritaBG.src})` }}
      >
        <div className="space-y-1.5">
          <p className="text-base font-semibold">{data.title}</p>
          <div className="flex space-x-1">
            <Image
              src={schedule}
              alt=""
              className="my-auto"
              height={14}
              width={14}
            />
            <p className="text-sm text-[#868686]">
              {new Date(data.createdAt).toDateString()}
            </p>
          </div>
          <div className="w-3/4 h-[1.5px] bg-[#D9D9D9]"></div>
        </div>
        <div className="space-y-4 text-justify text-black-primary">
          <p className="text-xs">{data.detail}</p>
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }: any) {
  const res = await fetch(`https://api.bikunku.com/news/${params.id}`, {
    method: "GET",
  });
  const data = await res.json();

  return { props: { data: data.data } };
}
