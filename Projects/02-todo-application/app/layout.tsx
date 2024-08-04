import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { TodoContextProvider } from "./store/todo-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo",
  description: "Create Your task list",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <TodoContextProvider>{children}</TodoContextProvider>
      </body>
    </html>
  );
}
