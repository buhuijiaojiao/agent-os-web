// app/layout.tsx
import "@/app/globals.css";
import { JetBrains_Mono } from "next/font/google";

const jetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

export const metadata = {
  title: "Agent OS Web",
  description: "Personal Operating System for PoulCore",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${jetBrainsMono.className} min-h-screen bg-background`}>
        {children}
      </body>
    </html>
  );
}
