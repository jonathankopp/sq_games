import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | SQ",
    default: "SQ Games",
  },
  description: "Experience unique and engaging browser-based games crafted with care. Each game offers a fresh take on classic concepts.",
  keywords: "browser games, online games, unique games, multiplayer games, casual games",
  icons: {
    icon: "/cat-martini.png",
    shortcut: "/cat-martini.png",
    apple: "/cat-martini.png",
  },
  openGraph: {
    type: "website",
    title: "SQ Games",
    description: "Experience unique and engaging browser-based games crafted with care.",
    siteName: "SQ",
  },
  twitter: {
    card: "summary_large_image",
    title: "SQ Games",
    description: "Experience unique and engaging browser-based games crafted with care.",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
