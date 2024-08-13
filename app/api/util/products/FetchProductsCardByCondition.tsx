import { fetchProductsCard } from "./FetchProductsCard";

export const fetchProductsCardByCondition = async ({
  sort,
  currentPage,
  filter,
}: {
  sort: string;
  currentPage: number;
  filter?: {};
}) => {
  if (sort === "oldest") {
    return await fetchProductsCard({
      currentPage: currentPage,
      filter: filter,
      order: {
        created_at: "desc",
      },
    });
  } else if (sort === "a-z") {
    return await fetchProductsCard({
      currentPage: currentPage,
      filter: filter,
      order: {
        name: "asc",
      },
    });
  } else if (sort === "z-a") {
    return await fetchProductsCard({
      currentPage: currentPage,
      filter: filter,
      order: {
        name: "desc",
      },
    });
  } else {
    return await fetchProductsCard({
      currentPage: currentPage,
      filter: filter,
      order: {
        created_at: "asc",
      },
    });
  }
};
