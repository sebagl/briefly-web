// pages/[modal].js
import { useRouter } from 'next/router';
import TermsAndConditions from '../components/modals/TermsAndConditions';
import PrivacyPolicy from '../components/modals/PrivacyPolicy';
import PrivacyPolicyEn from '../components/modals/PrivacyPolicyEn';
import Login from '../components/modals/LoginModal';
import Suscription from '../components/modals/SuscriptionModal';


function ModalPage() {
  const router = useRouter();
  const { modal } = router.query;

  return (
    <>
      {modal === 'login' && (
        <Login
          isOpen={true}
          onClose={() => router.push('/')} // Navigate back on close
        />
      )}
      {modal === 'suscripcion' && (
        <Suscription
          isOpen={true}
          onClose={() => router.push('/')} // Navigate back on close
        />
      )}
      {modal === 'privacidad' && (
        <PrivacyPolicy
          isOpen={true}
          onClose={() => router.push('/')} // Navigate back on close
        />
      )}
      {modal === 'privacy-policy' && (
        <PrivacyPolicyEn
          isOpen={true}
          onClose={() => router.push('/')} // Navigate back on close
        />
      )}
      {modal === 'terminos-condiciones' && (
        <TermsAndConditions
          isOpen={true}
          onClose={() => router.push('/')} // Navigate back on close
        />
      )}
    </>
  );
}

export default ModalPage;
