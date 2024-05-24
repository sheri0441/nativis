import React from "react";
import Image from "next/image";
import heroImage from "../../assets/heroBgImage.jpg";

const HeroBgImage = () => {
  return (
    <Image
      src={heroImage}
      alt="hero background image"
      className="absolute top-0 left-0 inset-0 object-cover -z-10 h-full"
    />
  );
};

export default HeroBgImage;
