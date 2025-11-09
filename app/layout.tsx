import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Какво ми взима държавата | Калкулатор за данъци 2026",
  description: "Изчислете колко по-малко пари ще получавате като заплата през 2026 година с новите данъци и осигуровки. Разберете как новият бюджет ще засегне вашия джоб.",
  keywords: ["данъци", "заплата", "България", "2026", "осигуровки", "бюджет", "калкулатор"],
  authors: [{ name: "Martin Kuvandzhiev" }],
  openGraph: {
    title: "Какво ми взима държавата | Калкулатор за данъци 2026",
    description: "Изчислете колко по-малко пари ще получавате като заплата през 2026 година с новите данъци и осигуровки.",
    type: "website",
    locale: "bg_BG",
  },
  twitter: {
    card: "summary_large_image",
    title: "Какво ми взима държавата | Калкулатор за данъци 2026",
    description: "Изчислете колко по-малко пари ще получавате като заплата през 2026 година с новите данъци.",
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
