import React from 'react';
import Button from '../common';
import Link from 'next/link';
import AppDownloadButtons from '../common/buttons/AppDownloadButtons';

function TextSection(props) {
  const styles = {
    textCta: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      minHeight: '50vh',
      backgroundColor: '#f49231', 
      padding: '30px 0',
    },

    text: {
      color: 'white',
      fontSize: '25px',
      fontWeight: 'bold', 
    },
    buttonContainer: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    catalogLink: {
      color: 'white', // Changed color to white
      cursor: 'pointer',
      textAlign: 'center',
      fontSize: '22px',
      marginTop: '30px',
      fontWeight: 'bold', // Made text bold
    },
  };

  const mediaQueries = `
    @media (max-width: 900px) {
      .textCta > div > p {
        font-size: 1.8rem;
      }
    }
    @media (max-width: 700px) {
      .textCta {
        flex-direction: column;
      }
      .textCta > div > p {
        font-size: 1.6rem;
      }
      .textCta > div {
        margin: 15px;
      }
    }
    @media (max-width: 500px) {
      .textCta > div > p {
        font-size: 1.5rem;
      }
      .textCta > div {
        max-width: 80vw;
      }
    }
  `;

  return (
    <section style={styles.textCta} className="textCta">
      <style>{mediaQueries}</style>
      <div style={styles.textContainer}>
        <p style={styles.text}>
          Get the app and enjoy unlimited access to our audiobook catalog
        </p>
      </div>
      <div style={styles.buttonContainer}>
        <AppDownloadButtons />
      </div>
    </section>
  );
}

export default TextSection;
