import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ImageConfigContextProvider } from "@/context/imageConfigContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ImageConfigContextProvider>
      <Component {...pageProps} />
    </ImageConfigContextProvider>
  );
}
