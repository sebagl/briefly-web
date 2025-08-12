import React from 'react';
import Image from 'next/image';

const GoogleButton = (props) => {
  const styles = {
    container: {
      backgroundColor: '#4285F4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      color: 'white',
      width: props.width ? props.width : '75%',
      height: '35px',
      borderRadius: '5px',
      border: 'none',
      cursor: 'pointer',
      fontSize: '14px',
      boxShadow: '0px 3px 4px 0px rgba(0,0,0,0.25)'
    },
    logo: {
      backgroundColor: '#fff',
      width: '30px',
      height: '75%',
      marginRight: props.spacing ? props.spacing : '15%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '5px',
    }
  };

  return (
    <button style={styles.container} onClick={props.onClick}>
      <div style={styles.logo} >
        <Image width='20px'  height= '20px' src='/assets/google-logo.png' alt="Google logo" />
      </div>
      {props.buttonText}
    </button>
  );
};

export default GoogleButton;
