import React from "react";
import { Metadata } from "next";
import RichTextRenderer from "../components/RichTextRenderer";
import ContactForm from "./ContactForm";
import axios from "axios";
import FAQ from "./FAQ";

export const metadata: Metadata = {
  title: "Contact | Nativis",
  description: "Thousand of Blogs to get education about your self",
};

const page = async () => {
  return (
    <main className="container lg:max-w-[872px] pt-24  mx-auto px-6 sm:px-8 lg:px-14 sm:pt-32 lg:pt-40 text-primary ">
      <h1 className="text-[32px] font-bold text-center sm:text-5xl lg:text-6xl">
        Contact
      </h1>
      <ContactForm />
      <FAQ />
    </main>
  );
};

export default page;
