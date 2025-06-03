import { Inter, Poppins, Bangers } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { AuthProvider } from "@/hooks/use-auth";
import { AuthGuard } from "@/components/auth-modal";
import { ToastProvider } from "@/hooks/use-toast";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
});

const bangers = Bangers({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-bangers",
});

export const metadata = {
  title: "RMCS - Raja Mantri Chor Sipahi",
  description: "Play the classic Indian card game online with friends",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${poppins.variable} ${bangers.variable}`}>
      <body className={inter.className}>
        <ToastProvider>
          <AuthProvider>
            <AuthGuard>
              <div className="flex min-h-screen">
                <Sidebar />
                <main className="flex-1 ml-20 lg:ml-80">{children}</main>
              </div>
            </AuthGuard>
          </AuthProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
