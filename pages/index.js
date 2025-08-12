import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import Hero from '../components/suscribete/Hero';
import IconSectionLanding from '../components/suscribete/IconSectionLanding';
import TextSectionLanding from '../components/suscribete/TextSectionLanding';
import ReviewsSection from '../components/suscribete/ReviewsSection';
import PricingSection from '../components/suscribete/PricingSection';
import Audiobooks from '../components/suscribete/Audiobooks';
import Footer from '../components/common/Footer';
import SuscriptionModal from '../components/modals/SuscriptionModal';
import PrivacyPolicy from '../components/modals/PrivacyPolicy';
import TermsAndConditions from '../components/modals/TermsAndConditions';
import { useAuth } from '../context_providers/auth/authContext';
import { useRouter } from 'next/router';
import { useModalsContext } from '../context_providers';
import Beneficios from '../components/suscribete/Beneficios';
import Resumenes from '../components/suscribete/Resumenes';
import useBooks from '../hooks/useBooks';
import { useBookProgressContext } from '../context_providers';
import dynamic from 'next/dynamic';
const SamplePlayer = dynamic(() => import('../components/suscribete/SamplePlayer'), { ssr: false });
import useRutas from '../hooks/useRutas';

export default function Home() {
  const [screenSize, setScreenSize] = useState('large');
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [progressData, setProgressData] = useState({});
  const { stripeRole, currentUser } = useAuth();
  const router = useRouter();
  const { toggleSuscription, suscriptionIsOpen, termsIsOpen, toggleTerms, privacyIsOpen, togglePrivacy } = useModalsContext();
  const { books, loadingBooks, error } = useBooks();
  const { getProgressFromFirestore } = useBookProgressContext();
  const [playingBook, setPlayingBook] = useState(null);
  const { rutas, loading: rutasLoading, error: rutasError } = useRutas(books);
  const [currentRutaIndex, setCurrentRutaIndex] = useState(0);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 500) {
        setScreenSize('small');
      } else if (window.innerWidth <= 768) {
        setScreenSize('medium');
      } else {
        setScreenSize('large');
      }
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      getProgressFromFirestore(currentUser.uid).then(data => {
        setProgressData(data);
      });
    }
  }, [currentUser]);

  useEffect(() => {
    if (rutas && rutas.length > 0) {
      const interval = setInterval(() => {
        setCurrentRutaIndex((prev) => (prev + 1) % rutas.length);
      }, 4000);

      return () => clearInterval(interval);
    }
  }, [rutas]);

  const handlePlanSelection = (plan) => {
    setSelectedPlan(plan);
  };

  const handlePlay = (book) => {
    if (playingBook?.id === book.id) {
      setPlayingBook(null);
    } else {
      setPlayingBook(book);
    }
  };

  const handlePause = () => {
    setPlayingBook(null);
  };

  const styles = {
    pageContainer: {
      backgroundColor: '#0F3140',
      minHeight: '100vh',
      overflowX: 'hidden',
    },
  };

  return (
    <>
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-W59WT8ZV');
          `,
        }}
      />
      <div style={styles.pageContainer}>
        <Hero handleConvertion={toggleSuscription} screenSize={screenSize} rutas={rutas}
          currentRutaIndex={currentRutaIndex}/>

        <Resumenes 
          handleConvertion={toggleSuscription}
          screenSize={screenSize}
          books={books}
          onPlay={handlePlay}
          onPause={handlePause}
          playingBook={playingBook}
          rutas={rutas}
          loading={rutasLoading}
          error={rutasError}
        />

        <Audiobooks 
          books={books}
          loadingBooks={loadingBooks}
          error={error}
          progressData={progressData}
          handleConvertion={toggleSuscription}
          onPlay={handlePlay}
          onPause={handlePause}
          playingBook={playingBook}
        />
        <PricingSection 
          handleConvertion={toggleSuscription} 
          handlePlanSelection={handlePlanSelection} 
          screenSize={screenSize} 
        />
        <IconSectionLanding 
          screenSize={screenSize} 
          handleConvertion={toggleSuscription} 
        />
        <Beneficios />

        <ReviewsSection screenSize={screenSize} />
        
        <TextSectionLanding handleConvertion={toggleSuscription} screenSize={screenSize} />
        <Footer />
        <SamplePlayer 
          book={playingBook} 
          onClose={handlePause}
          handleConvertion={toggleSuscription}
        />
        <SuscriptionModal 
          isOpen={suscriptionIsOpen} 
          toggle={toggleSuscription} 
          selectedPlan={selectedPlan}
        />
        <TermsAndConditions isOpen={termsIsOpen} toggle={toggleTerms} />
        <PrivacyPolicy isOpen={privacyIsOpen} toggle={togglePrivacy} />
      </div>
    </>
  );
}
