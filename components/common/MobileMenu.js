import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context_providers/auth/authContext';
import { faTimes, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from './buttons/Button';

function MobileMenu(props) {
  const dropdownRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const onClick = () => setIsActive(!isActive);

  // @ts-ignore
  const { currentUser, logout, stripeRole } = useAuth();
  useEffect(() => {}, [isActive]);

  useEffect(() => {
    if (isActive) {
      onClick();
    }
  }, [props.loginIsOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  function handleContact() {
    onClick();
    props.toggleContact();
  }
  function handlePerfil() {
    onClick();
    props.togglePerfil();
  }

  function handleLogout() {
    onClick();
    logout();
  }

  return (
    <div className="mobile-menu-container">
      {
        scrollY < window.innerHeight && !props.landing ? ( 
          <button onClick={onClick} className="menu-trigger">
            {isActive && <FontAwesomeIcon icon={faTimes} />}
            {!isActive && <FontAwesomeIcon icon={faBars} />}
          </button>
        ) : !currentUser ? (
          <Button size="small" variant="callToAction" text="Prueba por $0.00" rounded onClick={() => props.handleConvertion()} />
        ) : currentUser && !stripeRole ? (
          <Button size="small" variant="callToAction" text="Completa el Pago" rounded onClick={() => props.handleConvertion()} />
        ) : (
          null
        )
      }
    
      <div
        ref={dropdownRef}
        className={`mobile-menu ${isActive ? 'active' : 'inactive'}`}
      >
        <ul>
          <li>
            <Link href="/#books" className="link">
							AUDIOLIBROS
            </Link>
          </li>
          {!currentUser && (
            <li className={`${!currentUser ? '' : 'hidden'}`}>
              <Link href="/suscribete" className="link">
								SUSCRÍBETE
              </Link>
            </li>
          )}
          <li>
            <Link href="/blog" className="link">
							BLOG
            </Link>
          </li>
          <li>
            <Link href="/autores" className="link">
							AUTORES
            </Link>
          </li>
          <li>
            <button style={{fontWeight: 'bold'}} onClick={handleContact}>CONTACTO</button>
          </li>
          {currentUser ? (
            <>
              <li>
                <button onClick={handlePerfil}>PERFIL</button>
              </li>
              <li>
                <button onClick={handleLogout}>CERRAR SESIÓN</button>
              </li>
            </>
          ) : (
            <li>
              <Button onClick={props.toggleLogin} size="small" variant="primary" text="INICIAR SESIÓN" rounded/>
            </li>
          )
          }
									
        </ul>
      </div>
    </div>
  );
}

export default MobileMenu;
