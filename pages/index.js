import React, { useRef, useEffect, useState } from 'react';
import HeroHome from '../components/home/HeroHome';
import TextSection from '../components/common/TextSection';
import FormSection from '../components/common/FormSection';
import Footer from '../components/common/Footer';
import Books from '../components/home/books/Books';
import { useAuth, useModalsContext, useScroll, useBookProgressContext } from '../context_providers';
import { useRouter } from 'next/router';
import SuscriptionModal from '../components/modals/SuscriptionModal';
import TermsAndConditions from '../components/modals/TermsAndConditions';
import PrivacyPolicy from '../components/modals/PrivacyPolicy';
import useAddToKlaviyoList from '../hooks/useAddToKlaviyoList';
import useBooks from '../hooks/useBooks';
import AppDownloadButtons from '../components/common/buttons/AppDownloadButtons';

// export async function getServerSideProps() {
//   const res = await getDocs(collection(db, 'books'));
//   const books = res.docs.map((doc) => {
//     const data = doc.data();
//     return {
//       ...data,
//       id: doc.id, // Adding the document ID can be useful
//     };
//   });

//   return {
//     props: {
//       books,
//     },
//   };
// }

export default function Home() {
  // @ts-ignore

  const { stripeRole, currentUser, userCredential } = useAuth();
  const { getProgressFromFirestore } = useBookProgressContext();
  const { books, loadingBooks, error } = useBooks(); 
  const { toggleSuscription, toggleTerms, togglePrivacy,termsIsOpen, privacyIsOpen, suscriptionIsOpen} = useModalsContext();
  const router = useRouter();
  const { saveScroll, getScroll } = useScroll();
  const { addToKlaviyoList, result } = useAddToKlaviyoList();
  
  // Credential for users thar register
  // const [userCredential, setUserCredential] = useState(null);
  const [progressData, setProgressData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [booksLoaded, setBooksLoaded] = useState(false);

  const hasScrolled = useRef(false);
  const booksRef = (node) => {
    if (node !== null) {
      const booksOffsetTop = node.offsetTop;
  
      if (currentUser && stripeRole) {
        window.scrollTo({ top: booksOffsetTop, behavior: 'smooth' });
        hasScrolled.current = true;
      }
    }
  };

  useEffect(() => {
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }
  }, []);

  useEffect(() => {
    if (!loadingBooks && books && books.length > 0) {
      setBooksLoaded(true);
    }
  }, [loadingBooks, books]);

  useEffect(() => {
  
    // Short delay for the second logic to give the first one some breathing room
    setTimeout(() => {
      // Second scrolling logic: Scroll to saved scroll position if booksLoaded is true
      if (booksLoaded) {
        const url = window.location.pathname;
        const savedScroll = getScroll(url);
        if (savedScroll) {
          window.scrollTo(0, savedScroll);
        }
      }
    }, 50); 
  }, [currentUser, stripeRole, booksLoaded, booksRef]);

  // Remeber scroll if user goes back
  useEffect(() => {
    const handleRouteChangeStart = () => {
      saveScroll(router.pathname);
    };
  
    router.events.on('routeChangeStart', handleRouteChangeStart);
  
    return () => {
      router.events.off('routeChangeStart', handleRouteChangeStart);
    };
  }, [saveScroll, router]);

  useEffect(() => {
    if (currentUser && currentUser.uid) {
      setIsLoading(true); 
      getProgressFromFirestore(currentUser.uid).then(data => {
        setProgressData(data);
        setIsLoading(false); 
      });
    }
   
  }, [currentUser]);

  useEffect(() => {
    const handleSuscription = async () => {
      if(userCredential && !stripeRole) {
        await addToKlaviyoList({ 
          email: userCredential.user ? userCredential.user.email : userCredential.email, 
          displayName: userCredential.user ? userCredential.user.displayName : userCredential.displayName
        });
    
        if (typeof window !== 'undefined') {
          import('react-facebook-pixel')
            .then((x) => x.default)
            .then((ReactPixel) => {
              ReactPixel.track('Subscribe'); 
            })
            .then(() =>
              window.gtag('event', 'registration', { 'event_category': 'Registration', 'event_action': 'Completed' })
            );
  
        }
      }
    };

    handleSuscription();
   
  }, [userCredential]);


  const handleConvertion = () => {
    toggleSuscription();
  };

  // Disable scroll when modal is diplayed
  useEffect(() => {
    if (suscriptionIsOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [suscriptionIsOpen]);

  

  return (
    
    <div className="pageContainer">
      {!isLoading && 
      <>
        <HeroHome handleConvertion={handleConvertion} />
        {/* @ts-ignore */}
        <div ref={hasScrolled.current ? null : booksRef} id="books"></div>
        {books && books.length > 0 && currentUser && stripeRole &&
          <Books progressData={progressData} books={books} loadingBooks={loadingBooks} error={error} />
        }
        <AppDownloadButtons />
        <TextSection handleConvertion={handleConvertion} />
        <FormSection />
        <Footer />
        <SuscriptionModal isOpen={suscriptionIsOpen} toggle={toggleSuscription} />
        <TermsAndConditions isOpen={termsIsOpen} toggle={toggleTerms} />
        <PrivacyPolicy isOpen={privacyIsOpen} toggle={togglePrivacy} />
      </>
      }
    </div>
  );
}
