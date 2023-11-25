import { Providers } from "@/app/providers";
import { Analytics } from '@vercel/analytics/react';

import "./globals.css";
import MainView from "@/components/MainView";

export const metadata = {
  title: "Get Inspired",
  description: "Free ai prompts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full">
        <Providers>
          <MainView>{children}</MainView>
        </Providers>
        { process.env.APP_ENV === 'local' ? null : (
          <Analytics />
        )}
      </body>
    </html>
  );
}
