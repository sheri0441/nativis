import Image from "next/image";
import Link from "next/link";
import { Logo } from "./UIElements/Icons";
import heroImage from "./assets/heroBgImage.jpg";

export default function Home() {
  return (
    <main>
      <div className="bg-primary px-6 pt-28 text-neutral bg-opacity-50 relative">
        <Image
          src={heroImage}
          alt="hero background image"
          className="absolute top-0 left-0 inset-0 object-cover -z-10 h-full"
        />
        <div className="w-14">
          <Logo />
        </div>

        <div className="border-l-2 border-neutral pl-2  mt-6">
          <p className="text-[32px] font-medium">
            Revitalize
            <br />
            with Nature&apos;s
            <br />
            Touch
          </p>
          <p className=" mt-4">
            Discover
            <br />
            the Power of Neem
            <br />
            in Skincare
          </p>
        </div>

        <button className="py-4 px-5 border-2 border-neutral rounded-full mt-4 hover:bg-neutral hover:text-primary transition-colors duration-500 ease-in-out mb-10">
          Explore Our Products
        </button>
      </div>
    </main>
  );
}
