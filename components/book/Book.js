// @ts-nocheck
import React, { useEffect, useState, useRef } from 'react';
import Plyr from './AudioPlayer';
import FreeEnded from '../../components/modals/FreeEndedModal';
import { useAuth, useBookProgressContext } from '../../context_providers';
import Image from 'next/image';
import styles from './styles.module.css';
import { faHeadphonesAlt, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useRouter } from 'next/router';




export async function getServerSideProps() {
  // eslint-disable-next-line no-undef
  const progressData = await getProgressFromFirestore(currentUser.uid);

  return {
    props: {
      progressData,
    },
  };
}


function Book({ bookData, progressData }) {
  const router = useRouter();
  const { currentUser, stripeRole } = useAuth();
  const { getProgressFromFirestore } = useBookProgressContext();
  const [showFreeModal, setShowFreeModal] = useState(false);
  const [isMember, setIsMember] = useState(false);

  const handleGoBack = () => {
    router.back();
  };

  const showModal= () => {
    setShowFreeModal(true);
  };

  const hideModal= () => {
    setShowFreeModal(false);
  };

  const audio = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  const checkMembership = () => {
    if (currentUser && stripeRole === 'active_member') {
      setIsMember(true);
      return;
    }
    setIsMember(false);
  };

  useEffect(() => {
    if (currentUser && stripeRole) {
      checkMembership();
    }
  }, [currentUser, stripeRole]);


  const [savedTime, setSavedTime] = useState(0);


  useEffect(() => {
    if (progressData && Object.keys(progressData).length > 0) {
      for (const key in progressData) {
        if (key === bookData.slug) {
          const progress = progressData[key];
          setSavedTime(progress);
          break;
        }
      }
    }
  }, []);
	

  const bookPageStyle = currentUser ? styles.loggedin : '';

  return (
    <div className={`${styles['book-page']} ${bookPageStyle}`}>
      <div style={{color: '#fff'}}>
        <FontAwesomeIcon
          onClick={handleGoBack}
          icon={faArrowLeft}
          style={{ fontSize: '19px' }}
        />
      </div>
      <div className={styles['cover-cont']}>
        <Image
          src={bookData.cover_url}
          alt={bookData.slug}
          width={350}
          height={350}
        />

        <p className={styles.phones}>
          <FontAwesomeIcon
            icon={faHeadphonesAlt}
            style={{ fontSize: '19px' }}
          />
          {'  '}PARA UNA MEJOR EXPERIENCIA
        </p>
      </div>
      <div className={styles['text-cont']}>
        <p className={styles.title}>{bookData.name}</p>
        <p className={styles.author}>{bookData.author}</p>
        <p className={styles.narrador}>NARRADO POR: {bookData.narrator}</p>
        <p className={styles.sinopsis}>{bookData.sinopsis}</p>
      </div>
			
      <div className={styles['player-cont']}>
        <Plyr
          ref={audio}
          className="audio"
          audio_url={bookData.audio_url}
          free_time={bookData.free_time}
          duration={bookData.duration}
          slug={bookData.slug}
          isMember={isMember}
          toggleRegister={() => true}
          is_free={bookData.is_free}
          showModal={showModal}
          userId={currentUser && currentUser.uid}
          savedTime={savedTime}
        />

        {!isMember && (
          <div className={styles.gratis}>¡Escucha un ADELANTO!</div>
        )}
      </div>

      <FreeEnded
        toggleRegister={() => true}
        isOpen={showFreeModal}
        showModal={showModal}
        hideModal={hideModal}
      />
    </div>
  );
}

export default Book;
