import React, { useState, useEffect, useMemo } from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CircularProgress } from '@mui/material';
import BookCard from '../home/books/BookCard';
import Button from '../common/buttons/Button';
import useCategorizedBooks from '../../hooks/useCategorizedBooks';

function Audiobooks({ 
  books, 
  loadingBooks, 
  error, 
  progressData, 
  handleConvertion,
  onPlay,
  onPause,
  playingBook 
}) {
  const categories = useCategorizedBooks(books, progressData);
  const shuffledCategories = useMemo(() => {
    const base = (categories || []).filter(category => category.displayName !== 'Todo');
    const arr = [...base];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }, [categories]);
  const [selectedCategory, setSelectedCategory] = useState('');

  const styles = {
    container: {
      backgroundColor: '#22414F',
      padding: '40px 5px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    title: {
      color: 'white',
      fontSize: '1.5rem',
      textAlign: 'center',
      marginBottom: '10px',
      fontWeight: '500',
    },
    subtitle: {
      color: 'white',
      fontSize: '1rem',
      textAlign: 'center',
      marginBottom: '30px',
      maxWidth: '800px',
    },
    categoriesContainer: {
      display: 'flex',
      gap: '10px',
      overflowX: 'auto',
      padding: '10px 20px',
      paddingRight: '40px',
      maxWidth: '1200px',
      width: '80%',
      marginBottom: '30px',
      '-webkit-overflow-scrolling': 'touch',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
      scrollSnapType: 'x mandatory',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    categoryButton: {
      padding: '10px 20px',
      backgroundColor: 'transparent',
      border: '1px solid white',
      borderRadius: '25px',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      transition: 'all 0.3s ease',
      outline: 'none',
      scrollSnapAlign: 'start',
      flexShrink: 0,
      minWidth: 'fit-content',
    },
    activeCategory: {
      color: '#F69333',
      border: '1px solid #F69333',
    },
    inactiveCategory: {
      color: 'white',
      border: '1px solid white',
    },
    booksContainer: {
      width: '100%',
      maxWidth: '1200px',
      marginBottom: '30px',
    },
    carouselWrapper: {
      padding: '0 20px',
    },
    subscribeButton: {
      marginTop: '30px',
      borderRadius: '25px',
      fontSize: '1.1rem',
      margin: '0 auto',
    },
  };

  // Set initial category to Finance, fallback to first shuffled category
  useEffect(() => {
    if (shuffledCategories.length > 0 && !selectedCategory) {
      const financeCategory = shuffledCategories.find(cat => cat.displayName === 'Finance');
      setSelectedCategory(financeCategory?.displayName || shuffledCategories[0]?.displayName);
    }
  }, [shuffledCategories, selectedCategory]);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
      partialVisibilityGutter: 40
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 1,
      partialVisibilityGutter: 30
    },
    mobile: {
      breakpoint: { max: 600, min: 0 },
      items: 1,
      slidesToSlide: 1,
      partialVisibilityGutter: 50
    }
  };

  // Get the current category's books using displayName
  const currentCategory = categories.find(cat => cat.displayName === selectedCategory);
  const currentBooks = currentCategory?.books || [];

  return (
    <>
      <section style={styles.container}>
        <h2 style={styles.title}>Explore Our Most Popular Categories</h2>
        <p style={styles.subtitle}>
          Enjoy a free preview and unlock the full experience with your membership.
        </p>

        <div style={styles.categoriesContainer}>
          {shuffledCategories
            .map((category) => (
              <button
                key={category.displayName}
                onClick={() => setSelectedCategory(category.displayName)}
                style={{
                  ...styles.categoryButton,
                  ...(category.displayName === selectedCategory ? styles.activeCategory : styles.inactiveCategory)
                }}
              >
                {category.displayName}
              </button>
            ))}
        </div>

        <div style={styles.booksContainer}>
          {loadingBooks ? (
            <CircularProgress />
          ) : error ? (
            <div style={{ color: 'white', textAlign: 'center' }}>
              Something went wrong. Please try again.
            </div>
          ) : (
            <div style={styles.carouselWrapper}>
              <Carousel
                ssr
                responsive={responsive}
                infinite={true}
                arrows={false}
                containerClass="carousel-container"
                itemClass="carousel-item-partial"
                partialVisible={true}
                key={selectedCategory}
              >
                {currentBooks.map((book, i) => (
                  <BookCard 
                    {...book} 
                    index={i} 
                    key={i} 
                    preview={true}
                    onPlay={() => onPlay(book)}
                    onPause={onPause}
                    isPlaying={playingBook?.id === book.id}
                  />
                ))}
              </Carousel>
            </div>
          )}
        </div>

        <Button
          text="Listen to full audiobook"
          variant="callToAction"
          size="large"
          onClick={handleConvertion}
          scale
          style={styles.subscribeButton}
        />
      </section>
    </>
  );
}

export default Audiobooks;

