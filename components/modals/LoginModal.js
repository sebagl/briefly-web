import React, { useState, Fragment, useEffect } from 'react';
import ReactModal from 'react-modal';
import LoginForm from '../forms/LoginForm';
import ForgotForm from '../forms/ForgotForm';
import { useAuth } from '../../context_providers/auth/authContext';
import Image from 'next/image';
import styles from './loginModal.module.css';
import useWindowSize from '../../hooks/useWindowSize';
import Button from '../common';

function Login(props) {
  const [showLoginForm, setshowLoginForm] = useState(true);
  const { device } = useWindowSize();
  // @ts-ignore
  const { isAuthenticated } = useAuth();

  function showForgotForm() {
    setshowLoginForm(false);
  }

  function showBackLoginForm() {
    setshowLoginForm(true);
  }

  function handleClose() {
    if (props.isOpen) {
      props.toggle();
      setshowLoginForm(true);
    }
  }

  useEffect(() => {
    if (isAuthenticated) {
      handleClose();
    }
  }, [isAuthenticated]);

  return (
    <ReactModal
      isOpen={props.isOpen}
      portalClassName={'ReactModalPortal'}
      className={styles['login-ReactModal__Content']}
      shouldFocusAfterRender={true}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      parentSelector={() => document.body}
    >
      <Button variant="close" style={{color: device === 'mobile' ? '#fff' : '#043e54'}} onClick={props.toggle}/>
      <div
        className={`${styles['login-container_child']} ${styles['login-cont_thumbnail']}`}
      >
        <div />
		
        <div className={styles['login-logo']}>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/stream-readers-prod.appspot.com/o/img%2Flogo.png?alt=media&token=078e0fb8-76c4-425a-ac95-532a6ee1fcaa"
            alt="logo"
            height={28}
            width={116}
          />
        </div>
      </div>
      <div
        className={`${styles['login-container_child']} ${styles['login-cont_form']}`}
      >
        {showLoginForm ? (
          <Fragment>
            <h2>Inicia Sesión</h2>
            <LoginForm />
            <button
              className={styles['login-forgotBtn']}
              onClick={showForgotForm}
            >
							¿Olvidaste tu contraseña?
            </button>
          </Fragment>
        ) : (
          <ForgotForm showLogin={showBackLoginForm} />
        )}
      </div>
    </ReactModal>
  );
}

export default Login;
