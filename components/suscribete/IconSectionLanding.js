// @ts-nocheck
import React from 'react';
import IconCardSmall from './IconCardSmall';
import { RocketLaunchIcon, MapIcon, CalendarDaysIcon, AdjustmentsVerticalIcon, SpeakerWaveIcon, SparklesIcon, FaceSmileIcon, ForwardIcon } from '@heroicons/react/24/outline';
import Button from '../common';

function IconSectionLanding({ screenSize, handleConvertion }) {
  const icons = [
    {
      icon: RocketLaunchIcon,
      alt: 'Unlimited content',
      text: 'Unlimited content'
    },
    {
      icon: MapIcon,
      alt: 'Learning paths',
      text: 'Learning paths'
    },
    {
      icon: CalendarDaysIcon,
      alt: 'New audiobooks',
      text: 'New audiobooks every month'
    },
    {
      icon: AdjustmentsVerticalIcon,
      alt: 'Speed control',
      text: 'Playback speed control'
    },
    {
      icon: SpeakerWaveIcon,
      alt: '3D sound',
      text: 'Immersive audio'
    },
    {
      icon: SparklesIcon,
      alt: 'Summaries',
      text: 'Access to summaries'
    },
    {
      icon: FaceSmileIcon,
      alt: 'Genre variety',
      text: 'Wide variety of genres'
    },
    {
      icon: ForwardIcon,
      alt: 'Skip controls',
      text: 'Forward and rewind audio'
    },
  ];

  const styles = {
    iconSectionLanding: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      textAlign: 'center',
      alignItems: 'center',
      minHeight: '75%',
      marginTop: '20px',
      marginBottom: '80px',
    },
    h2: {
      fontSize: screenSize === 'small' ? '1.5rem' : screenSize === 'medium' ? '1.8rem' : '40px',
      color: '#FFF',
      alignItems: 'center',
      margin: '10px',
      maxWidth: screenSize !== 'large' ? '80%' : 'none',
      fontWeight: 'bold',
    },
    h3: {
      fontSize: screenSize === 'small' ? '1.2rem' : screenSize === 'medium' ? '1.5rem' : '25px',
      color: '#FFF',
      alignItems: 'center',
      margin: '10px',
    },
    iconContainer: {
      display: 'grid',
      width: 'auto',
      marginTop: '20px',
      gridTemplateColumns: screenSize === 'large' ? '1fr 1fr 1fr' : '1fr 1fr',
      gridTemplateRows: '1fr 1fr',
      columnGap: '20px',
      rowGap: '20px',
    },
    buttonContainer: {
      marginTop: '40px',
    },
  };

  return (
    <section style={styles.iconSectionLanding}>
      <h2 style={styles.h2}>What’s included in your membership?</h2>
      <h3 style={styles.h3}>Unlock all these premium features to elevate your listening experience.</h3>
      <div style={styles.iconContainer}>
        {icons.map((item, index) => (
          <IconCardSmall
            key={index}
            Icon={item.icon}
            alt={item.alt}
            text={item.text}
            screenSize={screenSize}
          />
        ))}
      </div>
      <div style={styles.buttonContainer}>
        <Button 
          text="Start 7-day free trial" 
          variant="callToAction" 
          size="medium" 
          onClick={handleConvertion} 
          scale
          style={{
            margin: '20px auto 0',
            display: 'block',
            borderRadius: '50px',
            width: '300px',
          }}
        />
      </div>
    </section>
  );
}

export default IconSectionLanding;
