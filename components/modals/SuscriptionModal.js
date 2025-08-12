import React, { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import RegistrationForm from '../forms/RegistrationForm';
import styles from './suscriptionModal.module.css';
import { useModalsContext } from '../../context_providers/modalsState/modalsStateContext';
import Button from '../common';
import useWindowSize from '../../hooks/useWindowSize';
import { useAuth } from '../../context_providers';
import Plans from '../common/Plans';
import { getAnalytics, logEvent } from 'firebase/analytics';


function Suscription(props) {
  const { currentUser } = useAuth();
  const { signup, googleSignin } = useAuth();
  
  const analytics = getAnalytics();
  // @ts-ignore
  const { toggleLogin, toggleSuscription } = useModalsContext();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
  });


  async function handleSubmit(values) {
    try {
      setError('');
      setLoading(true);
      // Log the subscription event
      logEvent(analytics, 'subscribe', {
        platform: 'web'
      });
      await signup(formValues.email, formValues.password, formValues.name);
      
      
    } catch (error) {
      
      setShowPlans(false);
      if (error.code === 'auth/email-already-in-use') {
        setError('Este correo ya está en uso. Inicia Sesión');
      } else {
        setError('Ha ocurrido un error, inténtalo nuevamente');
        console.error(error);
      }
    }
  
    setLoading(false);
  }

  async function handleGoogleSignin() {
    try {
      setError('');
      setLoading(true);
      // Log the subscription event
      logEvent(analytics, 'subscribe', {
        platform: 'web'
      });
      await googleSignin();

    } catch (error) {
      setError('Ha ocurrido un error, inténtalo nuevamente');   
    }
  
    setLoading(false);
  }

  const { device } = useWindowSize();

  const handleLogin = () => {
    toggleLogin();
    props.toggle();
  };

  const handleClose = () => {
    if (props.isOpen) {
      toggleSuscription();
    }
    if (props.onClose) props.onClose();
  };

  useEffect(() => {
    if(currentUser){
      setShowPlans(true);
    } else {
      setShowPlans(false);
    }
    // return () => {
    //   handleClose();
      
    // };
  }, [currentUser]);

  // If the modal is opened from the plans in LP, show the registration form first
  // useEffect(() => {
  //   if (props.fromLP && !currentUser) {
  //     setShowPlans(false);
  //   } else if (!props.fromLP && !currentUser) {
  //     setShowPlans(false);
  //   } else {
  //     setShowPlans(true);
  //   }
  // }, [props.fromLP, currentUser]);
  
  return (
    <ReactModal
      isOpen={props.isOpen}
      portalClassName={'ReactModalPortal'}
      className={styles['suscription-ReactModal__Content']}
      shouldFocusAfterRender={true}
      shouldCloseOnOverlayClick={true}
      shouldCloseOnEsc={true}
      parentSelector={() => document.body}
      overlayClassName={styles['suscription-ReactModal__Overlay']}
    
    >
      <Button variant="close" style={{color: device === 'mobile' ? '#fff' : '#043e54'}} onClick={handleClose}/>

      <div
        className={`${styles['suscription-container_child']} ${styles['suscription-cont_thumbnail']}`}
      >
        <div/>
					
        <div className={styles['suscription-form-title']}>
				¡Prueba 7 días gratis!<br /> Acceso <br /><span style={{color: '#f49231'}}>ILIMITADO</span>

        </div>
      </div>
      <div
        className={`${styles['suscription-container_child']} ${styles['suscription-cont_form']}`}
      >
        {showPlans ? (
          <Plans 
            title="Elije tu Plan" 
            shouldSubmit 
            loading={loading} 
            setLoading={setLoading}
            selectedPlan={props.selectedPlan}
          />
        ) : (
          <>
            <RegistrationForm 
              error={error} 
              loading={loading} 
              setFormValues={setFormValues} 
              onSubmit={handleSubmit}
            />
            <p style={{fontSize: '16px'}}>Ya tienes cuenta? {' '}
              <span
                onClick={handleLogin}
                style={{ color: '#f49231', textAlign: 'center', cursor: 'pointer'}}
              >
                Inicia Sesión
              </span>
            </p>
          </>
        )}
        
      </div>
    </ReactModal>
  );
}

export default Suscription;
