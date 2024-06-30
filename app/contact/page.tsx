import React from "react";
import RichTextRenderer from "../components/RichTextRenderer";
import ContactForm from "./ContactForm";
import faq from "./faqSample.json";

const page = () => {
  return (
    <main className="container lg:max-w-[872px] pt-24  mx-auto px-6 sm:px-8 lg:px-14 sm:pt-32 lg:pt-40 text-primary ">
      <h1 className="text-[32px] font-bold text-center sm:text-5xl lg:text-6xl">
        Contact
      </h1>
      <ContactForm />
      <div className="mt-10 flex flex-col gap-5" id="faq">
        <h2 className="text-center font-medium text-xl sm:text-2xl lg:text-[2rem]">
          Frequent Asked Question
        </h2>
        <RichTextRenderer content={faq.content} />
      </div>
    </main>
  );
};

export default page;
