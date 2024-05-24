import { Metadata } from "next";
import HeroSection from "./components/Home/HeroSection";
import Image from "next/image";
import productImage from "./assets/productImage.png";
import ProductCart from "./UIElements/ProductCart";
import Link from "next/link";
import HomeSection from "./components/Home/HomeSection";
import TimerButton from "./components/Home/TimerButton";
import { Facial, Natural, Quality } from "./UIElements/Illustrations";
import AnimationIllustrations from "./components/Home/AnimationIllustrations";

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
        <HomeSection
          title="Why Choose Nativis?"
          subtitle="Experience the Difference of Natural Beauty Solutions"
        >
          <div className="flex flex-col mx-auto gap-4 w-fit mt-4 sm:flex-row sm:mt-5 lg:mt-7">
            <TimerButton innerText="Natural Beauty" />
            <TimerButton innerText="Trusted Quality" />
            <TimerButton innerText="Well-being" />
          </div>
          <div>
            <AnimationIllustrations>
              <Natural />
            </AnimationIllustrations>
            <AnimationIllustrations>
              <Quality />
            </AnimationIllustrations>
            <AnimationIllustrations>
              <Facial />
            </AnimationIllustrations>
          </div>
        </HomeSection>
      </div>
    </main>
  );
}
