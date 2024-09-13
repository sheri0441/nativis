"use client";
import React from "react";
import Image from "next/image";
import { useAppSelector } from "@/app/app/hookes";
import CommentEditor from "./CommentEditor";
import axios from "axios";

const UserCommentField = ({
  updateCommentSection,
  blogId,
  currentPair,
}: {
  updateCommentSection: Function;
  blogId: string;
  currentPair: number;
}) => {
  const dateNow = () => {
    const month = [
      "jan",
      "feb",
      "apr",
      "may",
      "jun",
      "jul",
      "aug",
      "sep",
      "oct",
      "nov",
      "dec",
    ];
    const date = new Date();

    return `${date.getDate()} ${month[
      date.getMonth() - 1
    ].toUpperCase()} ${date.getFullYear()}`;
  };
  const user = useAppSelector((store) => store.user);

  const sendRequestFunction = async (data: string) => {
    const url =
      process.env.NEXT_PUBLIC_BASE_URL +
      `/api/blogs/comments/${blogId}/p/${currentPair}`;
    const token = localStorage.getItem("token");
    const response = await axios.post(
      url,
      { comment: data },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 201) {
      updateCommentSection(response.data);
    } else {
      throw new Error("There is some problem in the server. Please try again.");
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-5 sm:grid sm:grid-cols-[80px_auto] sm:items-start">
      <div className="flex items-center gap-2">
        <Image
          className="h-11 w-11 rounded-full sm:h-20 sm:w-20"
          src={user.image || ""}
          alt={user.name || ""}
          width={200}
          height={200}
        />
        <div className="sm:hidden">
          <p className="font-medium ">{user.name}</p>
          <p className=" font-light text-xs">{dateNow()}</p>
        </div>
      </div>
      <div className="">
        <div className="hidden sm:flex sm:justify-between sm:items-center">
          <p className="font-medium ">{user.name}</p>
          <p className=" font-light text-xs">{dateNow()}</p>
        </div>
        <CommentEditor sendRequestFunction={sendRequestFunction} />
      </div>
    </div>
  );
};

export default UserCommentField;
