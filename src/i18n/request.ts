import { getRequestConfig } from "next-intl/server";

export default getRequestConfig(async ({ requestLocale }) => {
  const locale = await requestLocale;
  return {
    locale: locale ?? "ja",
    messages: (await import(`../../messages/${locale ?? "ja"}.json`)).default,
  };
});
