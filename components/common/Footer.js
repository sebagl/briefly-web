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
            src="/assets/LogoBriefly.png"
            alt="Briefly logo"
            width={150}
            height={100}
            style={{ width: '140px', height: 'auto' }}
          />
        </a>
      </Link>
      <div className={styles.copyContainer}>
        <p className={styles.copyright}>{`Briefly Books© All rights reserved ${new Date().getFullYear()}`}</p>
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
