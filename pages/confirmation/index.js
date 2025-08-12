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
				Tu pago se ha realizado con éxito, tu membresia ha sido activada.
        <div
          onClick={toggleLogin}
          style={{ color: '#f49231', textAlign: 'center', cursor: 'pointer', fontWeight: 'bold' }}
        >
					Iniciar Sesión
        </div>
      </p>
      
      <Image
        src="https://firebasestorage.googleapis.com/v0/b/stream-readers-prod.appspot.com/o/img%2Flogo.png?alt=media&token=078e0fb8-76c4-425a-ac95-532a6ee1fcaa"
        alt="logo"
        width={200}
        height={50}
      />
      <AppDownloadButtons />
      <LoginModal isOpen={loginIsOpen} toggle={toggleLogin} />
    </div>
  );
}

export default Confirmation;
