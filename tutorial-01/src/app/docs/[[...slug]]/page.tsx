import { notFound } from "next/navigation";

export default function Docs({ params }: { params: { slug?: string[] } }) {
  // Check if slug exists and if the second element is "2"
  if (params?.slug && params.slug[1] === "2") {
    notFound();
  }

  return (
    <div>
      <h2>Doc Page</h2>
      <h2>
        <b>SLUG: ({params?.slug?.[0] || "No slug provided"})</b>
      </h2>
      <p>
        <i>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed
          reprehenderit harum perspiciatis in dolore? Voluptatibus assumenda
          deserunt nemo neque, culpa repellendus accusamus voluptas tempore
          natus earum quo possimus laudantium error.
        </i>
      </p>
    </div>
  );
}
