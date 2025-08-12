// @ts-nocheck
import { useEffect } from 'react';
import { useBookProgressContext } from '../../context_providers';
import useSaveListeningTime from '../../hooks/useSaveListeningTime';
import PropTypes from 'prop-types';
import plyr from 'plyr';
import 'plyr/dist/plyr.css';

const Plyr = (props) => {
  // This is to save indidual progress
  const { postProgressToFirestore } = useBookProgressContext();

  // This is to tracklistening time per book
  const { initializeListeningTimeTracking } = useSaveListeningTime(props.slug);
  
  function handleFreeEnd() {
    if (!props.isMember) props.showModal();
  }

  useEffect(() => {
    
    let player = new plyr('.js-plyr', props.options);
    
    const cleanup = initializeListeningTimeTracking(player);

    // Sets cuerrent time if saved
    let intervalId;
    let areEqual = false;

    if (player.playing !== true && props.savedTime > 0) {
      player.once('canplay', event => {
        intervalId = setInterval(() => {
          if(!areEqual){
            player.currentTime = props.savedTime; 
            if(player.currentTime == props.savedTime) {
              areEqual = true;
              clearInterval(intervalId);
            }
          }
        }, 100);
      });
    }
	
    // Pause the audio so it gets saved before leaving the page
    const handleBeforeUnload = (event) => {
      event.preventDefault();
      player.pause();
      event.returnValue = `Estas reproduciendo ${props.slug}. ¿Seguro que quieres abandonar la página?`;
      return `Estas reproduciendo ${props.slug}. ¿Seguro que quieres abandonar la página?`;
    };

    player.on('playing', () => window.addEventListener('beforeunload', handleBeforeUnload));

    player.on('pause', () => window.removeEventListener('beforeunload', handleBeforeUnload));


    const sources = {
      type: 'audio',
      sources: [
        {
          src: `${props.audio_url}`,
          type: 'audio/mp3',

          // size: 720,
        },
        {
          src: '/path/to/movie.webm',
          type: 'video/webm',
          size: 1080,
        },
      ],
    };

    player.source = sources;

    // Saves progress to firestore on pause
    const handlePause = () => {
     
      // onPause(player.currentTime);
      if(player.currentTime !== 0) {
        postProgressToFirestore(player.currentTime, props.userId, props.slug);
      }			
    };

    if (props.isMember) {
      player.on('pause', handlePause);
    } 

    // If not member and book not free, only play free time and then stop the audio
    if (!props.isMember) {
      player.on('playing', (event) => {
        setTimeout(() => {
          player.stop();
          handleFreeEnd();
        }, parseInt(props.free_time * 60000));
      });

      player.on('seeked', (event) => {
        handleFreeEnd();
        player.stop();
      });
    }
		

    return () => {

      if(player.currentTime !== 0) {
        postProgressToFirestore(player.currentTime, props.userId, props.slug);
      }
      window.removeEventListener('beforeunload', handleBeforeUnload);
      cleanup;
      player.destroy();
    };
  }, [props.isMember]);


  return (
    <div style={{backgroundColor: 'rgba(0, 0, 0, 0.5)'}}>
      <audio className="js-plyr plyr" type="audio"></audio>
    </div>
  );
};

Plyr.defaultProps = {
  options: {
    controls: [
      'rewind',
      'play',
      'fast-forward',
      'progress',
      'current-time',
      'duration',
      'mute',
      'volume',
      'settings',
      'fullscreen',
    ],
    i18n: {
      restart: 'Restart',
      rewind: 'Rewind {seektime}s',
      play: 'Play',
      pause: 'Pause',
      fastForward: 'Forward {seektime}s',
      seek: 'Seek',
      seekLabel: '{currentTime} of {duration}',
      played: 'Played',
      buffered: 'Buffered',
      currentTime: 'Current time',
      duration: 'Duration',
      volume: 'Volume',
      mute: 'Mute',
      unmute: 'Unmute',
      enableCaptions: 'Enable captions',
      disableCaptions: 'Disable captions',
      download: 'Download',
      enterFullscreen: 'Enter fullscreen',
      exitFullscreen: 'Exit fullscreen',
      frameTitle: 'Player for {title}',
      captions: 'Captions',
      settings: 'Settings',
      menuBack: 'Go back to previous menu',
      speed: 'Speed',
      normal: 'Normal',
      quality: 'Quality',
      loop: 'Loop',
    },
    free_options: {
      controls: [
        'rewind',
        'play',
        'fast-forward',
        'progress',
        'current-time',
        'duration',
        'mute',
        'volume',
        'settings',
        'fullscreen',
      ],
      i18n: {
        restart: 'Restart',
        rewind: 'Rewind {seektime}s',
        play: 'Play',
        pause: 'Pause',
        fastForward: 'Forward {seektime}s',
        seek: 'Seek',
        seekLabel: '{currentTime} of {duration}',
        played: 'Played',
        buffered: 'Buffered',
        currentTime: 'Current time',
        duration: 'Duration',
        volume: 'Volume',
        mute: 'Mute',
        unmute: 'Unmute',
        enableCaptions: 'Enable captions',
        disableCaptions: 'Disable captions',
        download: 'Download',
        enterFullscreen: 'Enter fullscreen',
        exitFullscreen: 'Exit fullscreen',
        frameTitle: 'Player for {title}',
        captions: 'Captions',
        settings: 'Settings',
        menuBack: 'Go back to previous menu',
        speed: 'Speed',
        normal: 'Normal',
        quality: 'Quality',
        loop: 'Loop',
      },
    },
  },
};

Plyr.propTypes = {
  options: PropTypes.object,
  sources: PropTypes.object,
  source: PropTypes.func,
  destroy: PropTypes.func,
};

export default Plyr;
