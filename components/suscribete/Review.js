import React from 'react';
import Image from 'next/image';

function Review({ review, userName, subscription }) {
  const styles = {
    reviewContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: '#22414F',
      borderRadius: '24px',
      padding: '20px',
      margin: '10px',
      width: '300px',
      minWidth: '300px',
      height: '300px', 
      justifyContent: 'space-between',
    },
    starsContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginBottom: '10px',
    },
    star: {
      color: '#FFA500',
      fontSize: '24px',
      margin: '0 2px',
    },
    reviewText: {
      color: 'white',
      fontSize: '16px',
      textAlign: 'center',
      marginBottom: '10px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      '-webkit-line-clamp': '6', // Limit to 6 lines
      '-webkit-box-orient': 'vertical',
      whiteSpace: 'normal', // Allow text to wrap
    },
    userName: {
      color: 'white',
      fontSize: '18px',
      fontWeight: 'bold',
      marginBottom: '5px',
    },
    subscription: {
      color: 'white',
      fontSize: '14px',
      fontStyle: 'italic',
    },
  };

  return (
    <div style={styles.reviewContainer}>
      <div style={styles.starsContainer}>
        {[...Array(5)].map((_, i) => (
          <span key={i} style={styles.star}>★</span>
        ))}
      </div>
      <p style={styles.reviewText}>{review}</p>
      <div>
        <p style={styles.userName}>{userName}</p>
        <p style={styles.subscription}>{subscription}</p>
      </div>
    </div>
  );
}

export default Review;
