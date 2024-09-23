import Link from "next/link";

export default function product({ params }: { params: { productId: string } }) {
  return (
    <div>
      <h2>Single Product page</h2>
      <h2>
        <b>PRODUCT ID: {params.productId}</b>
      </h2>
      <Link className="text-violet-900 underline font-bold" href="/products">
        All Products
      </Link>
    </div>
  );
}
