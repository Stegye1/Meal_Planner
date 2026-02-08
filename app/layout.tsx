import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import { ConvexClientProvider } from "@/app/layout/components/ConvexClientProvider";
import "./App.css";
import "./globals.css";
import FooterHandler from "./layout/components/FooterHandler";

const raleway = Raleway({
  weight: ["400", "500"],
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Meal Planner",
  description: "A meal planning application built with Next.js and Convex.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={raleway.className}>
      <body>
        <ConvexClientProvider>
          {children}
          <FooterHandler />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
