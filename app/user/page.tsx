import React from "react";
import MainTag from "../UIElements/Miscellaneous/MainTag";
import Image from "next/image";
import avataar from "../assets/avaatar.png";

const page = () => {
  return (
    <MainTag>
      <div className="mx-auto sm:flex w-fit sm:gap-6">
        <div className="w-96 aspect-square overflow-hidden rounded sm:rounded-md lg:rounded-lg">
          <Image
            className="w-full h-full object-cover object-center"
            src={avataar}
            alt=""
          />
        </div>
        <div className="flex flex-col gap-2">
          <div>
            <span className="font-medium">Name</span>
            <p className="text-xl sm:text-2xl">Jane</p>
          </div>
          <div>
            <span className="font-medium">Email</span>
            <p className="text-xl sm:text-2xl">janedoe@gmail.com</p>
          </div>
          <button className="py-3 border border-primary rounded-full hover:bg-primary hover:text-neutral transition-colors duration-500 ease-in-out capitalize">
            change password
          </button>
          <button className="py-3 border border-danger text-danger hover:bg-danger hover:text-neutral transition-colors duration-500 ease-in-out rounded-full capitalize">
            delete account
          </button>
          <button className="py-3 border border-danger text-danger hover:bg-danger hover:text-neutral transition-colors duration-500 ease-in-out rounded-full capitalize">
            Log Out
          </button>
        </div>
      </div>
      <div className="mt-5 sm:mt-8 lg:mt-10">
        <h2 className="text-xl sm:text-2xl lg:text-[2rem] font-medium text-center">
          Order History
        </h2>
        <table className="hidden sm:table overflow-scroll max-w-[880px] w-full mx-auto border border-primary rounded-md mt-5">
          <thead className="w-full">
            <tr className="w-full grid grid-cols-[20px_1fr_1fr_1fr_1fr] gap-1  p-4 bg-primary bg-opacity-75 text-neutral">
              <td>#</td>
              <td>Order Number</td>
              <td>Order Date</td>
              <td>Price</td>
              <td>Status</td>
            </tr>
          </thead>
          <tbody className="*:w-full *:grid *:grid-cols-[20px_1fr_1fr_1fr_1fr] *:gap-1  *:p-4 *:bg-neutral *:text-primary even:*:bg-secondary even:*:bg-opacity-25">
            <tr>
              <td>1</td>
              <td>123456789</td>
              <td>2022-02-02</td>
              <td>$100</td>
              <td>Delivered</td>
            </tr>
            <tr>
              <td>2</td>
              <td>123456789</td>
              <td>2022-02-02</td>
              <td>$100</td>
              <td>Delivered</td>
            </tr>
          </tbody>
        </table>
      </div>
    </MainTag>
  );
};

export default page;
