import Head from "next/head";
import "../styles/globals.css";
import { AppProps } from "next/app";
import SettingProvider from "../utils/Settings";
import SessionProvider from "../utils/Sessions";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <SettingProvider>
        <Head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no"
          />
          <meta name="description" content="Description" />
          <meta name="keywords" content="Keywords" />
          <title>Qloud</title>
          <link rel="manifest" href="/manifest.json" />
          <link
            href="/icons/favicon-16x16.png"
            rel="icon"
            type="image/png"
            sizes="16x16"
          />
          <link
            href="/icons/favicon-32x32.png"
            rel="icon"
            type="image/png"
            sizes="32x32"
          />
          <link href="/favicon.ico" rel="icon" type="image/ico" sizes="16x16" />
          <link rel="apple-touch-icon" href="/apple-icon.png"></link>
          <meta name="theme-color" content="#317EFB" />
        </Head>
        <Component {...pageProps} />
      </SettingProvider>
    </SessionProvider>
  );
}
