"use client";
import React, { useEffect, useState } from "react";
import { ProductPageData } from "@/app/utils/Interfaces";
import { axiosFetcher } from "@/app/UIElements/Miscellaneous/axiosFetcher";
import { useSearchParams } from "next/navigation";
import ProductAchieveLayout from "../../ProductAchieveLayout";
import ProductAchieveLoading from "../../ProductAchieveLoading";
import { useAppDispatch, useAppSelector } from "@/app/app/hookes";
import { setLoadingPage } from "@/app/app/features/pageLoading/loadingSlice";

const PageContent = ({ page }: { page: string }) => {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");

  const [data, setData] = useState<ProductPageData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const url =
        process.env.NEXT_PUBLIC_BASE_URL +
          `/api/products/${page}?sort=${sort ? sort : "newest"}` || "";

      const result = await axiosFetcher(url);

      setData(result);
      setIsLoading((pervState) => (pervState = false));
    };
    fetchData();
  }, [page, sort]);

  if (!data || isLoading) {
    return <ProductAchieveLoading pageTitle="Products" />;
  }

  return (
    <ProductAchieveLayout
      data={data}
      pageTitle="Products"
      paginationURL="/products/p/"
    />
  );
};

export default PageContent;
