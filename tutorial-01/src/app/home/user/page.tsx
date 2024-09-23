import Link from "next/link";

export default function user() {
  return (
    <div>
      <h2>Home Page</h2>
      <Link className="text-violet-900 underline font-bold" href="/">
        Root Page
      </Link>
      <br />
      <Link className="text-violet-900 underline font-bold" href="/home">
        Home Page
      </Link>
    </div>
  );
}
