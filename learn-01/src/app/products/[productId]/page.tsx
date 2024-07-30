import { Metadata } from "next";

type Props = {
  params: {
    productId: string;
  };
};

export const generateMetadata = ({ params }: Props): Metadata => {
  return {
    title: `Product ${params.productId}`,
  };
};

export default function Product({ params }: Props) {
  return <h2>Single Product Page and id is:{params.productId} </h2>;
}
