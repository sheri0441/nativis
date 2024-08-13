import React from "react";
import { Metadata } from "next";
import PageContent from "./pageContent";

export const metadata: Metadata = {
  title: "SignIn | Nativis",
  description: `Sign-IN and Sign-UP page for nativis website.`,
};

const page = () => {
  return <PageContent />;
};

export default page;
