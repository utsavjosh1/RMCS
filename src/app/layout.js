import { Inter, Poppins, Bangers } from "next/font/google";

import { VersionDisplay } from "@/components/version-display";
import { Providers } from "@/components/providers";
import "@/app/globals.css";
import { AppShell } from "@/components/app-shell";

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
        <Providers>
          <AppShell>{children}</AppShell>
          <VersionDisplay />
        </Providers>
      </body>
    </html>
  );
}
