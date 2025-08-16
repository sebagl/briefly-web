import React from 'react';
import ReactModal from 'react-modal';
import Link from 'next/link';
import { useAuth } from '../../context_providers/auth/authContext';
import Image from 'next/image';
import styles from './freeEndedModal.module.css';
import Button from '../common';
import AppDownloadButtons from '../common/buttons/AppDownloadButtons';

function FreeEnded(props) {
  // @ts-ignore
  const { currentUser } = useAuth();

  return (
    <ReactModal
      isOpen={props.isOpen}
      portalClassName={'ReactModalPortal'}
      className={styles['freeEnded-ReactModal__Content']}
      shouldFocusAfterRender={true}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      parentSelector={() => document.body}
    >
      <div
        className={`${styles['freeEnded-container_child']} ${styles['freeEnded-cont_thumbnail']}`}
      >
        <div className="freeEnded-logo" style={{marginLeft: '15px'}}>
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
        className={`${styles['freeEnded-container_child']} ${styles['freeEnded-cont_form']}`}
      >
        {!currentUser && (
          <>
            <h1 className={styles['freeEnded-form-title']}>
              Para escuchar nuestro contenido de forma gratuita descarga nuesta app en tu dispositivo móvil
            </h1>
            <AppDownloadButtons />
            <h1 className={styles['freeEnded-form-title']}>
              O suscríbete a Stream Readers para seguir esuchando este y muchos
              audiolibros más por un precio increíble
            </h1>
          </>
        )}
        {currentUser && (
          <h1 className={styles['freeEnded-form-title']}>
						Completa el pago para seguir esuchando este y muchos audiolibros más
						por un precio increíble
          </h1>
        )}
        <Link href="/suscribete" className={styles.link}>
          <Button text="Prueba gratuita" size="small" rounded scale/>
        </Link>
      </div>
    </ReactModal>
  );
}

export default FreeEnded;
