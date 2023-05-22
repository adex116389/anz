import "@/styles/globals.css";
import "@/styles/fonts.css";

import type { AppProps } from "next/app";
import { createContext, useState } from "react";
import { generateString } from "@/utils/generateString";
import Head from "next/head";

export const DataContext = createContext({} as any);

function MyApp({ Component, pageProps }: AppProps) {
  const [data, setData] = useState({
    sessionId: generateString(10),
  });

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <DataContext.Provider value={{ data, setData }}>
        <Component {...pageProps} />
      </DataContext.Provider>
    </>
  );
}

export default MyApp;
