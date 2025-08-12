// @ts-nocheck
import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import MobileMenu from './MobileMenu';
import { useAuth } from '../../context_providers/auth/authContext';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useModalsContext } from '../../context_providers/modalsState/modalsStateContext';
import styles from './common.module.css';
import Button from './buttons/Button';

function Header(props) {
  const [isUserMenuVisible, setIsUserMenuVisible] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);
  const { currentUser, logout } = useAuth();
  const userMenu = useRef();
  const router = useRouter();

  const { loginIsOpen, toggleLogin, toggleContact, togglePerfil, toggleRegister } =
		useModalsContext();

  function toggleUserMenu() {
    setIsUserMenuVisible(prevstate => !prevstate);
  }

  function handleLogout() {
    setIsUserMenuVisible(false);
    logout();
    router.push('/');
  }

  const handleClick = (event) => {
    if (isUserMenuVisible && userMenu.current && !userMenu.current.contains(event.target)) {
      setIsUserMenuVisible(false);
    }
  };

  const getUsername = (user) => {
    // If we have user name the return it
    if(user.displayName){
      return user.displayName;
    }
    // If not we get the username form the email
    let str = user.email;
    let username = str.match(/^([^@]*)@/)[1];
    return username;

  };

  // Logic to hide userMenu on click outside 
  useEffect(() => {	
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, [isUserMenuVisible]);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Determine the scroll direction
      if (currentScrollY > lastScrollY) {
        // Scrolling down
        setHeaderVisible(false);
      } else {
        // Scrolling up
        setHeaderVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const desktopMenu = () => {
    return (
      <ul className={styles.desktopMenu}>
        {!props.landing && ( <><li>
          <Link href="/#books" className="link">
      Audiolibros
          </Link>
        </li>

        <li>
          <Link href="/blog" className={styles['link']}>
      Blog
          </Link>
        </li>
        <li>
          <Link href="/autores">
            <a>Autores</a>
          </Link>
        </li>
        <li>
          <button onClick={toggleContact}>Contacto</button>
        </li></>)}
        {currentUser 
          ? (
            <div style={{display: 'flex', alignItems: 'center'}}>
              <p className="hola" style={{marginRight: '5px'}}>
                <span className={styles['orange']}> Hola</span>{' '}
                <span style={{color: '#fff'}}>
                  {currentUser && getUsername(currentUser).split(' ')[0]}
                </span>
              
              </p>
            
              <FontAwesomeIcon onClick={toggleUserMenu} icon={faChevronDown} style={{ fontSize: '15px', color: '#fff', cursor: 'pointer' }} />
            </div>
          ) : 
          <div style={{display: 'flex', justifyContent: 'space-between', width: '295px'}}>
            <Button onClick={toggleLogin} size="small" variant="primary" text="Iniciar Sesión" rounded/>						
            <Button size="small" variant="callToAction" text="Prueba por $0.00" rounded onClick={()=>props.handleConvertion()}/>	
          </div>
        
        }
        <div ref={userMenu}>
          {isUserMenuVisible
            ? (
              <ul
                className={styles.userMenu}
                style={{display: `${isUserMenuVisible ? 'block' : ' hidden'}`}}
              >
                <li>
                  <Button size="small" variant="primary" onClick={togglePerfil} text="Perfil"/>
                </li>
                <li>
                  <Button size="small" onClick={handleLogout} variant="primary" text="Cerrar Sesión"/>
                </li>
              </ul>
            ) : null
          }
        </div>
      
  
      </ul>
    );
  };

  const mobileMenu = () => {
    return (
      <MobileMenu
        toggleContact={toggleContact}
        togglePerfil={togglePerfil}
        loginIsOpen={loginIsOpen}
        toggleLogin={toggleLogin}
        toggleRegister={toggleRegister}
        handleConvertion={props.handleConvertion}
        landing={props.landing}
      />
    );
  };


  return (
    <div className={`${styles.header} ${headerVisible ? styles.visible : styles.hidden}`}>
      <Link href="/">
        <a className={styles.logoHome}>
          <Image
            src="https://firebasestorage.googleapis.com/v0/b/stream-readers-prod.appspot.com/o/img%2Flogo.png?alt=media&token=078e0fb8-76c4-425a-ac95-532a6ee1fcaa"
            alt="logo"
            width={200}
            height={50}
          />
        </a>
      </Link>
      
      {desktopMenu()}
      {mobileMenu()}
      
    </div>
  );
}

export default Header;
