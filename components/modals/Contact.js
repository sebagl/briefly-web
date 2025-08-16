import React from 'react';
import ReactModal from 'react-modal';
import ContactForm from '../forms/ContactForm';
import styles from './contactModal.module.css';
import Image from 'next/image';

function Contact(props) {
  return (
    <ReactModal
      isOpen={props.isOpen}
      style={{ overlay: {}, content: {} }}
      portalClassName={'ReactModalPortal'}
      className={styles['contact-ReactModal__Content']}
      shouldFocusAfterRender={true}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      parentSelector={
        () => document.body
      }
    >
      <div
        className={`${styles['contact-container_child']} ${styles['contact-cont_thumbnail']}`}
      >
        <button className={styles['contact-close-btn']} onClick={props.toggle}>
					X
        </button>

        <h1 className={styles['contact-form-title']}>Send us a message</h1>
        <div className={styles['contact-logo']}>
          <Image
            src="/assets/LogoBriefly.png"
            alt="Briefly logo"
            width={150}
            height={100}
            style={{ width: '100px', height: 'auto' }}
          />
        </div>
      </div>
      <div
        className={`${styles['contact-container_child']} ${styles['contact-cont_form']}`}
      >
        <ContactForm />
      </div>
    </ReactModal>
  );
}

export default Contact;
