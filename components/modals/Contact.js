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

        <h1 className={styles['contact-form-title']}>Envíanos un mensaje</h1>
        <div className={styles['contact-logo']}>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/stream-readers-prod.appspot.com/o/img%2Flogo.png?alt=media&token=078e0fb8-76c4-425a-ac95-532a6ee1fcaa"
            alt="logo"
            height={28}
            width={116}
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
