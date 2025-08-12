import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { HeadphonesIcon, HeartIcon, BoltIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import AppDownloadButtons from '../common/buttons/AppDownloadButtons';

const FeatureText = ({ children, Icon, delay }) => {
  const featureRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateX(0)';
          }, delay);
        }
      },
      { threshold: 0.1 }
    );

    if (featureRef.current) {
      observer.observe(featureRef.current);
    }

    return () => {
      if (featureRef.current) {
        observer.unobserve(featureRef.current);
      }
    };
  }, [delay]);

  const styles = {
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: 'rgba(34, 65, 79, 0.75)',
      padding: '8px',
      borderRadius: '6px',
      opacity: 0,
      transform: 'translateX(50px)',
      transition: 'opacity 1s ease-out, transform 1s ease-out',
    },
    icon: {
      height: '20px',
      width: '20px',
      marginLeft: '8px',
      color: 'white',
    },
    text: {
      color: 'white',
      fontSize: '10px',
      margin: 0,
    },
  };

  return (
    <div ref={featureRef} style={styles.container}>
      <p style={styles.text}>{children}</p>
      {Icon && <Icon style={styles.icon} />}
    </div>
  );
};

const Beneficios = () => {
  const styles = {
    container: {
      position: 'relative',
      paddingTop: '48px',
      paddingBottom: '48px',
      paddingLeft: '16px',
      paddingRight: '16px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflowX: 'hidden', 
    },
    title: {
      color: 'white',
      fontSize: '1.5rem',
      textAlign: 'center',
      marginBottom: '32px',
    },
    imageContainer: {
      position: 'relative',
      width: '100%', // Use responsive width
      maxWidth: '224px', // Limit max width
      height: 'auto', // Maintain aspect ratio
      margin: '0 auto',
    },
    image: {
      objectFit: 'contain',
      width: '100%', // Ensure image is responsive
      height: 'auto',
    },
    featureTopLeft: {
      position: 'absolute',
      top: '10%',
      left: '-25%',
      width: '50%',
    },
    featureBottomLeft: {
      position: 'absolute',
      bottom: '30%',
      left: '-25%',
      width: '50%',
    },
    featureTopRight: {
      position: 'absolute',
      top: '30%',
      right: '-25%',
      width: '50%',
    },
    featureBottomRight: {
      position: 'absolute',
      bottom: '10%',
      right: '-25%',
      width: '50%',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>
        ¿Por qué elegir Stream Readers App?
      </h2>
      <div style={styles.imageContainer}>
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/stream-readers-prod.appspot.com/o/img%2Fsr_app.png?alt=media&token=86a7d4b9-7612-4c9f-a7c1-d3d644965ac9"
          alt="Stream Readers App"
          width={250}
          height={500}
          style={styles.image}
        />
        <div style={styles.featureTopLeft}>
          <FeatureText Icon={HeadphonesIcon} delay={0}>
            Lleva tus audiolibros favoritos contigo y escúchalos donde quieras, sin interrupciones.
          </FeatureText>
        </div>
        <div style={styles.featureBottomLeft}>
          <FeatureText Icon={HeartIcon} delay={200}>
            Sumérgete en audiolibros 3D que te transportan al corazón de la historia.
          </FeatureText>
        </div>
        <div style={styles.featureTopRight}>
          <FeatureText Icon={BoltIcon} delay={400}>
            Disfruta de resúmenes rápidos, perfectos para cuando tienes poco tiempo.
          </FeatureText>
        </div>
        <div style={styles.featureBottomRight}>
          <FeatureText Icon={ArrowTrendingUpIcon} delay={600}>
          Desarrolla nuevas habilidades y crece a tu ritmo con nuestras rutas de aprendizaje.
          </FeatureText>
        </div>
      </div>
      <AppDownloadButtons />
    </div>
  );
};

export default Beneficios;
