// @ts-nocheck
import React from 'react';
import IconCard from './IconCard';
import styles from './home.module.css';

function IconSection() {
  return (
    <section className={styles['icon-section']}>
      <h2>¿POR QUÉ STREAM READERS?</h2>
      <div className={styles['icon-container']}>
        <IconCard
          src="https://firebasestorage.googleapis.com/v0/b/stream-readers-prod.appspot.com/o/img%2FICONO%20LEER.png?alt=media&token=a4cdd810-d780-49c3-a39c-c8382ec3e5ff"
          alt="leer"
          text="¿Te has imaginado alguna vez escuchando un libro? Entra en el mundo de la literatura de una forma diferente."
        />
        <IconCard
          src="https://firebasestorage.googleapis.com/v0/b/stream-readers-prod.appspot.com/o/img%2Ficono%20auris.png?alt=media&token=8e2dd983-143d-41c7-be3a-141781059de6"
          alt="auris"
          text="Prepárate para experimentar a través de distintos efectos de sonido, la sensación de estar vivenciando grandes obras literarias."
        />
        <IconCard
          src="https://firebasestorage.googleapis.com/v0/b/stream-readers-prod.appspot.com/o/img%2FIcono%20Play.png?alt=media&token=5117a641-61a0-4cfb-96d8-8b3387fcd0eb"
          alt="play"
          text="La música y la ambientación harán de la experiencia algo mucho más enriquecedor. Vive la experiencia Stream Readers."
        />
      </div>
    </section>
  );
}

export default IconSection;
