import React from 'react';
import styles from './autores.module.css';
import HeaderAutores from './HeaderAutores';
import Header from '../common/Header';

function AutoresHero(props) {
  return (
    <div className={styles.image}>
      <Header />
      <div className={styles.paper}>
        <p className={styles.title}>
          <span className={styles.orange}>¿</span>
					ERES ESCRITOR Y QUIERES CONVERTIR TU OBRA EN AUDIOLIBRO
          <span className={styles.orange}>?</span>
        </p>
        <div className={styles.line}></div>
        <p className={styles.subtitle}>
					En <span style={{ fontWeight: 'bold' }}>Stream Readers</span> lo
					hacemos por ti.
        </p>
        <p className={styles.subtitle}>
					Escribe, Produce y Vende:{' '}
          <span className={styles.orange}>Simple.</span>
        </p>
        <div className={styles.btnContainer}>
          <button className="cta-btn" onClick={props.handleScroll}>
						¡CONTÁCTANOS!
          </button>

          <div className={styles.divider}></div>
          {/* <button className="link-btn" onClick={props.handleScrollPricing}>
						COTIZAR
					</button> */}
        </div>
      </div>
    </div>
  );
}

export default AutoresHero;
