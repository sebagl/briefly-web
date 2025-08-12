import React, { useEffect, useState } from 'react';
import Button from '../common';

function LandingActions({ handleConvertion, screenSize, rutas = [], currentRutaIndex }) {
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = `
      @keyframes slideCategory {
        0% {
          transform: translateY(100%);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
    `;
    document.head.appendChild(styleSheet);

    return () => {
      document.head.removeChild(styleSheet);
    };
  }, []);

  useEffect(() => {
    if (rutas.length > 0 && !selectedCategory) {
      setSelectedCategory(rutas[0]?.title);
    }
  }, [rutas]);

  const currentCategory = rutas[currentRutaIndex];

  const styles = {
    container: {
      position: 'absolute',
      top: screenSize === 'small' ? '75%' : '25%',
      left: screenSize === 'small' ? '50%' : '30%',
      transform: screenSize === 'small' ? 'translate(-50%, -50%)' : 'translateX(-50%)',
      width: '80%',
      maxWidth: '600px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      fontFamily: 'Poppins, sans-serif',
    },
    discount: {
      fontSize: screenSize === 'small' ? '40px' : screenSize === 'medium' ? '40px' : '120px',
      lineHeight: screenSize === 'small' ? '50px' : screenSize === 'medium' ? '50px' : '130px',
      background: 'linear-gradient(to right, #F69333, #FCCE18)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      margin: '0',
      padding: '0',
    },
    de: {
      color: '#FFFFFF',
      display: 'block',
      fontSize: screenSize === 'small' ? '30px' : screenSize === 'medium' ? '25px' : '60px',
      lineHeight: screenSize === 'small' ? '30px' : screenSize === 'medium' ? '25px' : '60px',
      fontWeight: 500,
      padding: '0',
    },
    descuento: {
      background: 'linear-gradient(to right, #F69333, #FCCE18)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      display: 'inline',
      fontSize: screenSize === 'small' ? '30px' : screenSize === 'medium' ? '25px' : '30px',
      lineHeight: screenSize === 'small' ? '30px' : screenSize === 'medium' ? '25px' : '30px',
      fontWeight: 500,
      padding: '0',
    },
    planAnual: {
      color: '#FFFFFF',
      fontSize: screenSize === 'small' ? '22px' : screenSize === 'medium' ? '25px' : '30px',
      lineHeight: screenSize === 'small' ? '26px' : screenSize === 'medium' ? '25px' : '30px',
      fontWeight: 400,
      margin: '0',
      padding: '0',
    },
    description: {
      color: '#FFFFFF',
      fontSize: screenSize === 'small' ? '16px' : screenSize === 'medium' ? '20px' : '24px',
      lineHeight: screenSize === 'small' ? '16px' : screenSize === 'medium' ? '20px' : '24px',
      fontWeight: 400,
      margin: '10px 0',
      padding: '0',
    },
    price: {
      color: '#FFFFFF',
      fontSize: screenSize === 'small' ? '16px' : screenSize === 'medium' ? '18px' : '24px',
      lineHeight: screenSize === 'small' ? '16px' : screenSize === 'medium' ? '18px' : '24px',
      fontWeight: 700,
      margin: '0 0 20px 0',
      padding: '0',
    },
    button: {
      borderRadius: '30px',
      height: '60px',
      width: '250px',
      fontWeight: 'bold',
    },
    categoryWrapper: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '10px',
      marginTop: '5px',
    },
    categoryContainer: {
      height: screenSize === 'small' ? '30px' : '60px',
      minWidth: '300px',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
    },
    categoryText: {
      position: 'absolute',
      animationName: 'slideCategory',
      animationDuration: '1s',
      animationTimingFunction: 'ease-out',
      width: '100%',
      textAlign: 'center',
      whiteSpace: 'nowrap',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.discount}>BEST SELLERS</h2>
      <h4 style={styles.planAnual}>Resumidos en AUDIOLIBROS</h4>
      <div style={styles.categoryWrapper}>
       
        <div style={styles.categoryContainer}>
          {rutas.length > 0 ? (
            <div 
              key={currentRutaIndex} 
              style={{
                ...styles.categoryText,
                ...styles.descuento,
              }}
            >
              {currentCategory?.title}
            </div>
          ) : (
            <div 
              style={{
                ...styles.categoryText,
                ...styles.descuento,
              }}
            >
              Cargando...
            </div>
          )}
        </div>
      </div>
      
      <p style={styles.description}>Accede a contenido exclusivo e ilimitado</p>
      <p style={styles.price}>con la prueba gratuita de 7 días</p>
      <Button 
        text="Comenzar prueba" 
        variant="callToAction" 
        size="large" 
        onClick={() => handleConvertion()} 
        scale
        style={styles.button}
      />
    </div>
  );
}

export default LandingActions;
