import { globalStyle } from "@/styles/global";
import { UserProvider } from "@auth0/nextjs-auth0/client";
globalStyle()
export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
  );
}