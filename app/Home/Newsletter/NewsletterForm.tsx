import React from "react";

const NewsletterForm = () => {
  return (
    <form className="text-center flex flex-col max-w-[423px] mx-auto mt-8 gap-6 sm:gap-8  *:px-4 *:py-2 *:rounded-full *:border *:border-neutral">
      <input
        type="email"
        name="newsletter"
        id=""
        placeholder="xyz@abc.com"
        className=" bg-neutral text-primary  placeholder:text-primary placeholder:opacity-50 sm:text-xl sm:px-5 sm:py-3"
      />
      <input
        className="w-fit mx-auto hover:bg-neutral hover:text-primary cursor-pointer transition-colors duration-500 ease-in-out"
        type="submit"
        value="Subscribe"
      />
    </form>
  );
};

export default NewsletterForm;
