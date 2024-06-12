import React from "react";
import ProductImage from "./ProductImage";
import Link from "next/link";
import { MinusIcon, PlusIcon } from "@/app/UIElements/Icons";
import { color } from "@/app/UIElements/colors";

const page = () => {
  return (
    <main className="container pt-24  mx-auto px-6 sm:px-8 lg:px-14 sm:pt-32 lg:pt-40">
      <div className="flex flex-col gap-5">
        <ProductImage />
        <div>
          <Link
            className="text-xs leading-4 text-center block text-accent"
            href={"/products/c/hairoil"}
          >
            Hair Oil
          </Link>

          <h1 className="text-[32px] font-medium text-center text-primary">
            Almond Hair Oil
          </h1>
          <p className="text-xs text-center opacity-70  text-primary line-clamp-3 mt-2">
            Nativis Neem Almond Hair Oil blends the potent benefits of neem and
            almond oil to provide comprehensive care for your hair. This unique
            formula nourishes, strengthens, and revitalizes hair strands from
            root to tip, promoting healthier, more lustrous hair.
          </p>
          <div className="flex gap-2 w-fit mx-auto mt-5">
            <button className="text-xs px-3 py-2 text-primary bg-primary bg-opacity-25 hover:bg-opacity-100 hover:text-neutral rounded-3xl">
              20g
            </button>
            <button className="text-xs px-3 py-2 text-primary bg-primary bg-opacity-25 hover:bg-opacity-100 hover:text-neutral rounded-3xl">
              70g
            </button>
          </div>
          <div className="w-44 flex justify-between items-center bg-primary bg-opacity-25 rounded-full mx-auto mt-4">
            <button className="group bg-primary w-10 aspect-square rounded-full p-3 hover:bg-accent">
              <MinusIcon fill={color.neutral} style="group-hover:fill-neural" />
            </button>
            <span>1</span>
            <button className="group bg-primary w-10 aspect-square rounded-full p-3 hover:bg-accent">
              <PlusIcon fill={color.neutral} style="group-hover:fill-neural" />
            </button>
          </div>
          <span className="block text-[40px] font-medium text-center mt-5">
            $14.99
          </span>
          <div className="flex flex-col gap-4">
            <button className="font-medium capitalize py-3 w-full bg-primary text-neutral rounded-full hover:bg-accent">
              Add to Cart
            </button>
            <button className="font-medium capitalize py-3 w-full bg-primary bg-opacity-50  text-primary hover:text-neutral rounded-full hover:bg-opacity-100">
              Buy now
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default page;
