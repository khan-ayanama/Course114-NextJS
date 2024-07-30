"use client";
import Link from "next/link";
import { useState } from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [inputText, setInputText] = useState<string>();
  return (
    <div>
      <div className="text-black">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>
      <h2>Authentication Layout</h2>
      <br />
      <Link href="/login">Login</Link>
      <Link href="/register">Register</Link>
      <br />

      {children}
    </div>
  );
}
