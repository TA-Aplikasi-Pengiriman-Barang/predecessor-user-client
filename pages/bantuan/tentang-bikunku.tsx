import Layout from "../../components/Layout";
import beritaBG from "../../static/image/beritaBG.svg";

export default function tentangbikunku() {
  return (
    <Layout>
      <div
      id="front"
        className="h-full bg-white space-y-6 pt-6 px-6 bg-no-repeat bg-[right_top_-3rem]"
        style={{ backgroundImage: `url(${beritaBG.src})` }}
      >
        <div className="space-y-1.5">
          <p className="text-base font-semibold">Tentang Bikunku</p>
          <div className="w-3/4 h-[1.5px] bg-[#D9D9D9]"></div>
        </div>
        <div className="space-y-4 text-justify text-black-primary">
          <p className="text-xs">
            Bikunku merupakan aplikasi berbasis situs web yang menunjang
            kebutuhan informasi terkait Bus Kuning (Bikun) Universitas
            Indonesia.
          </p>
          <p className="text-xs">
            Pengguna dapat mengetahui informasi estimasi waktu kedatangan,
            lokasi bus pada suatu halte. Selain itu, pengguna juga dapat
            mengetahui detail rute, jadwal, serta berita terbaru terkait bikun.{" "}
          </p>
        </div>
      </div>
    </Layout>
  );
}
