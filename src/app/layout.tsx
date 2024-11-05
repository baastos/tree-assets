import type { Metadata } from "next";
import { Roboto, Inter } from "next/font/google";

import "./globals.css";
import { ReactQueryClientProvider } from "@/context/tanstack-provider";

export const metadata: Metadata = {
  title: "Tractian Challenge",
};

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

const roboto = Roboto({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  display: "swap",
  adjustFontFallback: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="en">
        <body className={`${inter.className} ${roboto.className}`}>
          {children}
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
