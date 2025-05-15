import { Inter, Poppins, Bangers } from "next/font/google";
import { ToastProvider } from "@/hooks/use-toast";
import { VersionDisplay } from "@/components/version-display";
import { AuthProvider } from "@/providers/AuthProvider";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const bangers = Bangers({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bangers",
  display: "swap",
});

export const metadata = {
  title: "Raja Mantri Chor Sipahi",
  description: "Play the classic Indian card game online with friends!",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${bangers.variable} antialiased font-poppins`}
        suppressHydrationWarning
      >
        <AuthProvider>
          <Sidebar />
          <ToastProvider>
            {children}
            <VersionDisplay />
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
