import { gridItems } from "@/data";
import { BentoGrid, BentoGridItem } from "./bento-grid";

const Grid = () => {
  return (
    <section id="about">
      <BentoGrid className="mx-auto py-10 w-4/5">
        {gridItems.map((item, i) => (
          <BentoGridItem
            id={item.id}
            key={i}
            title={item.title}
            description={item.description}
            className={item.className}
            img={item.img}
            imgClassName={item.imgClassName}
            titleClassName={item.titleClassName}
            spareImg={item.spareImg}
          />
        ))}
      </BentoGrid>
    </section>
  );
};

export default Grid;
