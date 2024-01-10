import { Component } from "solid-js";

export type Image = {
  image: string;
  name: string;
  width: string;
  heigh: string;
  is_scale: boolean;
};

const Image: Component<Image> = (props) => {
  const { image, name, width, heigh, is_scale } = props;
  return (
    <div class="aspect-h-4 aspect-w-3 overflow-hidden rounded-lg lg:block border mx-auto">
      <img
        src={image}
        alt={name}
        class={`${heigh} ${width} mx-auto h-auto w-2/3 object-contain ${
          is_scale && "hover:scale-125 duration-150"
        }`}
      />
    </div>
  );
};

export default Image;
