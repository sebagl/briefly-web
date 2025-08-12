// @ts-nocheck
import React, { useMemo } from 'react';
import dynamic from 'next/dynamic';
import { useRouter } from 'next/router';

const PrivacyPolicyModal = dynamic(() => import('../components/modals/PrivacyPolicy'), { ssr: false });
const TermsModal = dynamic(() => import('../components/modals/TermsAndConditions'), { ssr: false });

export default function ModalRoutePage() {
  const router = useRouter();
  const { modal } = router.query;

  const normalized = useMemo(() => (typeof modal === 'string' ? modal.toLowerCase() : ''), [modal]);

  const isPrivacy = ['privacy', 'privacy-policy', 'privacidad', 'politica-de-privacidad'].includes(normalized);
  const isTerms = ['terms', 'terms-and-conditions', 'terminos', 'terminos-y-condiciones'].includes(normalized);

  const handleClose = () => {
    router.push('/');
  };

  // Render nothing on SSR; client will hydrate the modal
  return (
    <>
      {isPrivacy && <PrivacyPolicyModal isOpen onClose={handleClose} />}
      {isTerms && <TermsModal isOpen onClose={handleClose} />}
      {!isPrivacy && !isTerms && null}
    </>
  );
}


