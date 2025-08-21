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
      paddingTop: '30px',
      paddingBottom: '30px',
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
      marginBottom: '20px',
      fontWeight: '500',
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
          Why choose Briefly Books?
      </h2>
      <div style={styles.imageContainer}>
        <Image
          src="/assets/iphone-app.png"
          alt="Briefly App"
          width={250}
          height={500}
          style={styles.image}
        />
        <div style={styles.featureTopLeft}>
          <FeatureText Icon={HeadphonesIcon} delay={0}>
            Take your favorite audiobooks with you and listen anywhere, without interruptions.
          </FeatureText>
        </div>
        <div style={styles.featureBottomLeft}>
          <FeatureText Icon={HeartIcon} delay={200}>
            Immerse yourself in audiobooks that place you at the heart of every story.
          </FeatureText>
        </div>
        <div style={styles.featureTopRight}>
          <FeatureText Icon={BoltIcon} delay={400}>
            Enjoy quick summaries, perfect for when you’re short on time.
          </FeatureText>
        </div>
        <div style={styles.featureBottomRight}>
          <FeatureText Icon={ArrowTrendingUpIcon} delay={600}>
          Build new skills and grow at your pace with curated learning paths.
          </FeatureText>
        </div>
      </div>
      <AppDownloadButtons />
    </div>
  );
};

export default Beneficios;
