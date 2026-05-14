import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { hospital } from "@/lib/config";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://carebridge.example.com"),
  title: {
    default: `${hospital.name} | Premium Private Healthcare`,
    template: `%s | ${hospital.name}`
  },
  description: hospital.description,
  openGraph: {
    title: hospital.name,
    description: hospital.description,
    type: "website",
    images: [hospital.images.hero]
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
