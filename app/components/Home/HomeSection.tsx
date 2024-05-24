import React, { ReactNode } from "react";

const HomeSection = ({
  children,
  title,
  subtitle,
}: {
  children: ReactNode;
  title: string;
  subtitle: string;
}) => {
  return (
    <div className="mt-12 sm:mt-20 lg:mt-24">
      <h2 className="text-2xl text-primary font-medium text-center sm:text-[32px] lg:text-5xl">
        {title}
      </h2>
      <p className="text-secondary opacity-70 text-center">{subtitle}</p>
      {children}
    </div>
  );
};

export default HomeSection;
