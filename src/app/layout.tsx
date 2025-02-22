import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | SqGames",
    default: "SqGames - Unique Browser Games",
  },
  description: "Experience unique and engaging browser-based games crafted with care. Each game offers a fresh take on classic concepts.",
  keywords: "browser games, online games, unique games, multiplayer games, casual games",
  icons: {
    icon: "/logo.svg",
    shortcut: "/logo.svg",
    apple: "/logo.svg",
  },
  openGraph: {
    type: "website",
    title: "SqGames - Unique Browser Games",
    description: "Experience unique and engaging browser-based games crafted with care.",
    siteName: "SqGames",
  },
  twitter: {
    card: "summary_large_image",
    title: "SqGames - Unique Browser Games",
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
