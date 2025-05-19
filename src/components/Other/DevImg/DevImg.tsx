import Image from "next/image";

import { ImageInterface } from "@/interfaces/ImageInterface";

const DevImg = ({
  containerStyles,
  containerStylesImage,
  imgSrc,
  priority,
  alt,
}: ImageInterface) => {
  return (
    <div className={`${containerStyles} overflow-hidden`}>
      {priority ? (
        <div className="relative w-full h-full">
          <Image
            className={`${containerStylesImage} z-0 mt-10`}
            src={imgSrc}
            width={500}
            height={500}
            priority
            alt={alt}
          />
          <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-background via-background via-20% to-transparent to-60% z-10" />
        </div>
      ) : (
        <Image
          className={`${containerStylesImage} overflow-hidden`}
          src={imgSrc}
          width={500}
          height={500}
          alt={alt}
        />
      )}
    </div>
  );
};

export default DevImg;
