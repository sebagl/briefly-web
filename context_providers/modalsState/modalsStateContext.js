import React, { useState, useContext } from 'react';

const ModalsContext = React.createContext({});

export function useModalsContext() {
  return useContext(ModalsContext);
}

export function ModalsStateProvider({ children }) {
  const [contactIsOpen, setContactIsOpen] = useState(false);
  const [loginIsOpen, setLoginIsOpen] = useState(false);
  const [suscriptionIsOpen, setSuscriptionIsOpen] = useState(false);
  const [perfilIsOpen, setPerfilIsOpen] = useState(false);
  const [termsIsOpen, setTermsIsOpen] = useState(false); 
  const [privacyIsOpen, setPrivacyIsOpen] = useState(false);

  function toggleContact() {
    setContactIsOpen((prevState) => !prevState);
  }
  function toggleLogin() {
    setLoginIsOpen((prevState) => !prevState);
  }
  function toggleSuscription() {
    setSuscriptionIsOpen((prevState) => !prevState);
  }
  function togglePerfil() {
    setPerfilIsOpen((prevState) => !prevState);
  }

  function toggleTerms() { 
    setTermsIsOpen((prevState) => !prevState);
  }
  function togglePrivacy() { 
    setPrivacyIsOpen((prevState) => !prevState);
  }

  const value = {
    contactIsOpen,
    loginIsOpen,
    perfilIsOpen,
    termsIsOpen, 
    privacyIsOpen, 
    suscriptionIsOpen,
    toggleContact,
    toggleLogin,
    togglePerfil,
    toggleTerms, 
    togglePrivacy,
    toggleSuscription
  };

  return (
    <ModalsContext.Provider value={value}>{children}</ModalsContext.Provider>
  );
}
