import Layout from "../../components/Layout";
import Image from "next/image";
import ruteAll from "../../public/assets/image/ruteAll.svg";

export default function faq() {
  return (
    <Layout>
      <div
        id="front"
        className="bg-white h-full overflow-y-scroll no-scrollbar"
      >
        <div
          tabIndex={0}
          className="collapse collapse-arrow text-black-primary"
        >
          <div className="collapse-title text-base font-semibold">
            <p>Apa itu bikun?</p>
          </div>
          <div className="collapse-content">
            <p className="text-[#868686] text-[14px]">
              Bikun atau Bus Kuning merupakan moda transportasi yang tersedia
              untuk melayani kebutuhan transportasi di lingkungan universitas
              indonesia. Terdapat 2 rute, yaitu rute lurus (merah) dan rute
              Kanan (biru)
            </p>
          </div>
          <hr />
        </div>

        <div
          tabIndex={0}
          className="collapse collapse-arrow text-black-primary"
        >
          <div className="collapse-title text-base font-semibold">
            <p>Apa perbedaan rute lurus dan kanan?</p>
          </div>
          <div className="collapse-content">
            <p className="text-[#868686] text-[14px]">
              Bikun memiliki 2 layanan rute yang berbeda. yaitu rute lurus
              (merah) dan rute kanan (biru). Perbedaan dapat dilihat pada
              visualisasi dibawah.
            </p>
            <div className="flex justify-center">
              <Image src={ruteAll} alt="" />
            </div>
          </div>
          <hr />
        </div>

        <div
          tabIndex={0}
          className="collapse collapse-arrow text-black-primary"
        >
          <div className="collapse-title text-base font-semibold">
            <p>Apakah rute bikun bersifat tetap?</p>
          </div>
          <div className="collapse-content">
            <p className="text-[#868686] text-[14px]">
              Terdapat perubahan pada hari kerja pukul 06.00-09.00 WIB . Bikun
              rute lurus (merah) tidak akan melewati FEB sampai dengan Stasiun
              UI. Pada bikun rute kanan (biru), tidak melewati Stasiun UI sampai
              Menwa.
            </p>
          </div>
          <hr />
        </div>

        <div
          tabIndex={0}
          className="collapse collapse-arrow text-black-primary"
        >
          <div className="collapse-title text-base font-semibold">
            <p>Apakah bikun gratis?</p>
          </div>
          <div className="collapse-content">
            <p className="text-[#868686] text-[14px]">
              Iya, Tidak ada biaya yang dibebankan ke penumpang sepeser pun
              alias gratis.
            </p>
          </div>
          <hr />
        </div>

        <div
          tabIndex={0}
          className="collapse collapse-arrow text-black-primary"
        >
          <div className="collapse-title text-base font-semibold">
            <p>Apakah masyarakat umum dapat menggunakan bikun?</p>
          </div>
          <div className="collapse-content">
            <p className="text-[#868686] text-[14px]">
              Iya, sivitas akademika UI maupun masyarakat umum dapat menggunakan
              layanan bikun.
            </p>
          </div>
          <hr />
        </div>

        <div
          tabIndex={0}
          className="collapse collapse-arrow text-black-primary"
        >
          <div className="collapse-title text-base font-semibold">
            <p>Apakah masyarakat umum dapat menggunakan bikun?</p>
          </div>
          <div className="collapse-content">
            <p className="text-[#868686] text-[14px]">
              Iya, sivitas akademika UI maupun masyarakat umum dapat menggunakan
              layanan bikun.
            </p>
          </div>
          <hr />
        </div>

        <div
          tabIndex={0}
          className="collapse collapse-arrow text-black-primary"
        >
          <div className="collapse-title text-base font-semibold">
            <p>Bagaimana jam operasional Bikun?</p>
          </div>
          <div className="collapse-content">
            <p className="text-[#868686] text-[14px]">
              Bikun akan beroperasi di hari Senin - Jumat dari pukul 6.54 hingga
              pukul 20.10 melalui Asrama dan pada hari Sabtu, Bikun beroperasi
              mulai dari Asrama pukul 6.54 hingga pukul 14.30.
            </p>
          </div>
          <hr />
        </div>

        <div
          tabIndex={0}
          className="collapse collapse-arrow text-black-primary"
        >
          <div className="collapse-title text-base font-semibold">
            <p>
              Darimana saja saya dapat menerima informasi terkait bikun selain
              bikunku?
            </p>
          </div>
          <div className="collapse-content">
            <p className="text-[#868686] text-[14px]">
              Kalian dapat menerima informasi dari akun instagram
              @bemui_official atau @univ_indonesia.
            </p>
          </div>
          <hr />
        </div>
      </div>
    </Layout>
  );
}
