import { useState, useCallback, useRef, useEffect } from 'react';
import { doc, updateDoc, setDoc, increment } from '@firebase/firestore'; 
import { db } from '../config/firebase';

const useSaveListeningTime = (slug) => {
  const [listeningTime, setListeningTime] = useState(0);
  const listeningTimeRef = useRef(listeningTime); 
  const lastTimeRef = useRef(null); 

  useEffect(() => {
    listeningTimeRef.current = listeningTime;
  }, [listeningTime]);

  const initializeListeningTimeTracking = (player) => {
    // This function updates the listening time based on the player's progress
    const updateListeningTime = () => {
       
      const currentTime = player.currentTime;
      // If lastTime exists, calculate the difference and add to listeningTime
      if (lastTimeRef.current !== null) {
        const timeDiff = currentTime - lastTimeRef.current;
        if (timeDiff > 0 && timeDiff < 5) { // Counting only "natural" playback progression
          setListeningTime(prevTime => prevTime + timeDiff);
        }
      }

      lastTimeRef.current = currentTime;  
    };

    player.on('timeupdate', updateListeningTime);
    player.on('play', () => lastTimeRef.current = player.currentTime );

    player.on('pause', () => {
      
      if (listeningTimeRef.current > 0) {
        trackTime(listeningTimeRef.current);
        setListeningTime(0);  // reset after saving
      }
    });

    const saveInterval =  5 * 60 * 1000; // 5 minutes
    const saveIntervalId = setInterval(() => {
      if (listeningTimeRef.current > 0) {
        trackTime(listeningTimeRef.current);
        setListeningTime(0);  // reset after saving
      }
    }, saveInterval);

    // Cleanup function
    return () => {
      player.off('timeupdate', updateListeningTime);
      clearInterval(saveIntervalId);
      if (listeningTimeRef.current > 0) {
        trackTime(listeningTimeRef.current);
      }
    };
  };

  const trackTime = useCallback((sessionTime) => {
    if (sessionTime > 0) {
      // Generate the timestamp for the month and year
      const date = new Date();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      const monthYear = `${year}-${month}`;

      // Get a reference to the Firestore document
      const monthlyStatsRef = doc(db, 'monthlyAudiobookStats', monthYear);

      const updateObject = {
        [`${slug}`]: increment(sessionTime / 60)  // Increment the field
      };

      updateDoc(monthlyStatsRef, updateObject)
        .catch((error) => {
          // If the document does not exist, create one
          if (error.code === 'not-found') {
            setDoc(monthlyStatsRef, {
              [slug]: sessionTime / 60 // Initialize the field with the session time
            });
          }
        });
    }
  }, [slug]);

  return { initializeListeningTimeTracking, listeningTime };
};

export default useSaveListeningTime;
