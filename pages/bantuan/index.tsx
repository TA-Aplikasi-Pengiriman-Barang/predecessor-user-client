import Image from "next/image";
import Layout from "../../components/Layout";
import chevron_right from "../../static/icon/chevron_right.svg";
import tentang_bikunku from "../../static/icon/tentang_bikunku.svg";
import faq from "../../static/icon/faq.svg";
import kebijakan_privasi from "../../static/icon/kebijakan_privasi.svg";
import Link from "next/link";


export default function index() {
  return (
    <Layout>
      <div className="bg-white h-full flex flex-col pt-6 space-y-4 px-6">
        <Link href="/bantuan/tentang-bikunku" className="justify-between px-2 border-[#EAEAEA] border-[1px] rounded-lg flex flex-row space-x-3 h-14 items-center text-base font-[600]">
          <div className="my-auto">
            <Image src={tentang_bikunku} alt="" height={20} width={20} />
          </div>
          <p className="flex-grow">Tentang Bikunku</p>

          <div className="my-auto">
            <Image src={chevron_right} alt="" height={20} width={20} />
          </div>
        </Link>
        <Link href="/bantuan/faq" className="justify-between px-2 border-[#EAEAEA] border-[1px] rounded-lg flex flex-row space-x-3 h-14 items-center text-base font-[600]">
          <div className="my-auto">
            <Image src={faq} alt="" height={20} width={20} />
          </div>
          <p className="flex-grow"> FAQ</p>
          <div className="my-auto">
            <Image src={chevron_right} alt="" height={20} width={20} />
          </div>
        </Link>

        <Link href="/bantuan/kebijakan-privasi" className="justify-between px-2 border-[#EAEAEA] border-[1px] rounded-lg flex flex-row space-x-3 h-14 items-center text-base font-[600]">
          <div className="my-auto">
            <Image src={kebijakan_privasi} alt="" height={20} width={20} />
          </div>
          <p className="flex-grow"> Kebijakan Privasi</p>
          <div className="my-auto">
            <Image src={chevron_right} alt="" height={20} width={20} />
          </div>
        </Link>
      </div>
    </Layout>
  );
}
