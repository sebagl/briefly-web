import React from 'react';
import styles from './suscribete.module.css';
import Plans from './Plans';

function PricingSection({ handlePlanSelection, handleConvertion }) {
  return (
    <section className={styles['price-list']}>
      <div className={styles['price-cont']}>
        <Plans 
          title="Choose Your Plan" 
          subtitle={'Take advantage of our exclusive offer on all plans and enjoy unlimited audiobooks.'}
          handlePlanSelection={handlePlanSelection}
          handleConvertion={handleConvertion}
        />
      </div>
    </section>
  );
}

export default PricingSection;
