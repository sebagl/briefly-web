import React, { useState, useEffect } from 'react';
import styles from '../home/home.module.css';
import Button from './buttons/Button';
import { useAuth } from '../../context_providers/auth/authContext';
import Link from 'next/link';
import Image from 'next/image';

function TextSection(props) {
  // @ts-ignore
  const { currentUser } = useAuth();

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

  const backgroundImage = windowWidth >= 1000 
    ? 'https://firebasestorage.googleapis.com/v0/b/stream-readers-prod.appspot.com/o/backgrounds%2FBanners.png?alt=media&token=d4f91ce5-10cc-49a6-8322-01bcf4fd3b7d' 
    : 'https://firebasestorage.googleapis.com/v0/b/stream-readers-prod.appspot.com/o/backgrounds%2FBannersmobile.png?alt=media&token=20c7a609-96c0-46a7-a0ee-35525718f2de';

  return (
    <section className={styles.banner}>
      <Image 
        src={backgroundImage} 
        alt="card__image" 
        layout="fill" 
        objectFit="cover"
        objetposition="center"
        className={styles.imagePosition}
      />
      <div className={styles.textSection}>
        <p>
				Conecta tus auriculares y descubre la experiencia{' '}
				
          <span className={styles.orange}>
					de escuchar un buen libro con sonido original y 3D
          </span>
        </p>
        {currentUser ? (
					
          <Link href="/#books">					
            <Button variant="callToAction" text="Audiolibros" scale/>
          </Link>
						
					
        ) : (
          <div style={{display: 'flex', flexDirection: 'column'}}>
            <Button size="large" text="Suscribete" onClick={() => props.handleConvertion()}/>
            {/* <Link href={'/#books'}>
              <p style={{color: '#f49231', cursor: 'pointer', textAlign: 'center'}}>Ver Catálogo</p>
            </Link> */}
          </div>
        )}			
      </div>
			
    </section>
  );
}

export default TextSection;
