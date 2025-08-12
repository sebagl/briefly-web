import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import useWindowSize from '../../../hooks/useWindowSize';

const Featured = (props) => {

  const { device } = useWindowSize();

  const styles = {
    featuredCard: {
      display: 'flex',
      backgroundColor: '#fff',
      boxShadow: '0px 0px 20px 3px rgba(46, 46, 46, 0.15)',
      borderRadius: '8px',
      // margin: '1em',
      padding: device === 'mobile' ? '1em 0' : '1.2em',
      // border: '1px solid #043e54',
      width: '93%',
    },
    link: {
      width: '100%',
      display: 'flex',
      flexDirection:  device === 'desktop' ? 'row' : 'column',
      alignItems: 'center',
      padding: device === 'desktop' ? '0.5em 5em' : '0',
      cursor: 'pointer',
    },
    title: {
      fontSize: '18px',
      lineHeight: '28px',
      color: '#000',
      margin: '10px 0 5px 0'
    },
    author: {
      color: '#8C8C8C',
      fontSize: '16px',
      lineHeight: '20px',
      margin: '5px 0'
    },
    sinopsis: {
      fontWeight: '200',
      color: '#8C8C8C',
      fontSize: '14px',
      lineHeight: '20px',
      margin: '5px 0',
      display: device === 'desktop' ? 'inline-block' : 'none' ,

    },
    narrator: {
      color: '#000',
      fontSize: '14px',
    },
	
    imageContainer: {
      height: 'auto',
      width: device === 'desktop' ? '30%' : '80%',
    },
    text: {
      marginTop: '1em',
      padding: device === 'desktop' ? '0 5em' : '0',
      width: device === 'desktop' ? '60%' : '80%',
    },
    play: {
      color: '#043e54',
      display: 'flex'
    },
    playText: {
      margin: '0 5px', 
      fontSize: device === 'mobile' ? '12px' : '15px',
    }
	
  };


  const sinopsis = props.sinopsis < 175 ? props.sinopsis : props.sinopsis.slice(0, 175) + '...';

  return (
    <div style={styles.featuredCard} key={props.index}>
      <Link key={props.id} href={`/books/${props.slug}`}>
        <a 
          // @ts-ignore
          style={styles.link}>
          <div style={styles.imageContainer}>
            <Image
              src={props.cover_url}
              alt={props.slug}
              layout="responsive"
              width={50}
              height={50}
              loading="lazy"
            />
          </div>
          <div style={styles.text}>
            <h3 style={styles.title}>{props.name}</h3>
            <p style={styles.author}>{props.author}</p>
            <p style={styles.sinopsis}>{sinopsis}</p>
            <p style={styles.narrator}>Narrado por: {props.narrator}</p>
            <div style={styles.play}>
              <Image
                src={'https://firebasestorage.googleapis.com/v0/b/stream-readers-prod.appspot.com/o/icons%2FPlay-blue.png?alt=media&token=309e2d12-e4ea-43a4-a580-7322891126c7'}
                alt={props.slug}
                width={20}
                height={20}
              />
              <p style={styles.playText}>Escucha este título</p>
            </div>
          </div>
        </a>
      </Link>
			
    </div>
  );
};

export default Featured;