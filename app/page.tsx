import { Metadata } from "next";
import HeroSection from "./components/Home/HeroSection";

import ProductCart from "./UIElements/ProductCart";
import Link from "next/link";
import HomeSection from "./components/Home/HomeSection";

import WhySection from "./components/Home/WhySection";

export const metadata: Metadata = {
  title: "Nativis | Home",
  description: `Revitalize with Nature's Touch`,
};

export default function Home() {
  return (
    <main>
      <HeroSection />
      <div className="container mx-auto">
        <HomeSection
          title="Our Latest Additions"
          subtitle="Discover our newest skincare solutions enriched with the goodness of
            neem."
        >
          <div className="grid grid-cols-[repeat(2,_128px)] sm:grid-cols-[repeat(2,_240px)] xl:grid-cols-[repeat(4,_240px)] w-fit mx-auto  gap-x-4 gap-y-5 mt-5 sm:mt-8 sm:gap-12">
            <ProductCart />
            <ProductCart />
            <ProductCart />
            <ProductCart />
          </div>
          <Link
            href={"/"}
            className="text-primary hover:bg-primary hover:text-neutral transition-colors duration-500 ease-in-out border rounded-full py-2 px-4 block w-fit mx-auto mt-8"
          >
            View All
          </Link>
        </HomeSection>
        <WhySection />
      </div>
    </main>
  );
}
