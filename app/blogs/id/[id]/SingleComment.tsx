import React from "react";
import Image from "next/image";
import avataar from "../../../assets/avaatar.png";

const SingleComment = ({
  data,
}: {
  data: { author_name: string; created_at: string; content: string };
}) => {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
      <Image
        className=" rounded-full hidden sm:block sm:h-20 w-20"
        src={avataar}
        alt=""
      />
      <div className="flex flex-col gap-2">
        <p className="font-medium hidden sm:block ">{data.author_name} </p>
        <p className="">{data.content}</p>
        <p className="hidden sm:block font-light text-xs">{data.created_at}</p>
      </div>

      <div className="flex gap-2 sm:hidden">
        <Image className="h-11 w-11 rounded-full " src={avataar} alt="" />
        <div className="flex flex-col">
          <p className="font-medium ">{data.author_name}</p>
          <p className=" font-light text-xs">{data.created_at}</p>
        </div>
      </div>
    </div>
  );
};

export default SingleComment;
