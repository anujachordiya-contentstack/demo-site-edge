import "@/styles/globals.css";
import { useEffect } from 'react';
import { register } from '../instrumentation.js';

export default function App({ Component, pageProps }) {
  useEffect(() => {
    // Call the register function
    register();
  }, []);
  return <Component {...pageProps} />;
}
