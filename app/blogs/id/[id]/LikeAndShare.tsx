"use client";
import React, { useEffect, useState } from "react";
import { HeartIcon, ShareIcon } from "@/app/utils/Icons";
import { convertToAbbreviation } from "@/app/UIElements/Miscellaneous/convertToAbbreviation";
import axios, { AxiosError } from "axios";
import { useAppSelector } from "@/app/app/hookes";
import { checkLikeOfBlog } from "@/app/app-lib";
import {
  LinkedinShareButton,
  LinkedinIcon,
  FacebookShareButton,
  FacebookIcon,
} from "next-share";
import { usePathname } from "next/navigation";
import SingleBtnOverLayerOption from "@/app/UIElements/Miscellaneous/SingleBtnOverLayerOption";

const LikeAndShare = ({
  likeNumber,
  blogId,
}: {
  likeNumber: number;
  blogId: string;
}) => {
  const [like, setLike] = useState<boolean>(false);
  const isLogin = useAppSelector((store) => store.user.isLogin);
  const [disableLikeButton, setDisableLikeButton] = useState<boolean>(false);
  const [totalLikes, setTotalLikes] = useState<number>(likeNumber);
  const [shareOption, setShareOption] = useState<boolean>(false);
  const pathname = usePathname();

  const sendLikeRequest = async () => {
    if (!isLogin) {
      return;
    }
    try {
      const url =
        process.env.NEXT_PUBLIC_BASE_URL + `/api/blogs/likes/${blogId}`;
      const token = localStorage.getItem("token");
      const response = await axios.patch(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 201) {
        setLike((perv) => (perv = true));
        setTotalLikes((perv) => (perv = response.data.blogLike));
      } else if (response.status === 200) {
        setLike((perv) => (perv = false));
        setTotalLikes((perv) => (perv = response.data.blogLike));
      } else {
        setLike((perv) => (perv = false));
      }
    } catch (error) {}
  };

  const closeShareOption = () => {
    setShareOption((perv) => (perv = false));
  };

  const checkLike = async () => {
    setDisableLikeButton((perv) => (perv = true));
    const liked = await checkLikeOfBlog(blogId);
    setLike((perv) => (perv = liked));
    setDisableLikeButton((perv) => (perv = false));
  };

  const url = process.env.NEXT_PUBLIC_BASE_URL + pathname;

  useEffect(() => {
    checkLike();
  });

  return (
    <>
      <SingleBtnOverLayerOption
        show={shareOption}
        btnText="Later!"
        closeFunction={closeShareOption}
        mainFunction={closeShareOption}
        title="Share it"
      >
        <>
          <p className="mt-2">Where would you like to share this blog?</p>
          <div className="flex justify-center gap-2 hover:*:opacity-50 mt-2">
            <LinkedinShareButton url={url}>
              <LinkedinIcon size={32} round />
            </LinkedinShareButton>
            <FacebookShareButton
              url={url}
              quote={"You must read this blog."}
              hashtag={"#mustRead #nativis"}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
          </div>
        </>
      </SingleBtnOverLayerOption>
      <div className="border-t border-t-primary mt-3  pt-3 flex w-full items-center justify-between px-6 lg:px-0">
        <span className="block">Like: {convertToAbbreviation(totalLikes)}</span>
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
              disabled={disableLikeButton}
            />
          </form>
          <button
            className="flex h-10 gap-2 items-center py-2 px-4 font-medium fill-primary hover:fill-neutral bg-primary bg-opacity-25 rounded-lg hover:bg-accent hover:text-neutral"
            onClick={() => setShareOption((perv) => (perv = true))}
          >
            <ShareIcon />
            Share
          </button>
        </div>
      </div>
    </>
  );
};

export default LikeAndShare;
