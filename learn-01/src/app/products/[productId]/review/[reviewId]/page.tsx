export default function Review({
  params,
}: {
  params: { productId: string; reviewId: string };
}) {
  return (
    <h2>
      This is product: {params.productId} and review is {params.reviewId}
    </h2>
  );
}
