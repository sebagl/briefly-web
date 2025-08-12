// @ts-nocheck
import React from 'react';
import IconCardSmall from './IconCardSmall';
import { RocketLaunchIcon, MapIcon, CalendarDaysIcon, AdjustmentsVerticalIcon, SpeakerWaveIcon, SparklesIcon, FaceSmileIcon, ForwardIcon } from '@heroicons/react/24/outline';
import Button from '../common';

function IconSectionLanding({ screenSize, handleConvertion }) {
  const icons = [
    {
      icon: RocketLaunchIcon,
      alt: 'Contenido ilimitado',
      text: 'Contenido ilimitado'
    },
    {
      icon: MapIcon,
      alt: 'Rutas de aprendizaje',
      text: 'Rutas de aprendizaje'
    },
    {
      icon: CalendarDaysIcon,
      alt: 'Nuevos audiolibros',
      text: 'Nuevos audiolibros cada mes'
    },
    {
      icon: AdjustmentsVerticalIcon,
      alt: 'Control de velocidad',
      text: 'Control de velocidad de reproducción'
    },
    {
      icon: SpeakerWaveIcon,
      alt: 'Sonido 3D',
      text: 'Acceso a audiolibros con sonido 3D'
    },
    {
      icon: SparklesIcon,
      alt: 'Resúmenes',
      text: 'Acceso a resúmenes'
    },
    {
      icon: FaceSmileIcon,
      alt: 'Variedad de géneros',
      text: 'Amplia variedad de géneros'
    },
    {
      icon: ForwardIcon,
      alt: 'Avanzar y retroceder',
      text: 'Avanzar y retroceder en la pista de audio'
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
      <h2 style={styles.h2}>¿Qué incluye tu suscripción?</h2>
      <h3 style={styles.h3}>Al suscribirte, tendrás acceso a todos estos beneficios exclusivos que harán tu experiencia auditiva inigualable.</h3>
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
          text="Prueba 7 días gratis" 
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
