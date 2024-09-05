import "@/styles/globals.css";
import { useEffect } from 'react';

export default function App({ Component, pageProps }) {
  if (typeof window === 'undefined') {
    // Dynamically import the register function to avoid bundling issues
    import('../instrumentation.js').then(({ register }) => {
      register();
    });
  }
  return <Component {...pageProps} />;
}
