import React, { useState, useEffect } from 'react';
import Script from 'next/script';
import Hero from '../../components/suscribete/Hero';
import IconSectionLanding from '../../components/suscribete/IconSectionLanding';
import TextSectionLanding from '../../components/suscribete/TextSectionLanding';
import ReviewsSection from '../../components/suscribete/ReviewsSection';
import PricingSection from '../../components/suscribete/PricingSection';
import Audiobooks from '../../components/suscribete/Audiobooks';
import Footer from '../../components/common/Footer';
import SuscriptionModal from '../../components/modals/SuscriptionModal';
import PrivacyPolicy from '../../components/modals/PrivacyPolicy';
import TermsAndConditions from '../../components/modals/TermsAndConditions';
import { useAuth } from '../../context_providers/auth/authContext';
import { useRouter } from 'next/router';
import { useModalsContext } from '../../context_providers';
import Beneficios from '../../components/suscribete/Beneficios';
import Resumenes from '../../components/suscribete/Resumenes';
import useBooks from '../../hooks/useBooks';
import { useBookProgressContext } from '../../context_providers';
import SamplePlayer from '../../components/suscribete/SamplePlayer';
import LandingActions from '../../components/suscribete/LandingActions';
import useRutas from '../../hooks/useRutas';

function Suscribete() {
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
    handleResize(); // Call once to set initial size
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
    heroLanding: {
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '100vh',
    },
    heroImage: {
      zIndex: -1,
    },
    heroTextLanding: {
      position: 'absolute',
      top: screenSize === 'small' ? 'auto' : '25%',
      left: screenSize === 'small' ? '5%' : '11%',
      width: screenSize === 'small' ? '90%' : '50%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: screenSize === 'small' ? 'center' : 'flex-start',
      textAlign: screenSize === 'small' ? 'center' : 'left',
      bottom: screenSize === 'small' ? '1%' : 'auto',
    },
    heroTitle: {
      fontSize: screenSize === 'small' ? '1.7rem' : '45px',
      color: 'rgba(255, 255, 255)',
      marginBottom: '0px',
      margin: screenSize === 'small' ? '0' : 'inherit',
    },
    heroText: {
      fontSize: screenSize === 'small' ? '1.2rem' : '25px',
      color: 'rgba(255, 255, 255)',
      marginTop: '20px',
      lineHeight: 1.34,
      marginBottom: screenSize === 'small' ? '2em' : 'inherit',
    },
    heroBtn: {
      '&:hover': {
        transform: 'scale(1.1)',
      },
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

export default Suscribete;
