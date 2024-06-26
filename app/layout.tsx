import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import LoadingScreen from "./components/LoadingScreen/LoadingScreen";
import Navbar from "./layout/Navbar/Navbar";
import Footer from "./layout/Footer";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

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
      <body className={`${poppins.className} bg-neutral`}>
        <LoadingScreen />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
