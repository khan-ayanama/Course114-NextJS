import { gridItems } from "@/data";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";

export default function Grid() {
  return (
    <section className="bg-black-100">
      <BentoGrid className="">
        {gridItems.map(({ id, title, description, className, img }) => (
          <BentoGridItem
            key={id}
            id={id}
            image={img}
            className={className}
            description={description}
            title={title}
          />
        ))}
      </BentoGrid>
    </section>
  );
}
