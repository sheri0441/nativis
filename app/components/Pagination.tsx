"use client";
import React from "react";
import { ArrowIcon } from "../UIElements/Icons";
import Link from "next/link";
import { color } from "../UIElements/colors";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const Pagination = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const sort = searchParams.get("sort");
  const search = searchParams.get("search");

  return (
    <div className="flex items-center gap-6 w-fit mx-auto mt-11 sm:mt-16">
      <button
        className="group w-10 aspect-square bg-primary bg-opacity-50 rounded-full hover:bg-opacity-100 p-3 transition-colors duration-500 ease-in-out"
        onClick={() =>
          router.push(
            pathname + "?" + `sort=${sort}&page=${page}&search=${search}`
          )
        }
      >
        <ArrowIcon hoverFill="fill-neutral" fill={color.primary} />
      </button>
      <Link
        href={pathname + "?" + `sort=${sort}&page=${page}&search=${search}`}
        className="block relative w-8 bg-primary bg-opacity-50 hover:bg-opacity-100 hover:text-neutral aspect-square rounded-full overflow-hidden transition-colors duration-500 ease-in-out"
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          1
        </span>
      </Link>
      <Link
        href={pathname + "?" + `sort=${sort}&page=${page}&search=${search}`}
        className="block relative w-8 bg-primary bg-opacity-50 hover:bg-opacity-100 hover:text-neutral aspect-square rounded-full overflow-hidden transition-colors duration-500 ease-in-out"
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          1
        </span>
      </Link>
      <Link
        href={pathname + "?" + `sort=${sort}&page=${page}&search=${search}`}
        className="block relative w-8 bg-primary bg-opacity-50 hover:bg-opacity-100 hover:text-neutral aspect-square rounded-full overflow-hidden transition-colors duration-500 ease-in-out"
      >
        <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          1
        </span>
      </Link>
      <button
        className="group w-10 aspect-square bg-primary bg-opacity-50 rounded-full hover:bg-opacity-100 rotate-180 p-3 transition-colors duration-500 ease-in-out"
        onClick={() =>
          router.push(
            pathname + "?" + `sort=${sort}&page=${page}&search=${search}`
          )
        }
      >
        <ArrowIcon hoverFill="fill-neutral" fill={color.primary} />
      </button>
    </div>
  );
};

export default Pagination;
