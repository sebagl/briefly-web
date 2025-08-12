import React from 'react';
import ContactForm from '../forms/ContactForm';
import styles from './common.module.css';
import Image from 'next/image';

function FormSection() {
  const backgroundImage = 'https://firebasestorage.googleapis.com/v0/b/stream-readers-prod.appspot.com/o/backgrounds%2FBanner%20formulario.jpg?alt=media&token=096ec16f-2ab3-4b3c-ab29-9b11c4a562aa';
  return (
    <section className={styles.contactSection}>
      <Image 
        src={backgroundImage} 
        alt="card__image" 
        layout="fill" 
        objectFit="cover"
        objetposition="center"
        className={styles.imagePosition}
      />
      <div className={styles.textContainer}>
        <p className={styles.formSectionTitle}>¿Tienes dudas o necesitas ayuda?</p>
        <p className={styles.formSectionText}>Envíanos un mensaje y te contáctaremos lo más pronto posible</p>
      </div>			
      <div className={styles.containerForm}>
        <h3 className={styles.formTitle}>Contáctanos</h3>
        <ContactForm />
      </div>
    </section>
  );
}

export default FormSection;
