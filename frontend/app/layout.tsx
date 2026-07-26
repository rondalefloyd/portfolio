import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import Providers from "./providers";
import "./globals.css";

export const metadata: Metadata = {
  title: "Rondale Floyd M. Bufete | Backend Developer",
  description:
    "Portfolio profile for Rondale Floyd M. Bufete, a backend developer focused on AI integrations and API development.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AppRouterCacheProvider>
          <Providers>{children}</Providers>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
