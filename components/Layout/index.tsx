import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout(props: LayoutProps) {
  const { children } = props;

  const { asPath, pathname } = useRouter();
  

  return (
    <div className="drawer">
      <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col">
        {/* <!-- Navbar --> */}
        <div className="w-full navbar bg-blue-primary text-white relative">
          <div className="flex-none lg:hidden">
            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block w-6 h-6 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                ></path>
              </svg>
            </label>
          </div>
          {/* Handle Navbar title */}
          {asPath.includes("/berita") ? (
            <>
              <div className="flex absolute inset-x-24 justify-center pt-0.5 nav-bikunku">
                <p>Berita Bikun</p>
              </div>
            </>
          ) : asPath === "/rute" ? (
            <>
              {" "}
              <div>Rute Bikun</div>
            </>
          ) : asPath === "/jadwal" ? (
            <>
              {" "}
              <div>Jadwal Bikun</div>
            </>
          ) : asPath === "/bantuan" ? (
            <>
              {" "}
              <div>FAQ</div>
            </>
          ) : (
            <>default</>
          )}
          {/* <div className="flex-1 px-2 mx-2">Navbar Title</div> */}

          <div className="flex-none hidden lg:block px-2">
            <ul className="menu menu-horizontal space-x-2">
              <Link href="/">Beranda</Link>
              <Link href="/berita">Berita Bikun</Link>
              <Link href="/"></Link>
              <Link href="/">Rute Bikun</Link>
              <Link href="/">Jadwal Bikun</Link>
              <Link href="/bantuan">Bantuan</Link>
            </ul>
          </div>
        </div>
        {/* <!-- Page content here --> */}
        <div className="bg-blue-200 h-full">
          
          {children}
        </div>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
        <ul className="menu p-4 w-64 bg-base-100">
          {/* <!-- Sidebar content here --> */}
          <Link href="/">Beranda</Link>
          <Link href="/berita">Berita Bikun</Link>
          <Link href="/"></Link>
          <Link href="/">Rute Bikun</Link>
          <Link href="/">Jadwal Bikun</Link>
          <Link href="/bantuan">Bantuan</Link>
        </ul>
      </div>
    </div>
  );
}
