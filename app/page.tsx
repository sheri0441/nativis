import { Metadata } from "next";
import Link from "next/link";
import HeroSection from "./Home/HeroSection/HeroSection";
import ProductCart from "./UIElements/ProductCart";
import HomeSection from "./Home/HomeSection";
import WhySection from "./Home/WhySection/WhySection";
import BlogCart from "./UIElements/BlogCart";
import Newsletter from "./Home/Newsletter/Newsletter";

export const metadata: Metadata = {
  title: "Nativis | Home",
  description: `Revitalize with Nature&apos;s Touch`,
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
          <div className="grid max-w-[272px] grid-cols-2 sm:max-w-[680px] sm:grid-cols-4 lg:max-w-full w-fit mx-auto  gap-x-4 gap-y-5 mt-5 sm:mt-8 sm:gap-12">
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
        <HomeSection
          title="Our Informative Articles"
          subtitle="Stay informed with our curated selection of articles on neem, skincare tips, and more"
        >
          <div className="max-w-72 mx-auto grid grid-cols-1 gap-4 mt-5 sm:max-w-[680px] sm:grid-cols-2 sm:gap-x-6 sm:gap-y-8 sm:mt-8 lg:max-w-full lg:grid-cols-4">
            <BlogCart />
            <BlogCart />
            <BlogCart />
            <BlogCart />
          </div>
          <Link
            href={"/"}
            className="text-primary hover:bg-primary hover:text-neutral transition-colors duration-500 ease-in-out border rounded-full py-2 px-4 block w-fit mx-auto mt-8"
          >
            View All
          </Link>
        </HomeSection>
      </div>
      <Newsletter />
      <div className="container mx-auto">
        <HomeSection
          title="Testimonies"
          subtitle="How much people love our products"
        >
          <div className="px-4 sm:px-8 lg:px-0 mt-5 sm:mt-10 grid sm:grid-cols-2 justify-center gap-5 sm:gap-10 items-center sm:*:mx-auto">
            <div className="py-2 px-4 border border-primary rounded-[1.125rem] text-primary leading-7  shadow-[0px_0px_8px_0px_rgb(40,54,24,0.34)] max-w-[413px] lg:max-w-[423px] sm:text-center sm:col-start-1 sm:row-start-2 sm:col-span-2">
              <p className="opacity-70" id="one">
                "I can&apos;t say enough good things about Nativis! Their
                commitment to using natural ingredients is evident in the
                quality of their products. Since incorporating Nativis into my
                skincare routine, I&apos;ve noticed a significant reduction in
                breakouts and a noticeable improvement in my skin&apos;s overall
                appearance. Thank you, Nativis, for giving me the confidence to
                bare my natural beauty!"
              </p>
              <p className="mt-3 text-center">Emma C. - Toronto, Canada</p>
            </div>
            <div className="py-2 px-4 border border-primary rounded-[1.125rem] text-primary leading-7  shadow-[0px_0px_8px_0px_rgb(40,54,24,0.34)] max-w-[413px] lg:max-w-[423px] sm:text-center">
              <p className="opacity-70">
                "I&apos;ve tried countless skincare brands over the years, but
                Nativis truly stands out. Their products are gentle yet
                powerful, and I&apos;ve noticed a remarkable improvement in my
                skin&apos;s tone and texture. Finally, I&apos;ve found skincare
                that makes me feel confident and radiant!"
              </p>
              <p className="mt-3 text-center">Jenny M. - New York, USA</p>
            </div>
            <div className="py-2 px-4 border border-primary rounded-[1.125rem] text-primary leading-7  shadow-[0px_0px_8px_0px_rgb(40,54,24,0.34)] max-w-[413px] lg:max-w-[423px] sm:text-center">
              <p className="opacity-70">
                "Nativis has been a game-changer for me! As someone with
                sensitive skin, I&apos;ve always struggled to find products that
                don&apos;t cause irritation. Nativis not only soothes my skin
                but also leaves it looking healthier and more luminous. I&apos;m
                beyond impressed!"
              </p>
              <p className="mt-3 text-center">Sophie L. - Sydney, Australia</p>
            </div>
          </div>
        </HomeSection>
      </div>
    </main>
  );
}
