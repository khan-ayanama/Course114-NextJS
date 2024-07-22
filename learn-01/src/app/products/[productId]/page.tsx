export default function Product({ params }: { params: { productId: string } }) {
  return <h2>Single Product Page and id is:{params.productId} </h2>;
}
