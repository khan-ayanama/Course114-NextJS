import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header className="bg-red-700 text-2xl py-4 text-white text-center">
          <h2>Header</h2>
        </header>
        {children}
        <footer className="bg-blue-700 absolute bottom-0 w-full h-20 leading-[80px] text-2xl  text-white text-center">
          <h2>Footer</h2>
        </footer>
      </body>
    </html>
  );
}
