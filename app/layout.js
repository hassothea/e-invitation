import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { weddingData } from "@/config/weddingData";
import { khmerFontsHref } from "@/lib/fonts";
import KhmerFonts from "@/components/KhmerFonts";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "600"], // only the weights the design uses: fewer files to download
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});

const { meta, fonts = {} } = weddingData;

/* ---------- Khmer fonts (chosen in config/weddingData.js → fonts) ---------- */
const khmerDisplay = fonts.khmerDisplay ?? { family: "Moul", google: true };
const khmerBody = fonts.khmerBody ?? { family: "Battambang", google: true };
const khmerDesc = fonts.khmerDescription ?? { family: "Moulpali", google: true };

// The Khmer fonts come from Google Fonts, loaded after the page appears (see KhmerFonts), so they never delay the first paint.
const googleFontsHref = khmerFontsHref({ khmerDisplay, khmerBody, khmerDescription: khmerDesc });

const quote = (family) => `"${String(family).replace(/"/g, "")}"`;

export const metadata = {
  title: meta.title,
  description: meta.description,
  // A private invitation: keep it out of search results.
  robots: { index: false, follow: false },
  openGraph: {
    title: meta.title,
    description: meta.description,
    type: "website",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#604633",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${display.variable} ${body.variable}`}
      data-shimmer={weddingData.motion?.romance?.shimmer === false ? "off" : "on"}
      style={{
        "--khmer-display": quote(khmerDisplay.family),
        "--khmer-body": quote(khmerBody.family),
        "--khmer-desc": quote(khmerDesc.family),
      }}
    >
      <head>
        {googleFontsHref && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
          </>
        )}
      </head>
      <body>
        {children}
        <KhmerFonts href={googleFontsHref} />
      </body>
    </html>
  );
}
