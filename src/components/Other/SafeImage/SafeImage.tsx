import Image, { ImageProps } from "next/image";
import { FC } from "react";

interface SafeImageProps extends Omit<ImageProps, "style"> {
  customStyle?: {
    [key: string]: string | number;
  };
}

/**
 * SafeImage component that wraps Next.js Image component to avoid aspect ratio warnings
 * by properly setting width and height in the style prop.
 */
const SafeImage: FC<SafeImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  customStyle,
  unoptimized = false,
  ...rest
}) => {
  // Default styles that maintain aspect ratio
  const defaultStyles = {
    width: "100%",
    height: "auto",
    maxWidth: "100%",
    objectFit: "contain" as const,
  };

  // Combine default styles with custom styles
  const combinedStyles = {
    ...defaultStyles,
    ...customStyle,
  };

  return (
    <Image
      src={src}
      alt={alt || "Image"}
      width={width}
      height={height}
      className={className || ""}
      style={combinedStyles}
      unoptimized={unoptimized}
      {...rest}
    />
  );
};

export default SafeImage;
