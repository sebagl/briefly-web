// @ts-nocheck
import React, { useEffect } from 'react';
import Header from '../common/Header';
import LandingActions from '../suscribete/LandingActions';
import Contact from '../modals/Contact';
import LoginModal from '../modals/LoginModal';
import Perfil from '../modals/PerfilModal';
import Image from 'next/image';
import { useModalsContext } from '../../context_providers/modalsState/modalsStateContext';

function Hero({ handleConvertion, screenSize, currentRutaIndex, rutas }) {
  const {
    contactIsOpen,
    loginIsOpen,
    perfilIsOpen,
    toggleLogin,
    toggleContact,
    togglePerfil,
  } = useModalsContext();

  useEffect(() => {
    if (contactIsOpen || loginIsOpen || perfilIsOpen) {
      document.body.style.overflow = 'hidden';
    }
    if (!contactIsOpen && !loginIsOpen && !perfilIsOpen) {
      document.body.style.overflow = 'auto';
    }
  }, [contactIsOpen, loginIsOpen, perfilIsOpen]);

  const backgroundImage = screenSize !== 'small'
    ? 'https://firebasestorage.googleapis.com/v0/b/stream-readers-prod.appspot.com/o/backgrounds%2FDesktop.jpg?alt=media&token=f0dff42b-4530-4f6e-b0f2-07297797f5fc' 
    : 'https://firebasestorage.googleapis.com/v0/b/stream-readers-prod.appspot.com/o/backgrounds%2Fsuscr%C3%ADbete-mobile.png?alt=media&token=f0f9d02f-46a0-454d-a6d0-b77f80e9fff4';

  const styles = {
    heroLanding: {
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'cover',
      height: '100vh',
      position: 'relative',
    },
 
  };

  return (
    <div style={styles.heroLanding}>
      <Image 
        src={backgroundImage}
        alt="card__image" 
        layout="fill" 
        objectFit="cover"
        objectPosition="center"
        style={styles.heroImage}
      />
      <Header handleConvertion={handleConvertion} landing />
      <LandingActions handleConvertion={handleConvertion} screenSize={screenSize} rutas={rutas}
        currentRutaIndex={currentRutaIndex}/>
      <Contact isOpen={contactIsOpen} toggle={toggleContact} />
      <LoginModal isOpen={loginIsOpen} toggle={toggleLogin} />
      <Perfil isOpen={perfilIsOpen} toggle={togglePerfil} />
    </div>
  );
}

export default Hero;
