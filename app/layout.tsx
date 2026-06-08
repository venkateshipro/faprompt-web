import type { Metadata } from "next";
import "./globals.css";
import SiteInteractions from "@/components/SiteInteractions";
import { organizationJsonLd, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "FaPrompt — AI · Products · Experiences",
    template: "%s · FaPrompt",
  },
  description:
    "FaPrompt is an AI-first product studio building software, automation, branding and digital products with care.",
  icons: {
    icon: [
      { url: "/assets/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/favicon-32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: "/assets/favicon-180.png",
  },
  openGraph: { type: "website", siteName: "FaPrompt", url: SITE_URL },
  twitter: { card: "summary_large_image" },
};

/**
 * No-flash theme: read the saved theme BEFORE first paint, exactly like v1.
 * Default is light; only switches to dark if the user previously chose it.
 */
const themeScript = `(function(){try{var t=localStorage.getItem('fp-theme');var d=document.documentElement;d.className+=' js';if(t==='dark')d.setAttribute('data-theme','dark');}catch(e){}})();`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@400;500;600;700;800&family=Space+Grotesk:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd()) }}
        />
      </head>
      <body>
        {children}
        <SiteInteractions />
      </body>
    </html>
  );
}
