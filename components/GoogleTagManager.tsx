import Script from 'next/script';

/**
 * Google Tag Manager Component
 * Handles GTM initialization for advanced event tracking
 */
export default function GoogleTagManager() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const isEnabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';

  if (!gtmId || !isEnabled) {
    return null;
  }

  return (
    <>
      {/* Google Tag Manager - Head */}
      <Script
        id="gtm-script"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${gtmId}');
          `,
        }}
      />
    </>
  );
}

/**
 * GTM NoScript Fallback Component
 * Place this in the body tag for users with JavaScript disabled
 */
export function GoogleTagManagerNoScript() {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const isEnabled = process.env.NEXT_PUBLIC_ENABLE_ANALYTICS === 'true';

  if (!gtmId || !isEnabled) {
    return null;
  }

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  );
}
