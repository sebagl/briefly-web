// @ts-nocheck
import React, { useRef, useState } from 'react';
import AutoresContactSection from '../../components/autores/AutoresContactSection';
import AutoresHero from '../../components/autores/AutoresHero';
import AutoresGrid from '../../components/autores/AutoresGrid';
import TextAutores from '../../components/autores/TextAutores';
import AudioSection from '../../components/autores/AudioSection';
import Pricing from '../../components/autores/Pricing';
import Footer from '../../components/common/Footer';

function Autores() {
  const contactSectionRef = useRef();
  const pricingSectionRef = useRef();
  const [message, setMessage] = useState('');

  const messageHandler = (mes) => {
    setMessage(mes);
  };

  function handleScroll() {
    window.scrollTo(0, contactSectionRef.current.offsetTop - 55);
  }

  function handleScrollPricing() {
    window.scrollTo(0, pricingSectionRef.current.offsetTop - 55);
  }
  return (
    <div className="autores-page">
      <AutoresHero
        handleScroll={handleScroll}
        handleScrollPricing={handleScrollPricing}
      />
      <AutoresGrid />
      <TextAutores />
      <AudioSection />
      <div ref={pricingSectionRef}></div>
      {/* <Pricing handleScroll={handleScroll} messageHandler={messageHandler} /> */}
      <div ref={contactSectionRef}></div>
      <AutoresContactSection message={message} />

      <Footer />
    </div>
  );
}

export default Autores;
