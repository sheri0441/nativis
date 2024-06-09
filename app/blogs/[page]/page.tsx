import React from "react";

const page = ({ params }: { params: { page: string } }) => {
  return <div>{params.page}</div>;
};

export default page;
