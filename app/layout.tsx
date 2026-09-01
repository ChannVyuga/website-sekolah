import type { Metadata } from "next";
import { Poppins, Inter, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-poppins",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Citra Negara — SMP SMK SMA Yayasan AT-TAQWA Kemiri Jaya",
  description:
    "SMP SMK SMA Citra Negara di bawah naungan Yayasan AT-TAQWA Kemiri Jaya, Depok.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body
        className={`${poppins.variable} ${inter.variable} ${fraunces.variable} ${jetbrainsMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}