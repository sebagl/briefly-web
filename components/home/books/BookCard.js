import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PlayIcon, PauseIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { useAuth } from '../../../context_providers/auth/authContext';

const BookCard = (props) => {
  const router = useRouter();
  const { currentUser, stripeRole } = useAuth();

  const styles = {
    card: {
      width: '240px',
      height: '380px',
      padding: '12px',
      backgroundColor: 'rgba(256, 256, 256, 0.15)',
      boxShadow: '20px 20px 30px -12px rgba(46, 46, 46, 0.15)',
      borderRadius: '8px',
      margin: '0 auto',
      marginBottom: '20px',
      position: 'relative',
      cursor: 'pointer',
      '@media (maxWidth: 464px)': {
        width: '200px',
        height: '340px',
      },
    },
    title: {
      fontSize: '16px',
      lineHeight: '24px',
      color: '#fff',
      margin: '8px 0 4px 0'
    },
    author: {
      fontWeight: '400',
      color: '#8C8C8C',
      fontSize: '14px',
      lineHeight: '18px',
      margin: '4px 0'
    },
    pillsContainer: {
      display: 'flex',
      marginTop: '12px'
    },
    pill: {
      margin: '0 4px',
      padding: '0 8px',
      // background: '#FFF',
      border: '1px solid #F49231',
      color: '#F49231',
      borderRadius: '24px',
      fontSize: '12px',
      lineHeight: '22px',
    },
    playButton: {
      position: 'absolute',
      bottom: '20px',
      right: '20px',
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      backgroundColor: '#F49231',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
      cursor: 'pointer',
      border: 'none',
      transition: 'transform 0.2s ease',
      '&:hover': {
        transform: 'scale(1.1)',
      },
    },
    playIcon: {
      color: '#FFF',
      width: '30px',
      height: '30px',
    }
  };

  const handleCardClick = (e) => {
    e.preventDefault();
    
    // If user is subscribed, redirect to book page
    if (currentUser && stripeRole) {
      router.push(`/books/${props.slug}`);
      return;
    }

    // Otherwise handle preview play/pause
    if (props.onPlay) {
      if (props.isPlaying) {
        props.onPause();
      } else {
        props.onPlay(props);
      }
    }
  };

  return (
    <div style={styles.card} key={props.index} onClick={handleCardClick}>
      <Image
        src={props.cover_url}
        alt={props.slug}
        layout="responsive"
        width={40}
        height={40}
        loading="lazy"
      />
      <h3 style={styles.title}>{props.name}</h3>
      <p style={styles.author}>{props.author}</p>
      <div style={styles.pillsContainer}>
        <div style={styles.pill}>{props.category}</div>
      </div>
      <button 
        style={styles.playButton}
        onClick={handleCardClick}
        aria-label={props.isPlaying ? 'Pause audiobook' : 'Play audiobook'}
      >
        {props.isPlaying ? (
          <PauseIcon style={styles.playIcon} />
        ) : (
          <PlayIcon style={styles.playIcon} />
        )}
      </button>
    </div>
  );
};

export default BookCard;