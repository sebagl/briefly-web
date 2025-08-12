import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { CircularProgress } from '@mui/material';
import Button from '../common';

const Plans = ({ title, subtitle, shouldSubmit, onSubmit, loading, setLoading, handlePlanSelection, selectedPlan, handleConvertion }) => {
  const router = useRouter();
  const [plan, setPlan] = useState(selectedPlan || 'Anual');

  const checkIcon = 
    <span style={{ marginRight: '8px' }}>
      <Image alt="check icon" src={'/assets/check.png'} height={20} width={20} />
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

  const discounts = {
    Mensual: '45%',
    Trimestral: '66%',
    Anual: '77%',
  };

  const handleSubmit = async () => {
    if (handlePlanSelection) {
      handlePlanSelection(plan);
    }
    if (handleConvertion) {
      handleConvertion();
    }
  };

  const handlePlanChange = (newPlan) => {
    setPlan(newPlan);
  };

  const styles = {
    planContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 0,
      boxSizing: 'border-box',
      width: '100%',
    },
    title: {
      margin: '12px',
      color: '#FFFFFF',
      fontWeight: 'bold',
      fontSize: '1.5em',
    },
    subtitle: {
      margin: '0 0 10px 0',
      color: '#FFFFFF',
      fontWeight: 'normal',
      fontSize: '1.1em',
      textAlign: 'center',
    },
    contentWrapper: {
      padding: '20px',
      marginTop: '10px',
      width: '100%',
      boxSizing: 'border-box',
      background: 'linear-gradient(to bottom, #22414F, #1F6484)',
      position: 'relative',
    },
    contentWrapperAnual: {
      border: '1px solid #F49231',
    },
    recommendedLegend: {
      position: 'absolute',
      top: '-10px',
      right: '10px',
      background: '#F49231',
      color: 'white',
      fontSize: '12px',
      padding: '2px 8px',
    },
    planSelector: {
      display: 'flex',
      border: '1px solid #ECEEEC',
      borderRadius: '25px',
      overflow: 'hidden',
      padding: '0.3125em',
    },
    planButton: {
      flex: 1,
      padding: '0.625em 2em',
      border: 'none',
      borderRadius: '1.25em',
      background: 'transparent',
      cursor: 'pointer',
      transition: 'background 0.3s',
      fontSize: '0.875em',
      color: '#858585',
    },
    activePlanButton: {
      background: '#F49231',
      color: '#fff',
    },
    priceDisplay: {
      marginTop: '1em',
      fontFamily: '\'Montserrat\', sans-serif',
      textAlign: 'center',
    },
    originalPrice: {
      color: '#858585',
      fontWeight: 700,
      fontSize: '1.2em',
      display: 'block',
      textDecoration: 'line-through',
    },
    discountedPrice: {
      color: '#FFFFFF',
      fontSize: '1.9em',
      display: 'block',
      marginTop: '-0.2em',
      fontWeight: 700,
      textAlign: 'left',
    },
    pricePerMonth: {
      color: '#FFFFFF',
      fontWeight: 400,
      fontSize: '18px',
      textAlign: 'left',
    },
    priceBullets: {
      padding: 0,
      fontFamily: '"Montserrat", sans-serif',
    },
    bulletItem: {
      listStyle: 'none',
      marginBottom: '10px',
      display: 'flex',
      alignItems: 'center',
      fontSize: '12px',
      flexWrap: 'wrap',
    },
    bulletText: {
      marginLeft: '5px',
      whiteSpace: 'nowrap',
    },
    planTitle: {
      color: 'white',
      fontWeight: 400,
      fontSize: '32px',
      textAlign: 'left',
      margin: '10px 0 10px 0',
    },
    discountText: {
      color: '#F49231',
      fontSize: '14px',
      textAlign: 'left',
      marginBottom: '-23px',
    },
    regularPrice: {
      color: '#AAAAAA',
      fontSize: '11px',
      textAlign: 'left',
      marginTop: '-5px',
    },
    renewalText: {
      color: '#FFFFFF',
      fontSize: '18px',
      marginTop: '10px',
      textAlign: 'left',
    },
    exclusiveOfferLegend: {
      width: '110px',
      height: '20px',
      padding: '4px 12px',
      borderRadius: '4px 0px 0px 0px',
      background: 'rgba(246, 147, 51, 0.15)',
      borderRight: 'none',
      borderBottom: 'none',
      color: '#F69333',
      fontSize: '10px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'flex-start',
      margin: '-5px 10px 10px 0',
    },
  };

  const getRenewalPeriod = (plan) => {
    switch(plan) {
    case 'Mensual':
      return 'mensual';
    case 'Trimestral':
      return 'trimestral';
    case 'Anual':
      return 'anual';
    default:
      return '';
    }
  };

  return (
    <div style={styles.planContainer}>
      <h3 style={styles.title}>{title}</h3>
      {subtitle && <h4 style={styles.subtitle}>{subtitle}</h4>}

      <div style={{
        ...styles.contentWrapper,
        ...(plan === 'Anual' ? styles.contentWrapperAnual : {})
      }}>
       
        <div style={styles.exclusiveOfferLegend}>
            Oferta exclusiva web
        </div>
       

        {plan === 'Anual' && (
          <div style={styles.recommendedLegend}>
            Recomendado
          </div>
        )}

        <div style={styles.planSelector}>
          {['Mensual', 'Trimestral', 'Anual'].map((planType) => (
            <button
              key={planType}
              onClick={() => handlePlanChange(planType)}
              style={{
                ...styles.planButton,
                ...(plan === planType ? styles.activePlanButton : {})
              }}
            >
              {planType}
            </button>
          ))}
        </div>

        <h2 style={styles.planTitle}>Plan {plan}</h2>

        <div style={styles.discountText}>
          {discounts[plan]} de descuento
        </div>

        <div style={styles.priceDisplay}>
          <div style={styles.discountedPrice}>
            {prices[plan]}<span style={styles.pricePerMonth}>{' '}/mes</span>
          </div>
        </div>

        <div style={styles.regularPrice}>
          Precio regular: USD 5 /mes
        </div>

        <div style={styles.renewalText}>
          Renovación {getRenewalPeriod(plan)}. Puedes cancelar en cualquier momento.
        </div>
        
        <Button 
          text="Prueba 7 días gratis" 
          variant="callToAction" 
          size="medium" 
          onClick={handleSubmit} 
          scale
          style={{margin: '20px auto 0', display: 'block', borderRadius: '50px', width: '100%'}}
        />
      </div>
      {loading && <CircularProgress/> }
    </div>
  );
};

export default Plans;
