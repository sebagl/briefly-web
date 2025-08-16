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
        setError('This email is already in use. Please log in');
      } else {
        setError('Something went wrong. Please try again');
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
      setError('Something went wrong. Please try again');   
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
				Start your 7-day <br /> free trial!<br /> <span style={{color: '#f49231'}}>UNLIMITED ACCESS</span>

        </div>
      </div>
      <div
        className={`${styles['suscription-container_child']} ${styles['suscription-cont_form']}`}
      >
        {showPlans ? (
          <Plans 
            title="Choose your plan" 
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
            <p style={{fontSize: '16px'}}>Already have an account? {' '}
              <span
                onClick={handleLogin}
                style={{ color: '#f49231', textAlign: 'center', cursor: 'pointer'}}
              >
						Log in
              </span>
            </p>
          </>
        )}
        
      </div>
    </ReactModal>
  );
}

export default Suscription;
