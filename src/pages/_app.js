import { globalStyle } from "../styles/global";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AppContainer from '../components/authWrapper';

globalStyle();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      {/* <AppContainer session={session}> */}
        <Component {...pageProps} />
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          the
        />
      {/* </AppContainer> */}

    </SessionProvider>
  );
}
