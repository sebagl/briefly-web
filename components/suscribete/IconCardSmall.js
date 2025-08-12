import React from 'react';

function IconCardSmall({ Icon, alt, text, screenSize }) {
  const styles = {
    iconCardSmall: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      width: screenSize === 'small' ? '120px' : '200px',
      height: screenSize === 'small' ? '180px' : '190px',
      backgroundColor: '#22414F',
      boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
      padding: '20px 10px 0px 10px',
      borderRadius: '10px',
    },
    iconCont: {
      minHeight: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 0,
    },
    icon: {
      width: screenSize === 'small' ? '80px' : '90px',
      height: screenSize === 'small' ? '80px' : '90px',
      color: '#F49231',
    },
    text: {
      color: '#FFF',
      fontSize: screenSize === 'small' ? '0.8rem' : 'inherit',
      textAlign: 'center',
      marginTop: '10px',
    },
  };

  return (
    <div style={styles.iconCardSmall}>
      <div style={styles.iconCont}>
        <Icon style={styles.icon} aria-hidden="true" />
      </div>
      <p style={styles.text}>{text}</p>
    </div>
  );
}

export default IconCardSmall;
