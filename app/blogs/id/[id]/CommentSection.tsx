"use client";
import { ArrowIcon } from "@/app/utils/Icons";
import React, { useState } from "react";
import SingleComment from "./SingleComment";
import UserCommentField from "./UserCommentField";
import { axiosFetcher } from "@/app/UIElements/Miscellaneous/axiosFetcher";
import { BlogCommentsDetail } from "@/app/utils/Interfaces";
import { useAppSelector } from "@/app/app/hookes";
import Banner from "@/app/UIElements/Miscellaneous/Banner";

interface comment {
  author_name: string;
  created_at: string;
  content: string;
}

const CommentSection = ({
  id,
  comment,
}: {
  id: string;
  comment: BlogCommentsDetail;
}) => {
  const [paginationLoad, setPaginationLoad] = useState<boolean>(false);
  const [commentData, setCommentData] = useState<BlogCommentsDetail>(comment);
  const { commentList, current, totalComments, totalPairNumber } = commentData;

  const isLogin = useAppSelector((store) => store.user.isLogin);

  const updateCommentSection = (data: BlogCommentsDetail) => {
    setCommentData(data);
  };

  const fetchComment = async (pair: number) => {
    setPaginationLoad(true);
    try {
      const url =
        process.env.NEXT_PUBLIC_BASE_URL +
        `/api/blogs/comments/${id}/p/${pair}`;
      const comments = await axiosFetcher(url);

      updateCommentSection(comments);
    } catch (error) {}
    setPaginationLoad(false);
  };

  const decrementPair = () => {
    if (current > 1) {
      fetchComment(current - 1);
    }
  };

  const incrementPair = () => {
    if (current < totalPairNumber) {
      fetchComment(current + 1);
    }
  };

  return (
    <div className="px-6 mt-5 pb-2 sm:pb-3 lg:pb-4">
      <div className="sm:flex sm:justify-between">
        <h2 className="capitalize text-primary text-[2rem] font-bold sm:text-5xl">
          comments
          <span className="text-base font-light pl-2">({totalComments})</span>
        </h2>
        {/* comments pagination */}
        <div className="flex justify-center gap-4 items-center mt-2">
          <button
            className="enabled:group h-8 sm:h-10 aspect-square grid items-center bg-primary bg-opacity-25 rounded-full p-2 sm:p-3 enabled:hover:bg-accent disabled:opacity-50"
            onClick={decrementPair}
            disabled={paginationLoad || current === 1}
          >
            <ArrowIcon style={"fill-primary group-hover:fill-neutral"} />
          </button>
          <span>
            {current}/{totalPairNumber}
          </span>
          <button
            className="enabled:group h-8 sm:h-10 aspect-square grid items-center bg-primary bg-opacity-25 rounded-full p-2 sm:p-3  rotate-180 enabled:hover:bg-accent disabled:opacity-50 "
            onClick={incrementPair}
            disabled={paginationLoad || current === totalPairNumber}
          >
            <ArrowIcon style={"fill-primary group-hover:fill-neutral"} />
          </button>
        </div>
      </div>
      {/* comments list */}
      <div
        className={`flex flex-col *:border-b *:border-b-secondary *:border-opacity-50 mt-4 last:*:border-b-0 ${
          paginationLoad ? "opacity-50" : ""
        }`}
      >
        {commentList !== null
          ? commentList.map((comment, index) => {
              return (
                <SingleComment
                  key={index}
                  data={comment}
                  blogId={id}
                  current={commentData.current}
                  updateCommentSection={updateCommentSection}
                />
              );
            })
          : " Be the first one to comments"}
      </div>

      {isLogin ? (
        <UserCommentField
          updateCommentSection={updateCommentSection}
          blogId={id}
          currentPair={current}
        />
      ) : (
        <Banner
          body="Sign up to share you comment with other and like the blogs."
          title="Comment and Like"
        />
      )}
    </div>
  );
};

export default CommentSection;
