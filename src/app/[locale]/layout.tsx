import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Provider as JotaiProvider } from "jotai";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DarkModeSync from "@/components/DarkModeSync";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body className="min-h-screen flex flex-col bg-bg text-text font-sans">
        <NextIntlClientProvider messages={messages}>
          <JotaiProvider>
            <DarkModeSync />
            <Navbar />
            <main className="flex flex-1 flex-col md:flex-row">
              {children}
            </main>
            <Footer />
          </JotaiProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
