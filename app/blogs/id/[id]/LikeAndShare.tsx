"use client";
import React, { useEffect, useState } from "react";
import { HeartIcon, ShareIcon } from "@/app/utils/Icons";
import { useForm } from "react-hook-form";

const LikeAndShare = () => {
  const [like, setLike] = useState<boolean>(false);

  const sendLikeRequest = () => {
    setLike((perv) => !perv);
  };

  return (
    <div className="border-t border-t-primary mt-3  pt-3 flex w-full items-center justify-between px-6 lg:px-0">
      <span className="block">Like: 1254</span>
      <div className="  flex justify-center gap-4">
        <form>
          <label
            className={`group flex h-10 gap-2 items-center py-2 px-4 font-medium rounded-lg  cursor-pointer select-none ${
              like ? "bg-accent text-neutral " : "bg-primary bg-opacity-25 "
            } `}
            htmlFor="like"
          >
            <HeartIcon style={like ? "fill-neutral" : "fill-primary "} />
            Like
          </label>
          <input
            className="hidden"
            type="checkbox"
            name="like"
            id="like"
            onChange={sendLikeRequest}
          />
        </form>
        <button className="flex h-10 gap-2 items-center py-2 px-4 font-medium fill-primary hover:fill-neutral bg-primary bg-opacity-25 rounded-lg hover:bg-accent hover:text-neutral">
          <ShareIcon />
          Share
        </button>
      </div>
    </div>
  );
};

export default LikeAndShare;
