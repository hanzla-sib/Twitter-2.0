import "@/styles/globals.css";
import {SessionProvider} from "next-auth/react";
import { AppContextProvidor } from "@/Contexts/AppContext";
export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
    <AppContextProvidor >
      <Component {...pageProps} />
      </AppContextProvidor>
    </SessionProvider>
  );
}
