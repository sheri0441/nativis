import React from "react";
import Link from "next/link";
import Image from "next/image";
import style from "./ProductCard.module.css";
import { ProductCardType } from "@/app/utils/Interfaces";

const ProductCard = ({
  extraStyle,
  product,
}: {
  extraStyle?: string;
  product: ProductCardType;
}) => {
  return (
    <Link
      href={`/products/id/${product.id}`}
      className={`w-full block  cursor-pointer ${extraStyle} ` + style.sh_card}
    >
      <div className="aspect-square rounded overflow-hidden ">
        <Image
          className="object-cover w-full h-full transition-transform duration-500 ease-in-out"
          src={product.thumbnail}
          alt={product.name}
          width={400}
          height={400}
        />
      </div>
      <p className="text-center text-primary line-clamp-2 mt-2 ">
        {product.name}
      </p>

      <p className="text-center text-primary font-medium">
        ${Object.values(product.price)[0]}
      </p>
    </Link>
  );
};

export default ProductCard;
