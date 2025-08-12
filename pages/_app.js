import React, { useEffect } from 'react';
import './styles.css';
import { AuthProvider, ModalsStateProvider, BookProgressProvider, ScrollProvider } from '../context_providers';
import TagManager from 'react-gtm-module';
import { useRouter } from 'next/router';
import Script from 'next/script';
import { getAnalytics, logEvent, isSupported } from 'firebase/analytics';
import * as gtag from '../config/gtag';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  

  useEffect(() => {
    
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_ENV === 'production') {
      import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
          ReactPixel.init('3378716049056128'); // facebookPixelId
          ReactPixel.init('8811150748925929'); // facebookPixelId
          ReactPixel.pageView();

          router.events.on('routeChangeComplete', () => {
            ReactPixel.pageView();
          });
        });
    }
  }, [router.events]);

  useEffect(() => {
    let analyticsInstance = null;
    let unsubscribed = false;

    const setup = async () => {
      if (typeof window === 'undefined') return;
      try {
        const supported = await isSupported().catch(() => false);
        if (!supported) return;
        // Only initialize analytics if measurementId is provided
        if (!process.env.NEXT_PUBLIC_MEASUREMENT_ID) return;
        analyticsInstance = getAnalytics();
      } catch (err) {
        // eslint-disable-next-line no-console
        console.warn('Analytics not initialized:', err);
      }

      const handleRouteChange = (url) => {
        try {
          if (analyticsInstance) {
            logEvent(analyticsInstance, 'page_view', {
              page_path: url,
              platform: 'web',
            });
          }
          if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
            gtag.pageview(url);
          }
        } catch (err) {
          // eslint-disable-next-line no-console
          console.warn('Route analytics error:', err);
        }
      };

      if (!unsubscribed) {
        router.events.on('routeChangeComplete', handleRouteChange);
      }

      return () => {
        router.events.off('routeChangeComplete', handleRouteChange);
      };
    };

    const cleanupPromise = setup();
    return () => {
      unsubscribed = true;
      // Ensure cleanup when setup resolved
      if (cleanupPromise && typeof cleanupPromise === 'function') {
        cleanupPromise();
      }
    };
  }, [router.events]);

  // useEffect(() => {
  //   TagManager.initialize({ gtmId: process.env.NEXT_PUBLIC_GTM || '' });
  // }, []);

  return (
    <>
      {/* Global Site Tag (gtag.js) - Google Analytics */}
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
      />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
					window.dataLayer = window.dataLayer || [];
					function gtag(){dataLayer.push(arguments);}
					gtag('js', new Date());
					gtag('config', '${gtag.GA_TRACKING_ID}', {
					page_path: window.location.pathname,
					});
				`,
        }}
      />
      <Script
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'AW-11396911771');
				  `,
        }}
      />
      <AuthProvider>
        <ModalsStateProvider>
          <BookProgressProvider>
            <ScrollProvider>
              <Component {...pageProps} />
            </ScrollProvider>
          </BookProgressProvider>
        </ModalsStateProvider>
      </AuthProvider>
    </>
  );
}

export default MyApp;
