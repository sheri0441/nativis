import React from "react";
import { Cart, Logo } from "../UIElements/Icons";
import IconsBtn from "../UIElements/IconsBtn";

const Navbar = () => {
  return (
    <header className="pt-4 px-6 pb-2 bg-primary">
      <a href="" className="w-[21px] block">
        <Logo />
      </a>
      <div>
        <IconsBtn>
          <Cart color="#283618" />
        </IconsBtn>
      </div>
    </header>
  );
};

export default Navbar;
