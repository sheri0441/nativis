import React from "react";
import Link from "next/link";
import { NotFoundIllustration } from "./utils/Illustrations";
import AnimationIllustrations from "./components/AnimationIllustrations";

const NotFound = () => {
  return (
    <main className="container pt-24 px-4 sm:pt-32 mx-auto lg:pt-44">
      <div className="lg:max-w-[60%] mx-auto">
        <AnimationIllustrations isSquare={false}>
          <NotFoundIllustration />
        </AnimationIllustrations>
      </div>
      <Link
        href="/"
        className="block mx-auto w-fit py-3 px-4 mt-10 sm:mt-12 border border-primary rounded-full transition-colors duration-500 ease-in-out hover:bg-primary hover:text-neutral"
      >
        Go to Homepage
      </Link>
    </main>
  );
};

export default NotFound;
