import React, { useEffect } from 'react';
import Image from 'next/image';
import LoginModal from '../../components/modals/LoginModal';
import { useModalsContext } from '../../context_providers/modalsState/modalsStateContext';
import { getAnalytics, logEvent } from 'firebase/analytics';
import AppDownloadButtons from '../../components/common/buttons/AppDownloadButtons';

function Confirmation() {
  const analytics = getAnalytics();

  useEffect(() => {
    if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_ENV === 'production') {
      import('react-facebook-pixel')
        .then((x) => x.default)
        .then((ReactPixel) => {
          ReactPixel.track('Purchase', {currency: 'USD', value: 2.95}); 
        });

      window.gtag('event', 'purchase', { 'event_category': 'Purchase', 'event_action': 'Completed' });	

      window.gtag('event', 'conversion', {
        'send_to': 'AW-11396911771/eEzQCNHv7_IYEJulvLoq',
      });

      // Log the purchase event in Firebase Analytics
      logEvent(analytics, 'purchase', {
        currency: 'USD',
        value: 2.95,
        platform: 'web'
      });
    }
	
	
		
  }, []);

  

  // @ts-ignore
  const { loginIsOpen, toggleLogin } = useModalsContext();

  return (
    <div className="loader" style={{ display: 'flex', flexDirection: 'column'}}>
			
      <p style={{ color: 'white', textAlign: 'center', padding: '1em' }}>
				Your payment was successful and your membership is now active.
        <div
          onClick={toggleLogin}
          style={{ color: '#f49231', textAlign: 'center', cursor: 'pointer', fontWeight: 'bold' }}
        >
						Log in
        </div>
      </p>
      
      <Image
        src="/assets/LogoBriefly.png"
        alt="Briefly logo"
        width={150}
        height={100}
        style={{ width: '140px', height: 'auto' }}
      />
      <AppDownloadButtons />
      <LoginModal isOpen={loginIsOpen} toggle={toggleLogin} />
    </div>
  );
}

export default Confirmation;
