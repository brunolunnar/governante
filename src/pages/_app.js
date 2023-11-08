import { globalStyle } from "@/styles/global";
import { UserProvider } from "@auth0/nextjs-auth0/client";
import { SessionProvider } from "next-auth/react";
import { getSession } from "next-auth/react";
globalStyle();
export default function App({ Component, pageProps }) {
  const { data: session } = getSession();
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
