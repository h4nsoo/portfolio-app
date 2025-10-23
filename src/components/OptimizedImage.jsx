import React from "react";

const OptimizedImage = ({
  src,
  alt,
  className,
  loading = "lazy",
  width,
  height,
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      width={width}
      height={height}
      style={{ contentVisibility: "auto" }}
    />
  );
};

export default OptimizedImage;
