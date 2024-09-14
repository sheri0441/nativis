"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import RichTextRenderer from "../components/RichTextRenderer";

const FAQ = () => {
  const [faq, setFAQ] = useState([]);

  const fetchFAQ = async () => {
    try {
      const response = await axios.get("/api/faq");
      const faq = response.data;
      setFAQ(faq);
    } catch (error) {}
  };

  useEffect(() => {
    fetchFAQ();
  });
  if (faq.length > 0) {
    return (
      <div className="mt-10 flex flex-col gap-5" id="faq">
        <h2 className="text-center font-medium text-xl sm:text-2xl lg:text-[2rem]">
          Frequent Asked Question
        </h2>
        <RichTextRenderer content={faq} />
      </div>
    );
  }
};

export default FAQ;
