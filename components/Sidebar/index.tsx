import Link from "next/link"

export default function sidebar() {
  return (
    <div className="flex flex-col space-y-2 bg-red-200">
        <Link href="/">lorem</Link>
        <Link href="/berita">berita</Link>
    </div>
  )
}
