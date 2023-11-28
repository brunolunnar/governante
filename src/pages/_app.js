import { globalStyle } from "../styles/global";
import { SessionProvider } from "next-auth/react";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
<<<<<<< HEAD
import AppContainer from '../components/authWrapper';
=======
>>>>>>> df11d55aaecb22b9cd1892b0b6b2bbb44c1692e4

globalStyle();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
<<<<<<< HEAD
      <AppContainer session={session}>
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
      </AppContainer>

=======
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
>>>>>>> df11d55aaecb22b9cd1892b0b6b2bbb44c1692e4
    </SessionProvider>
  );
}
