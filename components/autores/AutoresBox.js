import React from 'react';
import { Typography, Container } from '@mui/material';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles(() => ({
  orange: {
    color: 'rgba(244,146,49,0.8)',
  },
  question: {
    color: '#043e54',
    fontFamily: 'Montserrat, sans-serif',
    fontSize: '1.5rem',
    textAlign: 'center',
  },
  answer: {
    color: 'grey',
    fontFamily: 'Raleway, sans-serif',
    fontSize: '0.9rem',
    textAlign: 'center',
    marginTop: '1em',
  },
}));

function AutoresGrid({ question, answer }) {
  const classes = useStyles();
  return (
    <Container>
      <div className={classes.question}>
        <span className={classes.orange}>¿</span>
        {question}
        <span className={classes.orange}>?</span>
      </div>
      <div className={classes.answer}>{answer}</div>
    </Container>
  );
}

export default AutoresGrid;
