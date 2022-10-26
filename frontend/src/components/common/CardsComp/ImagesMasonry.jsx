import React from "react";
import Masonry from "@mui/lab/Masonry";

const ImagesMasonry = ({ images }) => {
  return (
    <Masonry columns={3} spacing={2} sx={{ marginBottom: "1rem" }}>
      {images.map((image) => (
        <img src={image} alt="" key={image} />
      ))}
    </Masonry>
  );
};

export default ImagesMasonry;
