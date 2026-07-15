import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Provider as JotaiProvider } from "jotai";
import { routing } from "@/i18n/routing";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
    <html lang={locale} data-theme="light">
      <body className="min-h-screen flex flex-col">
        <NextIntlClientProvider messages={messages}>
          <JotaiProvider>
            <Navbar />
            <main className="flex flex-1 overflow-hidden">
              {children}
            </main>
            <Footer />
          </JotaiProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
