"use client";
import Image from "next/image";
import React from "react";
import avataar from "../assets/defaultAvaatar.png";

const ImageUploadButton = ({
  hasError,
  previewImage,
  changeEvent,
}: {
  hasError: boolean;
  previewImage: string;
  changeEvent: Function;
}) => {
  return (
    <div>
      <div className=" flex items-center gap-5">
        <div
          className={`w-20 aspect-square rounded-full overflow-hidden ${
            hasError && !previewImage
              ? "outline outline-danger outline-[3px]"
              : ""
          }`}
        >
          <Image
            className="w-full object-cover object-center"
            src={previewImage ? previewImage : avataar}
            alt=""
            width={100}
            height={100}
          />
        </div>
        <label htmlFor="profileImage" className="cursor-pointer ">
          <span className="block w-fit bg-primary px-4 py-3 rounded-full text-neutral hover:bg-accent transition-colors duration-500 ease-in-out">
            Add Image
          </span>
        </label>
      </div>
      <input
        type="file"
        name="profileImage"
        id="profileImage"
        accept=".jpg, .png"
        multiple={false}
        onChange={(e) => changeEvent(e)}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploadButton;
