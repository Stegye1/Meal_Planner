"use client";

import { usePathname } from "next/navigation";
import { Footer } from "./Footer";

export default function FooterHandler() {
  const pathname = usePathname();
  const hideFooter = pathname === "/";

  if (hideFooter) return null;
  return <Footer />;
}
