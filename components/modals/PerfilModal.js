import React, { useState } from 'react';
import ReactModal from 'react-modal';
import PerfilForm from '../forms/PerfilForm';
import Image from 'next/image';
import styles from './perfilModal.module.css';
import CancelForm from '../forms/CancelForm';
import useWindowSize from '../../hooks/useWindowSize';
import Button from '../common';

function Perfil(props) {
  const [showPerfil, setshowPerfil] = useState(true);
  const { device } = useWindowSize();

  function handleCancel() {
    setshowPerfil(false);
  }

  function handleClose() {
    props.toggle();
    setshowPerfil(true);
  }

  return (
    <ReactModal
      isOpen={props.isOpen}
      portalClassName={'ReactModalPortal'}
      className={styles['perfil-ReactModal__Content']}
      shouldFocusAfterRender={true}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      parentSelector={() => document.body}
    >
      <Button variant="close" style={{color: device === 'mobile' ? '#fff' : '#043e54'}} onClick={props.toggle}/>
      <div
        className={`${styles['perfil-container_child']} ${styles['perfil-cont_thumbnail']}`}
      >
        <div />

        <h1 className={styles['perfil-form-title']}>Profile</h1>
        <div className={styles['perfil-logo']}>
          <Image
            src="/assets/LogoBriefly.png"
            alt="Briefly logo"
            height={28}
            width={116}
          />
        </div>
      </div>
      <div
        className={`${styles['perfil-container_child']} ${styles['perfil-cont_form']}`}
      >
        {showPerfil ? (
          <PerfilForm handleCancel={handleCancel} />
        ) : (
          <CancelForm onCancel={() => handleClose()} />
        )}
      </div>
    </ReactModal>
  );
}

export default Perfil;
