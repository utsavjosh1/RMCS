import { Geist, Geist_Mono } from "next/font/google";
import { ToastProvider } from "@/hooks/use-toast";
import { VersionDisplay } from "@/components/version-display";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

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
        <Sidebar />
        <ToastProvider>
          {children}
          <VersionDisplay />
        </ToastProvider>
      </body>
    </html>
  );
}
