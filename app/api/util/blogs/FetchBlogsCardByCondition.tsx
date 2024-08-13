import { fetchBlogsCard } from "./FetchBlogsCard";

export const fetchBlogsCardByCondition = async ({
  sort,
  currentPage,
  filter,
}: {
  sort: string;
  currentPage: number;
  filter?: {};
}) => {
  if (sort === "oldest") {
    return await fetchBlogsCard({
      currentPage,
      filter,
      order: {
        createdAt: "desc",
      },
    });
  } else if (sort === "a-z") {
    return await fetchBlogsCard({
      currentPage,
      filter,
      order: {
        title: "asc",
      },
    });
  } else if (sort === "z-a") {
    return await fetchBlogsCard({
      currentPage,
      filter,
      order: {
        title: "desc",
      },
    });
  } else {
    return await fetchBlogsCard({
      currentPage,
      filter,
      order: {
        createdAt: "asc",
      },
    });
  }
};
