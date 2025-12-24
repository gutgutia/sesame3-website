import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sesame3 — Your AI College Counselor",
  description: "Get expert guidance, honest chance assessments, and a clear roadmap — all through a conversation with an AI that knows you.",
  keywords: ["college counselor", "AI", "college admissions", "college planning", "SAT", "college essays"],
  authors: [{ name: "Sesame3" }],
  openGraph: {
    title: "Sesame3 — Your AI College Counselor",
    description: "Get expert guidance, honest chance assessments, and a clear roadmap — all through a conversation with an AI that knows you.",
    url: "https://sesame3.com",
    siteName: "Sesame3",
    images: [
      {
        url: "https://sesame3.com/assets/og-image.png",
        width: 1200,
        height: 630,
        alt: "Sesame3 - Your AI College Counselor",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sesame3 — Your AI College Counselor",
    description: "Get expert guidance, honest chance assessments, and a clear roadmap — all through a conversation with an AI that knows you.",
    images: ["https://sesame3.com/assets/og-image.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/assets/apple-touch-icon-180.png",
  },
  manifest: "/site.webmanifest",
  themeColor: "#12756A",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link 
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,700,900&display=swap" 
          rel="stylesheet" 
        />
        <link 
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap" 
          rel="stylesheet" 
        />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
