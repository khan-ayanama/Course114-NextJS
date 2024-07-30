import Link from "next/link";

export default function Docs({ params }: { params: { slug: string[] } }) {
  return (
    <>
      <h2>
        This is docs page <br /> <br />
        feature: {params.slug[0]} <br /> concept:
        {params.slug[1]}
      </h2>
      <br />
      <Link
        className="text-white border-2 py-1 px-10 rounded-md bg-purple-600 hover:bg-purple-800"
        href={"/"}
      >
        Home
      </Link>
      <Link href={"products"}>Products</Link>
    </>
  );
}
