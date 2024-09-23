export default function review({
  params,
}: {
  params: { productId: string; reviewId: string };
}) {
  return (
    <div>
      <h2>Review Page</h2>
      <h2>
        <b>
          Review for <i>PRODUCT ID: {params.productId}</i> is {params.reviewId}
        </b>
      </h2>
    </div>
  );
}
