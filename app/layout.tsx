import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Navbar from "./layout/Navbar/Navbar";
import Footer from "./layout/Footer";
import ProviderWrapper from "./components/ProviderWrapper";
import "./globals.css";

export const metadata: Metadata = {
  title: "Nativis",
  description: `Revitalize with Nature's Touch`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <ProviderWrapper>
        <Navbar />
        {children}
        <Footer />
      </ProviderWrapper>
    </html>
  );
}
