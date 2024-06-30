"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import avataar from "../../assets/avaatar.png";

const LoggedBtn = () => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const toggleIsActive = () => {
    setIsActive((isActive) => !isActive);
  };

  useEffect(() => {
    const profileBox = document.getElementById("profileBox");

    const otherElement = (event: any) => {
      if (
        (event.target as Element).id !== "profileBox" ||
        (event.target as Element).parentElement?.id !== "profileBox"
      ) {
        toggleIsActive();
      }
    };

    if (profileBox) {
      document.addEventListener("click", otherElement);
      return () => document.removeEventListener("click", otherElement);
    }
  }, [isActive]);

  return (
    <div className="relative">
      <button
        className={`bg-neutral relative w-10 aspect-square rounded-full hover:bg-neutral lg:w-12 overflow-hidden hover:*:opacity-50 ${
          isActive && "*:opacity-50"
        }`}
        onClick={toggleIsActive}
      >
        <Image src={avataar} alt="" />
      </button>
      {isActive && (
        <div
          className="w-52 bg-neutral absolute right-0 after:content-[''] after:w-0 after:h-0  after:absolute  after:-top-4 lg:after:right-[14px] after:right-3 after:border-neutral after:border-8 after:border-r-[transparent] after:border-t-[transparent] after:border-l-[transparent] shadow-[0px_0px_4px_0px_rgb(40,54,24,0.59)] rounded flex flex-col items-center *:py-3 *:w-full *:text-center"
          id="profileBox"
        >
          <Link href="/" className="hover:bg-accent hover:text-neutral rounded">
            Profile
          </Link>

          <button className="hover:bg-accent hover:text-neutral rounded">
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default LoggedBtn;
