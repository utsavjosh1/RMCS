import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Toaster } from "@/components/ui/toaster";
import { VersionDisplay } from "@/components/version-display";
import "./globals.css";

const geistSans = GeistSans;
const geistMono = GeistMono;

export const metadata = {
  title: "Raja Mantri Chor Sipahi",
  description: "Play the classic Indian card game online with friends!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
        <VersionDisplay />
      </body>
    </html>
  );
}
