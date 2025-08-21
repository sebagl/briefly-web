import React, { useEffect, useRef, useState } from 'react';
import Button from '../common/buttons/Button';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { CircularProgress } from '@mui/material';
import BookCard from '../home/books/BookCard';

const AnimatedBanner = ({ screenSize }) => {
  const bannerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const banner = bannerRef.current;
    const text = textRef.current;
    if (banner && text) {
      const animateText = () => {
        const bannerWidth = banner.offsetWidth;
        const textWidth = text.offsetWidth;
        const duration = textWidth / 30; // Adjust speed here
        text.style.transition = `transform ${duration}s linear`;
        text.style.transform = 'translateX(-100%)';
        
        setTimeout(() => {
          text.style.transition = 'none';
          text.style.transform = 'translateX(100%)';
          setTimeout(() => {
            text.style.transition = `transform ${duration}s linear`;
            text.style.transform = 'translateX(-100%)';
          }, 50);
        }, duration * 1000);
      };

      animateText();
      setInterval(animateText, (text.offsetWidth / 50 + 1) * 1000);
    }
  }, [screenSize]);

  const fontSize = screenSize === 'small' ? '0.8rem' : '1rem';

  const styles = {
    banner: {
      width: '100vw',
      background: 'linear-gradient(to right, #F69333, #FBBC22)',
      overflow: 'hidden',
      padding: '10px 0',
      position: 'absolute',
      bottom: 0,
      left: 0,
    },
    text: {
      color: 'white',
      whiteSpace: 'nowrap',
      fontSize: fontSize,
    },
  };

  return (
    <div ref={bannerRef} style={styles.banner}>
      <div ref={textRef} style={styles.text}>
        Start your 7-day free trial! Your next story is waiting.
      </div>
    </div>
  );
};

const Resumenes = ({ 
  screenSize, 
  handleConvertion, 
  books,
  onPlay,
  onPause,
  playingBook,
  rutas,
  loading,
  error
}) => {
  const containerRef = useRef(null);
  const titleRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      const title = titleRef.current;
      if (container && title) {
        const containerRect = container.getBoundingClientRect();
        const titleRect = title.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate scroll progress based on the title's position
        const scrollProgress = (viewportHeight - titleRect.top) / (containerRect.height);
        const clampedProgress = Math.max(0, Math.min(1, scrollProgress));
        
        setScrollPosition(clampedProgress);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Set initial category
  useEffect(() => {
    if (rutas.length > 0 && !selectedCategory) {
      setSelectedCategory(rutas[0]?.title);
    }
  }, [rutas]);

  const currentCategory = rutas.find(ruta => ruta.title === selectedCategory);
  const currentBooks = currentCategory?.books || [];

  const styles = {
    container: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem 1rem',
      paddingBottom: 'calc(4rem + 10    0px)', // Add extra padding for the banner
      background: 'linear-gradient(to bottom, #22414F, #1F6484)',
      overflow: 'hidden', // Ensure the banner doesn't create horizontal scroll
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
    imagesContainer: {
      position: 'relative',
      width: '100%',
      maxWidth: '100rem',
      height: screenSize === 'small' ? '10rem' : '15rem',
    },
    image: {
      position: 'absolute',
      width: '80%',
      height: 'auto',
      objectFit: 'contain',
      transition: 'transform 0.1s ease-out',
    },
    leftImage: {
      left: '0%',
      transform: `translateX(${-100 + scrollPosition * 100}%)`,
    },
    rightImage: {
      right: '0%',
      transform: `translateX(${100 - scrollPosition * 100}%)`,
    },
    categoriesContainer: {
      display: 'flex',
      gap: '10px',
      overflowX: 'auto',
      padding: '10px 5px',
      width: '100%',
      maxWidth: '1200px',
      marginBottom: '30px',
      '-webkit-overflow-scrolling': 'touch',
      scrollbarWidth: 'none',
      msOverflowStyle: 'none',
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
  };

  return (
    <>
      <div ref={containerRef} style={styles.container}>
        <h2 ref={titleRef} style={styles.title}>Summaries</h2>
        <p style={styles.subtitle}>
          Discover key takeaways from the most popular books in concise summaries.
        </p>

        {/* <div style={styles.categoriesContainer}>
          {rutas.map((ruta) => (
            <button
              key={ruta.id}
              onClick={() => setSelectedCategory(ruta.title)}
              style={{
                ...styles.categoryButton,
                ...(ruta.title === selectedCategory ? styles.activeCategory : styles.inactiveCategory)
              }}
            >
              {ruta.title}
            </button>
          ))}
        </div> */}

        {/* <div style={styles.booksContainer}>
          {loading ? (
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
        </div> */}

        <div style={styles.imagesContainer}>
          {/* <img
            src="https://firebasestorage.googleapis.com/v0/b/stream-readers-prod.appspot.com/o/img%2Fcuatro_portadas.png?alt=media&token=db23b3ba-b62f-4efe-a8a3-173d9996dffb"
            alt="Book covers"
            style={{ ...styles.image, ...styles.leftImage }}
          /> */}
          <img
            src="https://firebasestorage.googleapis.com/v0/b/stream-readers-prod.appspot.com/o/img%2Fapp_mano.png?alt=media&token=b83b8cdb-74f1-41c6-870b-bf90e8a466c2"
            alt="App in hand"
            style={{ ...styles.image, ...styles.rightImage }}
          />
        </div>
        
        <Button 
          text={'Explore summaries'} 
          onClick={handleConvertion} 
          style={{marginTop: '30px', fontSize: '18px', borderRadius: '50px', position: 'relative', bottom: '40px'}} 
          size="large" 
          rounded 
          scale
        />
        <AnimatedBanner screenSize={screenSize} />
      </div>
    </>
  );
};

export default Resumenes;
