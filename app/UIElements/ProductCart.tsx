import React from "react";
import Image from "next/image";
import productImage from "../assets/productImage.png";
import style from "./ProductCart.module.css";

const ProductCart = () => {
  return (
    <div className={"w-32 sm:w-60  cursor-pointer " + style.sh_card}>
      <div className="aspect-square rounded overflow-hidden ">
        <Image
          className="object-cover h-full"
          src={productImage}
          alt="product image"
        />
      </div>
      <p className="text-center text-primary line-clamp-2 mt-2 ">
        Almond Oil Moisturizer
      </p>

      <p className="text-center text-primary font-medium">$16.99</p>
    </div>
  );
};

export default ProductCart;
