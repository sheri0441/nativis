"use client";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ProductPageData } from "../utils/Interfaces";
import ProductAchieveLoading from "./ProductAchieveLoading";
import ProductAchieveLayout from "./ProductAchieveLayout";
import axios from "axios";

const PageContent = ({
  page,
  apiURL,
  hideCategory = false,
  paginationURL,
  additionRenderingCondition = [],
  pageTitle,
}: {
  page: string;
  apiURL: string;
  hideCategory?: boolean;
  paginationURL: string;
  additionRenderingCondition?: String[];
  pageTitle: string;
}) => {
  const searchParams = useSearchParams();
  const sort = searchParams.get("sort");

  const [data, setData] = useState<ProductPageData>();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const url =
        process.env.NEXT_PUBLIC_BASE_URL +
          `${apiURL}?sort=${sort ? sort : "newest"}` || "";

      try {
        const response = await axios.get(url);
        if (response.status !== 200) {
          throw new Error(response.data.message);
        }
        const result = response.data;

        setData(result);
      } catch (error) {
        setData(undefined);
      }

      setIsLoading((pervState) => (pervState = false));
    };
    fetchData();
  }, [page, apiURL, sort, ...additionRenderingCondition]);

  if (!data || isLoading) {
    return (
      <ProductAchieveLoading
        hideCategory={hideCategory}
        pageTitle={pageTitle}
      />
    );
  }

  return (
    <ProductAchieveLayout
      data={data}
      pageTitle={pageTitle}
      paginationURL={paginationURL}
      hideCategory={hideCategory}
    />
  );
};

export default PageContent;
