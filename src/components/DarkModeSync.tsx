"use client";

import { useEffect } from "react";
import { useAtom } from "jotai";
import { darkModeAtom } from "@/store/atoms";

export default function DarkModeSync() {
  const [darkMode] = useAtom(darkModeAtom);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  return null;
}
