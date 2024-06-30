"use client";
import { ArrowIcon } from "@/app/utils/Icons";
import React, { useState } from "react";
import SingleComment from "./SingleComment";
import UserCommentField from "./UserCommentField";
import LoginNote from "./LoginNote";

interface comment {
  author_name: string;
  created_at: string;
  content: string;
}

const CommentSection = ({ comments }: { comments: comment[] | [] }) => {
  const [paginationLoad, setPaginationLoad] = useState<boolean>(false);

  const togglePagination = () => {
    setPaginationLoad((perv) => !perv);
  };

  const loadPagination = () => {
    setPaginationLoad(true);
    setTimeout(togglePagination, 2000);
  };

  return (
    <div className="px-6 mt-5 pb-2 sm:pb-3 lg:pb-4">
      <div className="sm:flex sm:justify-between">
        <h2 className="capitalize text-primary text-[2rem] font-bold sm:text-5xl">
          comments
          <span className="text-base font-light pl-2">({comments.length})</span>
        </h2>
        {/* comments pagination */}
        <div className="flex justify-center gap-4 items-center mt-2">
          <button
            className="group h-8 sm:h-10 aspect-square grid items-center bg-primary bg-opacity-25 rounded-full p-2 sm:p-3 hover:bg-accent disabled:opacity-50"
            onClick={loadPagination}
            disabled={paginationLoad}
          >
            <ArrowIcon style={"fill-primary group-hover:fill-neutral"} />
          </button>
          <span>1/2</span>
          <button
            className="group h-8 sm:h-10 aspect-square grid items-center bg-primary bg-opacity-25 rounded-full p-2 sm:p-3  rotate-180 hover:bg-accent disabled:opacity-50"
            onClick={loadPagination}
            disabled={paginationLoad}
          >
            <ArrowIcon style={"fill-primary group-hover:fill-neutral"} />
          </button>
        </div>
      </div>
      {/* comments list */}
      <div
        className={`flex flex-col gap-4 mt-4 ${
          paginationLoad ? "opacity-50" : ""
        }`}
      >
        {comments.map((comment, index) => {
          return <SingleComment key={index} data={comment} />;
        })}
      </div>

      {true ? <LoginNote /> : <UserCommentField />}
    </div>
  );
};

export default CommentSection;
