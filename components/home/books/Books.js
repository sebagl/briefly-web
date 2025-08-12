// @ts-nocheck
import React from 'react';
import styles from '../home.module.css';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import BookCard from './BookCard';
import Featured from './Featured';
import useCategorizedBooks from '../../../hooks/useCategorizedBooks';
import useBooks from '../../../hooks/useBooks';
import { CircularProgress } from '@mui/material';
import AppDownloadButtons from '../../common/buttons/AppDownloadButtons';

function Books({ books, loadingBooks, error, progressData }) {
 
  const categories = useCategorizedBooks(books, progressData);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      paritialVisibilityGutter: 60
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1
    }
  };

  const categoriesElement =
    <>
      {categories.map(category => {
        return (
          <div className={styles.carouselCont}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }} >
              <h2 style={{ margin: '25px 0', textAlign: 'center' }}>{category.displayName}</h2>
              {category.featuredBook && <Featured {...category.featuredBook} />}
            </div>
            <div >
              <Carousel ssr responsive={responsive} infinite={true}>
                {category.books.sort((a, b) => b.is_3d - a.is_3d)
                  .map((book, i) => {
                    return (
                      <BookCard {...book} index={i} key={i} />
                    );
                  })
                }
              </Carousel>
            </div>
          </div>
        );
      })}
    </>;

  return (
    <>
      <div className={styles.booksCont}>
        <AppDownloadButtons />
        <h2 className={styles.booksTitle}>Audiolibros</h2>
        {loadingBooks ? (
          <CircularProgress />
        ) : error ? (
          <div>Ha ocurrido un error, intentalo nuevamente</div>
        ) : (
          categoriesElement
        )}
        <AppDownloadButtons />
      </div>
    </>
  );
}

export default Books;
