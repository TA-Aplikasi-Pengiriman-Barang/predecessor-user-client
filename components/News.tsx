import Link from "next/link";
import Image from "next/image";
import beritaIcon from "../public/assets/icon/berita.svg";
import schedule from "../public/assets/icon/schedule.svg";
import chevron_right from "../public/assets/icon/chevron_right.svg";

interface NewsProps {
  title: string;
  detail: string;
  createdAt: string;
  id: number;
}

export default function News({ title, detail, createdAt, id }: NewsProps) {
  return (
    <Link href={`/berita/${id}`} className="border-[1px] rounded-xl">
      <div className="flex justify-between py-4 px-3">
        <div className="my-auto justify-center">
          <Image src={beritaIcon} alt="" height={20} width={20} />
        </div>
        <div className="w-5/6 lg:w-11/12">
          <div className="flex flex-col space-y-[0.8] px-1 lg:px-2">
            <p className="truncate text-base text-black-primary">{title}</p>
            <p className="truncate text-xs text-[#959595]">{detail}</p>
            <div className="flex text-[8px] text-[#959595] space-x-1 pt-0.5">
              <Image src={schedule} alt="" />
              <p>{new Date(createdAt).toUTCString()}</p>
            </div>
          </div>
        </div>

        <div className="my-auto">
          <Image src={chevron_right} alt="" height={20} width={20} />
        </div>
      </div>
    </Link>
  );
}
