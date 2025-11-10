import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export const metadata: Metadata = {
  title: "Калкулатор Заплата 2026 България | Изчисли Нетна Заплата и Данъци",
  description: "Най-точният калкулатор за заплата 2026 в България. Изчислете нетна заплата, данъци, осигуровки и загубата от новите данъчни промени. Безплатен онлайн калкулатор за брутна и чиста заплата.",
  keywords: [
    "калкулатор заплата 2026",
    "калкулатор заплата",
    "калкулатор заплата българия",
    "заплата 2026",
    "нетна заплата калкулатор",
    "брутна заплата калкулатор",
    "чиста заплата калкулатор",
    "данъци 2026",
    "осигуровки 2026",
    "данъчен калкулатор",
    "калкулатор осигуровки",
    "какво ми взима държавата",
    "изчисление на заплата",
    "заплата калкулатор онлайн",
    "данъци българия 2026",
    "осигуровки българия",
    "максимален осигурителен доход 2026",
    "пенсионни осигуровки 2026",
  ],
  authors: [{ name: "Martin Kuvandzhiev" }],
  openGraph: {
    title: "Калкулатор Заплата 2026 България - Изчисли Данъци и Осигуровки",
    description: "Най-точният безплатен калкулатор за заплата в България за 2026. Изчислете нетна заплата, данъци, осигуровки и загубата от новите данъчни промени.",
    type: "website",
    locale: "bg_BG",
    siteName: "Какво ми взима държавата - Калкулатор Заплата 2026",
  },
  twitter: {
    card: "summary_large_image",
    title: "Калкулатор Заплата 2026 България",
    description: "Изчислете нетна заплата, данъци и осигуровки за 2026 с най-точния безплатен калкулатор.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: "https://zaplata2026.com",
  },
  verification: {
    google: "",
    yandex: "",
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
