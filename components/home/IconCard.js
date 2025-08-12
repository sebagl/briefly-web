import React from 'react';
import Image from 'next/image';
import styles from './home.module.css';


function IconCard({ src, alt, text }) {
  return (
    <div className={styles['icon-card']}>
      <div className={styles['icon-cont']}>
        <Image height={122} width={130} src={src} alt={alt} />
      </div>
      <p>{text}</p>
    </div>
  );
}

export default IconCard;
