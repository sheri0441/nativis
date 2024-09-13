import React, { useEffect, useState } from "react";
import Image from "next/image";
import { CommentListAfterUserDetail } from "@/app/utils/Interfaces";
import { convertDateToString } from "@/app/app-lib";
import CommentEditor from "./CommentEditor";
import axios from "axios";
import { useAppSelector } from "@/app/app/hookes";
import NegDoubleBtnOverLayerOption from "@/app/UIElements/Miscellaneous/NegDoubleBtnOverLayerOption";

const SingleComment = ({
  data,
  blogId,
  current,
  updateCommentSection,
}: {
  data: CommentListAfterUserDetail;
  blogId: string;
  current: number;
  updateCommentSection: Function;
}) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [showDeleteOption, setDeleteOption] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const userId = useAppSelector((store) => store.user.id);

  const sendRequestFunction = async (comment: string) => {
    const url =
      process.env.NEXT_PUBLIC_BASE_URL +
      `/api/blogs/comments/${blogId}/p/${current}/${data.id}`;
    const token = localStorage.getItem("token");
    const response = await axios.patch(
      url,
      { comment: comment },
      {
        headers: {
          Authorization: "Bearer " + token,
        },
      }
    );
    if (response.status === 200) {
      updateCommentSection(response.data);
      setEdit((perv) => (perv = false));
    } else {
      throw new Error("There is some problem in the server. Please try again.");
    }
  };

  const closeOverLayerOption = () => {
    setDeleteOption((perv) => (perv = false));
  };

  const deleteComment = async () => {
    closeOverLayerOption();
    setLoading(true);
    const url =
      process.env.NEXT_PUBLIC_BASE_URL +
      `/api/blogs/comments/${blogId}/p/${current}/${data.id}`;
    const token = localStorage.getItem("token");
    const response = await axios.delete(url, {
      headers: {
        Authorization: "Bearer " + token,
      },
    });
    if (response.status === 200) {
      updateCommentSection(response.data);
      setEdit((perv) => (perv = false));
    } else {
      throw new Error("There is some problem in the server. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    if (edit) {
      setEdit((perv) => (perv = false));
    }
  }, [current, edit]);

  return (
    <>
      <NegDoubleBtnOverLayerOption
        closeFunction={closeOverLayerOption}
        mainBtnText="Yes"
        mainFunction={deleteComment}
        secBtnFunction={closeOverLayerOption}
        secBtnText="Cancel"
        show={showDeleteOption}
        title="Are you sure?"
      >
        <p className=" opacity-75 mt-2">Do You Want to delete this comment?</p>
      </NegDoubleBtnOverLayerOption>
      <div
        className={`flex flex-col gap-2 sm:flex-row sm:gap-4 py-2 ${
          loading ? "opacity-50" : "opacity-100"
        }`}
      >
        <Image
          className=" rounded-full hidden sm:block sm:h-20 w-20"
          src={data.user.image}
          alt={data.user.name}
          width={200}
          height={200}
        />
        <div className="flex flex-col gap-2 w-full">
          <p className="font-medium hidden sm:block ">{data.user.name} </p>
          <div>
            {edit && data.userId === userId ? (
              <CommentEditor
                initialText={data.content}
                sendRequestFunction={sendRequestFunction}
                editMode={true}
                secondaryFunction={() => setEdit((perv) => (perv = false))}
              />
            ) : (
              <p className="">{data.content}</p>
            )}
          </div>
          <p className="hidden sm:block font-light text-xs">
            {convertDateToString(data.createdAt)}
          </p>
          {data.userId === userId && !edit && (
            <div className="hidden sm:flex  w-ful justify-evenly">
              <button
                className="block hover:underline text-secondary hover:opacity-75 text-xs"
                onClick={() => setEdit((perv) => (perv = true))}
              >
                Edit
              </button>
              <button
                className="block hover:underline text-danger hover:opacity-75  text-xs"
                onClick={() => setDeleteOption((perv) => (perv = true))}
              >
                Delete
              </button>
            </div>
          )}
        </div>

        <div className="flex gap-2 sm:hidden">
          <Image
            className="h-11 w-11 rounded-full "
            src={data.user.image}
            alt=""
            width={200}
            height={200}
          />
          <div className="flex flex-col">
            <p className="font-medium ">{data.user.name}</p>
            <p className=" font-light text-xs">
              {convertDateToString(data.createdAt)}
            </p>
          </div>
        </div>
        {data.userId === userId && !edit && (
          <div className="sm:hidden flex  w-ful justify-evenly">
            <button
              className="block hover:underline text-secondary hover:opacity-75 text-xs"
              onClick={() => setEdit((perv) => (perv = true))}
            >
              Edit
            </button>
            <button
              className="block hover:underline text-danger hover:opacity-75  text-xs"
              onClick={() => setDeleteOption((perv) => (perv = true))}
            >
              Delete
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleComment;
