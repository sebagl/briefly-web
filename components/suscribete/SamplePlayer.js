import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { PlayIcon, PauseIcon, XMarkIcon } from '@heroicons/react/24/outline';
import plyr from 'plyr';
import 'plyr/dist/plyr.css';

const SamplePlayer = ({ book, onClose, handleConvertion }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const playerRef = useRef(null);

  const styles = {
    container: {
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: '90px',
      backgroundColor: '#082631',
      display: 'flex',
      alignItems: 'center',
      padding: '0 20px',
      zIndex: 1000,
      boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.2)',
    },
    coverContainer: {
      width: '60px',
      height: '60px',
      position: 'relative',
      marginRight: '20px',
    },
    bookInfo: {
      flex: 1,
    },
    title: {
      color: 'white',
      fontSize: '16px',
      marginBottom: '4px',
      marginTop: '4px',
    },
    author: {
      color: '#8C8C8C',
      fontSize: '14px',
      margin: '0',
    },
    controls: {
      display: 'flex',
      alignItems: 'center',
      gap: '20px',
    },
    button: {
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    playPauseButton: {
      width: '45px',
      height: '44px',
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
    playPauseIcon: {
      width: '30px',
      height: '30px',
      color: 'white',
    },
    closeButton: {
      backgroundColor: 'transparent',
      border: 'none',
      cursor: 'pointer',
      padding: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    closeIcon: {
      width: '24px',
      height: '24px',
      color: '#8C8C8C',
    },
    playerContainer: {
      display: 'none',
    },
    conversionButton: {
      backgroundColor: '#F49231',
      color: 'white',
      border: 'none',
      borderRadius: '25px',
      padding: '10px 20px',
      cursor: 'pointer',
      fontSize: '14px',
      fontWeight: '500',
      transition: 'transform 0.2s ease',
      '&:hover': {
        transform: 'scale(1.05)',
      },
    },
  };

  useEffect(() => {
    if (book) {
      const player = new plyr('.sample-player', {
        controls: [],
      });
      playerRef.current = player;
      setIsFinished(false);

      const sources = {
        type: 'audio',
        sources: [
          {
            src: book.audio_url,
            type: 'audio/mp3',
          },
        ],
      };

      player.source = sources;

      player.once('canplay', () => {
        player.currentTime = 0;
        player.play().catch(error => {
          console.log('Auto-play failed:', error);
        });
        setIsPlaying(true);
      });

      const timeLimit = 60; // 1 minute in seconds
      const checkTime = () => {
        if (player.currentTime >= timeLimit) {
          player.pause();
          player.currentTime = 0;
          setIsPlaying(false);
          setIsFinished(true);
        }
      };

      player.on('timeupdate', checkTime);

      return () => {
        if (player) {
          player.pause();
          player.destroy();
        }
      };
    }
  }, [book]);

  const handlePlayPause = () => {
    if (playerRef.current) {
      if (isPlaying) {
        playerRef.current.pause();
      } else {
        playerRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleClose = () => {
    if (playerRef.current) {
      playerRef.current.pause();
    }
    onClose();
  };

  if (!book) return null;

  return (
    <div style={styles.container}>
      <div style={styles.coverContainer}>
        <Image
          src={book.cover_url}
          alt={book.name}
          layout="fill"
          objectFit="cover"
        />
      </div>
      <div style={styles.bookInfo}>
        <h3 style={styles.title}>{book.name}</h3>
        <p style={styles.author}>{book.author}</p>
      </div>
      <div style={styles.controls}>
        {isFinished ? (
          <button 
            style={styles.conversionButton}
            onClick={() => {
              handleConvertion();
              onClose();
            }}
          >
            Listen to the full audiobook
          </button>
        ) : (
          <>
            <button style={styles.playPauseButton} onClick={handlePlayPause}>
              {isPlaying ? (
                <PauseIcon style={styles.playPauseIcon} />
              ) : (
                <PlayIcon style={styles.playPauseIcon} />
              )}
            </button>
            <button style={styles.closeButton} onClick={handleClose}>
              <XMarkIcon style={styles.closeIcon} />
            </button>
          </>
        )}
      </div>
      <div style={styles.playerContainer}>
        <audio className="sample-player" type="audio"></audio>
      </div>
    </div>
  );
};

export default SamplePlayer;
