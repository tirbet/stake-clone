import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Bengali } from "next/font/google";
import "../globals.css";
import { QueryProvider } from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/theme-provider";
import { AbstractIntlMessages, NextIntlClientProvider, hasLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { notFound } from 'next/navigation';
import { getMessages } from "next-intl/server";
import { Toaster } from "@/components/ui/sonner";
import { ModelProvider } from "@/providers/model-provider";
import { SheetProvider } from "@/providers/sheet-provider";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const banglaFont = Noto_Sans_Bengali({
  variable: "--font-bangla",
  subsets: ["bengali"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "StakeClone — Crypto Casino & Sports Betting Platform",
  description:
    "StakeClone is a next-generation crypto casino and sportsbook platform where users can bet on sports, play casino games, and enjoy instant crypto transactions. Built with Next.js for blazing-fast performance.",

};


type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function RootLayout({
  children,
  params
}: Readonly<Props>) {

  const { locale } = await params;


  if (!hasLocale(routing.locales, locale)) {
    return notFound();
  }


  const messages: AbstractIntlMessages = await getMessages()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${banglaFont.variable} antialiased`}
      >
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <QueryProvider>
              {children}               
              <Toaster />
              <ModelProvider />
              <SheetProvider />
            </QueryProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
