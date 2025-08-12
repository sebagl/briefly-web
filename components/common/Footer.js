// @ts-nocheck
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './common.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <Link href="/">
        <a>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/stream-readers-prod.appspot.com/o/img%2Flogo.png?alt=media&token=078e0fb8-76c4-425a-ac95-532a6ee1fcaa"
            alt="logo"
            width={175}
            height={45}
          />
        </a>
      </Link>
      <div className={styles.copyContainer}>
        <p className={styles.copyright}>{`Stream Readers©  Todos los derechos reservados ${new Date().getFullYear()}`}</p>
      </div>
      <div className={styles.social}>
				
        <a
          href="https://www.instagram.com/streamreaders/"
          className={styles.socialIcons}
        >
          <Image
            src="/assets/icons/instagram.svg"
            alt="instagram"
            height={75}
            width={75}
          />
        </a>
        <a
          href="https://www.facebook.com/Streamreaders/"
          className={styles.socialIcons}
        >
          <Image
            src="/assets/icons/facebook.svg"
            alt="facebook"
            height={75}
            width={75}
          />
        </a>
        <a href="mailto:contacto@streamreaders.com" className={styles.socialIcons}>
          <Image
            src="/assets/icons/mail.svg"
            alt="email"
            height={75}
            width={75}
          />
        </a>
      </div>
		
    </footer>
  );
}

export default Footer;
