import Layout from "../../components/Layout";
import beritaBG from "../../assets/image/beritaBG.svg";

export default function kebijakanprivasi() {
  return (
    <Layout>
      <div
        id="front"
        className="h-full bg-white space-y-6 pt-6 px-6 bg-no-repeat bg-[right_top_-3rem]"
        style={{ backgroundImage: `url(${beritaBG.src})` }}
      >
        <div className="space-y-1.5">
          <p className="text-base font-semibold">Kebijakan Privasi</p>
          <div className="w-3/4 h-[1.5px] bg-[#D9D9D9]"></div>
        </div>
        <div className="space-y-4 text-justify text-black-primary">
          <div className="space-y-1.5">
            <p className="text-xs">Permintaan Izin Perangkat Seluler</p>
            <p className="text-[10px]">
              Aplikasi bikunku membutuhkan izin sebelum mengakses data lokasi
              pengguna. Adapun tidak diberikannya izin oleh pengguna akan
              berpengaruh dalam kegunaan atau fungsi aplikasi. Jika pengguna
              telah memberikan izin, maka perangkat lunak/aplikasi Bikunku dapat
              memproses data pengguna dalam batas wajar untuk keperluan
              penggunaan aplikasi. Aplikasi Bikunku memerlukan data lokasi
              terkini pengguna (hanya terbatas) untuk menentukan halte terdekat
              dan memunculkan posisi pengguna pada tampilan map.
            </p>
          </div>

          <div className="space-y-1.5">
            <p className="text-xs">Pemberlakuan Kebijakan Privasi</p>
            <p className="text-[10px]">
              Kebijakan Privasi ini dapat sewaktu-waktu ditinjau dan diubah
              kembali atas kebijakan dan pertimbangan dari pihak pengembang
              sendiri menyesuaikan perkembangan di masa depan dan/atau perubahan
              hukum atau peraturan yang berlaku.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
