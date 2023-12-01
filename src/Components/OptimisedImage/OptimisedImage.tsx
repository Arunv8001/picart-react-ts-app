interface GeneralImageProps {
  srcUrl: string;
  altText: string;
  width: number | string;
  height: number | string;
}

interface ImageProps extends GeneralImageProps {
  objectFit: "contain" | "cover" | "fill";
}

/**
 * Image wrapper component.
 * Images take up full width and height of parent by default.
 *
 */
const Image = (props: ImageProps) => {
  const {
    srcUrl,
    altText,
    height = "100%",
    width = "100%",
    objectFit = "fill",
  } = props;

  return (
    <div>
      <img
        width={width}
        height={height}
        alt={altText}
        style={{
          objectFit,
          backgroundColor: "#f3f3f3",
        }}
        src={srcUrl}
      />
    </div>
  );
};

const CoveredImage = (props: GeneralImageProps) => {
  return <Image objectFit="fill" {...props} />;
};

export { CoveredImage };
