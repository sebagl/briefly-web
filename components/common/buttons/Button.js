import { breakpoints } from '@mui/system';
import React from 'react';
import styles from '../common.module.css';

function Button(props) {
	
  let buttonVariant;
  switch(props.variant){
  case 'callToAction':
    buttonVariant = 'ctaButton';
    break;
  case 'primary':
    buttonVariant = 'primaryButton';
    break;
  case 'close':
    buttonVariant = 'closeButton';
    break;
  default:
    buttonVariant = 'ctaButton';
  }

  let buttonSize;
  switch(props.size){
  case 'large':
    buttonSize = 'largeButton';
    break;
  case 'small':
    buttonSize = 'smallButton';
    break;
  default:
    if(props.variant === 'close'){
      buttonSize = 'smallButton';
    } else {
      buttonSize = 'mediumButton';
    }
    
  }

  let buttonClasses = `${styles.button} ${styles[buttonVariant]} ${styles[buttonSize]}`;

  if(props.rounded){
    buttonClasses += ` ${styles.rounded}`;
  }

  if(props.scale){
    buttonClasses += ` ${styles.scale}`;
  }

  return (
    <button 
      disabled={props.disabled} 
      style={props.style} 
      type={props.type} 
      className={buttonClasses} 
      onClick={props.onClick}
    >
      {props.variant === 'close' ? '×' : props.text}
    </button>
  );
}

export default Button;