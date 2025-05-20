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
    <div className={`${containerStyles} overflow-hidden relative`}>
      {priority ? (
        <div className="relative w-full h-full">
          <Image
            className={`${containerStylesImage} z-0 -mt-10 transition-none`}
            src={imgSrc}
            width={500}
            height={500}
            priority
            alt={alt}
            style={{ willChange: "auto" }}
          />
          <div
            className="absolute inset-0 w-full h-full bg-gradient-to-t from-background via-background via-0% to-transparent to-60% z-10 pointer-events-none transition-none"
            style={{ willChange: "auto", transform: "translateY(2px)" }}
          />
        </div>
      ) : (
        <Image
          className={`${containerStylesImage} overflow-hidden transition-none`}
          src={imgSrc}
          width={500}
          height={500}
          alt={alt}
          style={{ willChange: "auto" }}
        />
      )}
    </div>
  );
};

export default DevImg;
