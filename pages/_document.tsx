import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en" dir="ltr">
      <Head>
        {/* Preconnect to important domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        
        {/* Character Set */}
        <meta charSet="utf-8" />
        
        {/* IE Compatibility */}
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        
        {/* Security Headers */}
        <meta httpEquiv="Content-Security-Policy" content="upgrade-insecure-requests" />
        
        {/* Publisher Information */}
        <meta name="publisher" content="CraneR Technology Limited" />
        <meta name="copyright" content="© 2024-2026 CraneR Technology Limited. All rights reserved." />
        
        {/* Industry Classification */}
        <meta name="classification" content="Construction Technology, AI, IoT" />
        <meta name="category" content="Technology" />
        <meta name="coverage" content="Worldwide" />
        <meta name="distribution" content="Global" />
        <meta name="rating" content="General" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
