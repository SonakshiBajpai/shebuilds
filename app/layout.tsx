import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ProfileProvider } from "./contexts/ProfileContext";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Ellemate - Personalized Co-Living Matching System",
  description: "Ellemate - Minimal Input, Maximum Harmony. Your Safety, Our Priority. Find your perfect co-living match today.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-poppins antialiased`}>
        <ProfileProvider>
          {children}
        </ProfileProvider>
      </body>
    </html>
  );
}
