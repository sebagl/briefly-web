import React from 'react';
import Review from './Review';

function ReviewsSection() {
  const styles = {
    reviewsSection: {
      padding: '30px 0',
      textAlign: 'center',
      backgroundColor: '#043e54',
    },
    heading: {
      color: 'white',
      fontSize: '1.5rem',
      marginBottom: '20px',
    },
    highlightedText: {
      color: '#F69333',
    },
    reviews: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignItems: 'stretch',
      padding: '20px',
      overflowX: 'auto',
      whiteSpace: 'nowrap',
    },
  };

  const mediaQueries = `
    @media (max-width: 900px) {
      .reviews {
        padding: 20px;
      }
    }
    @media (max-width: 700px) {
      .heading {
        fontSize: 1.5rem;
      }
    }
    @media (max-width: 500px) {
      .heading {
        fontSize: 1.3rem;
      }
    }
  `;

  const reviewsData = [
    {
      review: 'There is no better way to enjoy my daily commute. The summaries are amazing!',
      userName: 'John - NYC',
      subscription: 'Annual member'
    },
    {
      review: 'The audio quality and audiobook selection are the best. It feels like being inside the story—truly immersive.',
      userName: 'Peter - Boston',
      subscription: 'Monthly member'
    },
    {
      review: 'Thanks to Briefly, I improved in finance and personal growth. Best investment I made this year.',
      userName: 'Anne - Chicago',
      subscription: 'Monthly member'
    },
    {
      review: 'I love the flexibility. I can listen to my favorite books anywhere.',
      userName: 'Claude - Kansas City',
      subscription: 'Annual member'
    }
  ];

  return (
    <section style={styles.reviewsSection}>
      <style>{mediaQueries}</style>
      <h2 style={styles.heading}>
        Listeners who love our{' '}
        <span style={styles.highlightedText}>unlimited library</span>
      </h2>
      <div style={styles.reviews}>
        {reviewsData.map((review, index) => (
          <Review
            key={index}
            review={review.review}
            userName={review.userName}
            subscription={review.subscription}
          />
        ))}
      </div>
    </section>
  );
}

export default ReviewsSection;
