import React from 'react';
import styles from './suscribete.module.css';
import Plans from './Plans';

function PricingSection({ handlePlanSelection, handleConvertion }) {
  return (
    <section className={styles['price-list']}>
      <div className={styles['price-cont']}>
        <Plans 
          title="Elije tu Plan" 
          subtitle={'Aprovecha la oferta exclusiva en todos nuestros planes y disfruta de audiolibros ilimitados.'}
          handlePlanSelection={handlePlanSelection}
          handleConvertion={handleConvertion}
        />
      </div>
    </section>
  );
}

export default PricingSection;
