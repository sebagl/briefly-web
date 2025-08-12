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
      review: 'No hay mejor forma de disfrutar mis trayectos diarios. ¡Los audiolibros en 3D son una maravilla!',
      userName: 'Julia - México',
      subscription: 'Suscriptora Anual'
    },
    {
      review: 'Lo mejor es la calidad del audio y la selección de audiolibros en 3D. Es como estar dentro de la historia, nunca había vivido algo tan inmersivo.',
      userName: 'Fátima - Argentina',
      subscription: 'Suscriptor Mensual'
    },
    {
      review: 'Gracias a las rutas de aprendizaje, he podido mejorar en temas como finanzas y desarrollo personal. La mejor inversión que hice este año.',
      userName: 'Ricardo - Chile',
      subscription: 'Suscriptor Mensual'
    },
    {
      review: 'Amo la flexibilidad de esta app. Puedo escuchar mis libros favoritos en cualquier lugar.',
      userName: 'Facundo - Argentina',
      subscription: 'Suscriptor Anual'
    }
  ];

  return (
    <section style={styles.reviewsSection}>
      <style>{mediaQueries}</style>
      <h2 style={styles.heading}>
        Usuarios que ya disfrutan de nuestra{' '}
        <span style={styles.highlightedText}>biblioteca ilimitada</span>
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
