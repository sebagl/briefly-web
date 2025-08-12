import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context_providers/auth/authContext';
import Button from '../common';
import styles from './home.module.css';

function HomeActions(props) {
  // @ts-ignore
  const { currentUser, stripeRole } = useAuth();

  const setAction = (user, role) =>{
    if(user && role){  
      return(
        <div className={styles.bienvenido}>
          <Link href="/#books">					
            <Button variant="callToAction" size="large" text="Ir al catálogo" scale/>
          </Link>
          
        </div>
      );}

    if(user && !role){  
      return(
        <div className={styles['home-buttons']}>
          <Button variant="callToAction" size="large" text="Completa tu suscripción" scale onClick={() => props.handleConvertion()}/>
        </div>
      );}
    
    return (
      <div className={styles['home-buttons']}>
        <Button variant="callToAction" size="large" text="Suscríbete" scale onClick={() => props.handleConvertion()}/>
      </div>
    );
  };

  return (
    <div className={styles.heroText}>
      <h1>Audiolibros</h1>
      <h2>
				Los libros cobran vida a
				través del sonido
      </h2>
      <p>
				Audiolibros con música original <br/>y sonido 3D
      </p>

      {setAction(currentUser, stripeRole)}
    </div>
  );
}

export default HomeActions;
