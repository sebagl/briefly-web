// @ts-nocheck
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Header from '../common/Header';
import HomeActions from './HomeActions';
import Contact from '../modals/Contact';
import LoginModal from '../modals/LoginModal';
import Perfil from '../modals/PerfilModal';
import styles from './home.module.css';
import { useModalsContext } from '../../context_providers/modalsState/modalsStateContext';


const HeroHome = (props) =>{
  const {
    contactIsOpen,
    loginIsOpen,
    perfilIsOpen,
    toggleLogin,
    toggleContact,
    togglePerfil,
  } = useModalsContext();

  // Disable scroll when modal is diplayed
  useEffect(() => {
    if (contactIsOpen || loginIsOpen || perfilIsOpen) {
      document.body.style.overflow = 'hidden';
    }
    if (!contactIsOpen && !loginIsOpen && !perfilIsOpen) {
      document.body.style.overflow = 'auto';
    }
  }, [contactIsOpen, loginIsOpen, perfilIsOpen]);

  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const backgroundImage = windowWidth >= 500 
    ? 'https://firebasestorage.googleapis.com/v0/b/stream-readers-prod.appspot.com/o/backgrounds%2FDesktop-1.jpg?alt=media&token=6b62ae8a-d6f3-4c64-95b5-63ec3f38c194' 
    : 'https://firebasestorage.googleapis.com/v0/b/stream-readers-prod.appspot.com/o/backgrounds%2Fhome-hero-mobile.png?alt=media&token=8d3dec1d-913f-4048-926c-7b2b228291d7';


  return (
    <div className={styles.hero}>
      <Image 
        src={backgroundImage} 
        alt="card__image" 
        layout="fill" 
        objectFit="cover"
        objetposition="center"
        className={styles.heroImage}
      />
      <Header handleConvertion={props.handleConvertion}/>
      <HomeActions toggleLogin={toggleLogin} handleConvertion={props.handleConvertion}/>

      <Contact isOpen={contactIsOpen} toggle={toggleContact} />
      <LoginModal isOpen={loginIsOpen} toggle={toggleLogin} />
      <Perfil isOpen={perfilIsOpen} toggle={togglePerfil} />
    </div>
  );
};

export default HeroHome;
