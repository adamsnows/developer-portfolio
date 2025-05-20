import Image, { ImageProps } from "next/image";
import { FC } from "react";

interface SafeImageProps extends Omit<ImageProps, 'style'> {
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
    width: typeof width === 'number' ? `${width}px` : width,
    height: typeof height === 'number' ? `${height}px` : height,
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
