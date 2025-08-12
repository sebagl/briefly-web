// @ts-nocheck
import React from 'react';
import { doc, collection, query, where, getDocs, getDoc } from 'firebase/firestore';
import Book from '../../../components/book/Book';
import { db, auth } from '../../../config/firebase';
import { firebaseAdmin  } from '../../../config/firebaseAdmin';
import Header from '../../../components/common/Header';
import Contact from '../../../components/modals/Contact';
import LoginModal from '../../../components/modals/LoginModal';
import Perfil from '../../../components/modals/PerfilModal';
import { useModalsContext, useBookProgressContext } from '../../../context_providers';
import { getAuth, getIdToken } from 'firebase/auth';
import nookies from 'nookies';


export async function getServerSideProps(context) {
  // Get Books from firestore
  const slug = context.params.slug;
  const res = await getDocs(
    query(collection(db, 'books'), where('slug', '==', slug))
  );
  const bookData = res.docs.map((doc) => doc.data())[0];

  // Get progressData from firestore 
  const cookies = nookies.get(context);

  let progressData = {};

  if(cookies.token){
    const token = await firebaseAdmin.auth().verifyIdToken(cookies.token);
    const { uid } = token;
	
    const docRef = doc(db, 'progress', uid);
    const docSnap = await getDoc(docRef);
    progressData = docSnap.data() || {};
  }
	

  return {
    props: {
      bookData,
      progressData
    },
  };
}

export default function BookPage({ bookData, progressData }) {
  const {
    contactIsOpen,
    loginIsOpen,
    perfilIsOpen,
    toggleLogin,
    toggleContact,
    togglePerfil,
  } = useModalsContext();

  return (
    <div className="book">
      <Header />
      <Book bookData={bookData} progressData={progressData}/>
      <Contact isOpen={contactIsOpen} toggle={toggleContact} />
      <LoginModal isOpen={loginIsOpen} toggle={toggleLogin} />
      <Perfil isOpen={perfilIsOpen} toggle={togglePerfil} />
    </div>
  );
}
