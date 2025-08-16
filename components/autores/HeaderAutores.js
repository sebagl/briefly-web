// @ts-nocheck
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import styles from './autores.module.css';
import Image from 'next/image';
import Link from 'next/link';

const useStyles = makeStyles(() => ({
  menuItem: {
    marginLeft: '1em',
    textDecoration: 'none',
    color: 'rgba(0, 0, 0, 0.7);',
    fontWeight: 'bold',
    '&:hover': {
      color: 'lightpink',
    },
  },
  hidden: {
    display: 'none',
  },
  header: {
    backgroundColor: 'rgba(255,255,255,1)',
    padding: '0 4em',
  },
  toolbar: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
  },
  logo: {
    width: '10em',
    [useTheme().breakpoints.down('sm')]: {
      width: '7em',
    },
  },
  social: {
    display: 'flex',
    justifyContent: 'space-arround',
  },

  user: {
    display: 'flex',
    cursor: 'pointer',
    height: '100%',
  },
  userMenu: {
    textDecoration: 'none',
    alignItems: 'center',
    justifContent: 'space-between',
    flexDirection: 'column',
    listStyle: 'none',
    position: 'absolute',
    top: '85%',
    left: '77%',
    cursor: 'pointer',
  },
}));

function HeaderAutores() {
  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link href={'/'}>
          <a>
            <Image
              src="/assets/LogoBriefly.png"
              alt="Briefly logo"
              width={150}
              height={100}
              style={{ width: '140px', height: 'auto' }}
            />
          </a>
        </Link>
      </div>
    </div>
  );
}

export default HeaderAutores;
