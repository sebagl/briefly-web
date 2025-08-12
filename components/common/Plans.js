import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import Button from './buttons/Button';
import styles from './common.module.css';

const Plans = ({ title, shouldSubmit, onSubmit, loading, setLoading, selectedPlan }) => {
  const router = useRouter();
  const [plan, setPlan] = useState(selectedPlan || 'Anual');


  useEffect(() => {
    if (selectedPlan) {
      setPlan(selectedPlan);
      handleSubmit(selectedPlan);
    }
  }, [selectedPlan]);

  const checkIcon = 
  <span style={{ marginRight: '8px' }}>
    <Image alt="check icon" src={'/assets/check.png'} className={styles.checkIcon} height={20} width={20} />
  </span>;

  const prices = {
    Mensual: 'USD 2.95',
    Trimestral: 'USD 1.95',
    Anual: 'USD 0.95',
  };

  const priceCodes = {
    Mensual: 'price_1MhdSMKaapf4iiq0OVrASYgc',
    Trimestral: 'price_1O4nxaKaapf4iiq08gu5QgSa',
    Anual: 'price_1O4o46Kaapf4iiq0ish0wEur',
  };

  const handleSubmit = async (submittedPlan = plan) => {
    router.push(`/checkout?price=${priceCodes[submittedPlan]}`);
  };

  const handlePlanChange = (newPlan) => {
    setPlan(newPlan);
  };

  return (
    <div className={styles.planContainer}>
      <h3 style={{margin: '10px'}}>{title}</h3>

      <div className={styles.planSelector}>
        <button onClick={() => handlePlanChange('Mensual')} className={plan === 'Mensual' ? styles.active : ''}>Mensual</button>
        <button onClick={() => handlePlanChange('Trimestral')} className={plan === 'Trimestral' ? styles.active : ''}>Trimestral</button>
        <button onClick={() => handlePlanChange('Anual')} className={plan === 'Anual' ? styles.active : ''}>Anual</button>
      </div>

      <div className={styles.priceDisplay}>
        <span>USD 5.-</span>
        <div>
          {prices[plan]}<span>{' '}/mes</span>
        </div>
      </div>

      <ul className={styles.priceBullets}>
        <li>{checkIcon} Nuevos<span style={{fontWeight: 500}}>audiolibros </span> <span>todos los meses.</span></li>
        <li>{checkIcon} Accede a nuestro contenido <span style={{fontWeight: 500}}>sin limitaciones.</span></li>
        <li>{checkIcon} Amplia <span style={{fontWeight: 500}}>variedad de géneros.</span></li>
        <li>{checkIcon} Sumérgete en una <span style={{fontWeight: 500}}>experiencia auditiva 3D excepcional.</span></li>
        <li>{checkIcon} Acceso <span style={{fontWeight: 500}}>en cualquier lugar{' '}</span><span>con nuestra app móvil.</span></li>
      </ul>
      {
        shouldSubmit && !loading &&
          <Button 
            text={'Comenzar prueba'} 
            onClick={() => handleSubmit()} 
            style={{margin: '10px', fontSize: '13px'}} 
            size="medium" 
            rounded 
            scale
          />
      }
      {loading && <CircularProgress/> }
    </div>
  );
};

export default Plans;
