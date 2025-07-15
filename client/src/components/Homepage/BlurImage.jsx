import { useState } from "react";
import clsx from "clsx";

const BlurImage = ({ src, blurSrc, alt }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Blurred background */}
      <img
        src={blurSrc}
        alt="blur placeholder"
        className="w-full h-full object-cover absolute top-0 left-0"
        aria-hidden="true"
      />

      {/* Actual image */}
      <img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        className={clsx(
          "w-full h-full object-cover transition-opacity duration-700",
          loaded ? "opacity-100" : "opacity-0"
        )}
      />
    </div>
  );
};

export default BlurImage;