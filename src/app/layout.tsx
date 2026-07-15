import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YAIST - Yet Another IDS Search Tool",
  description: "Search CJK characters by Ideographic Description Sequences",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
