import "./globals.css";
import { Inter } from "next/font/google";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { AppTopBar } from "@/components/layout/AppTopBar";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Agent OS Web",
  description: "Personal Operating System for PoulCore",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        
        <AppSidebar />

        <div className="pl-60"> {/* Sidebar 占 240px */}
          <AppTopBar />

          <main className="px-6 py-6">
            {children}
          </main>
        </div>

      </body>
    </html>
  );
}
