import Image from "next/image";
import Layout from "../../components/Layout";
import schedule from "../../assets/icon/schedule.svg";
import beritaBG from "../../assets/image/beritaBG.svg";

export default function detail() {
  return (
    <Layout>
      <div
        id="front"
        className="h-full bg-white space-y-6 pt-6 px-6 bg-no-repeat bg-[right_top_-3rem]"
        style={{ backgroundImage: `url(${beritaBG.src})` }}
      >
        <div className="space-y-1.5">
          <p className="text-base font-semibold">
            Bikun tidak beroperasi Senin, 31 Oktober 2022
          </p>
          <div className="flex space-x-1">
            <Image
              src={schedule}
              alt=""
              className="my-auto"
              height={14}
              width={14}
            />
            <p className="text-sm text-[#868686]">
              31 Oktober 2022 pukul 07.32
            </p>
          </div>
          <div className="w-3/4 h-[1.5px] bg-[#D9D9D9]"></div>
        </div>
        <div className="space-y-4 text-justify text-black-primary">
          <p className="text-xs">
            Terdapat tanggal merah hari Sumpah Pemuda sehingga bikun tidak
            beroperasi. Untuk penumpang bikun dapat menggunakan jasa ojek
            pangkalan (opang) atau alternatif lainnya. Terima kasih.
          </p>
          <p className="text-xs">
            - Manajemen Bus Kuning Universitas Indonesia
          </p>
        </div>
      </div>
    </Layout>
  );
}
