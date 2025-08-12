import React, { useState, useContext } from 'react';
import { db } from '../../config/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore'; 

const BookProgressContext = React.createContext({});

export function useBookProgressContext() {
  return useContext(BookProgressContext);
}

export function BookProgressProvider({ children }) {

  const getProgressFromFirestore = async (userId) => {
    const docRef = doc(db, 'progress', userId);
    const docSnap = await getDoc(docRef);
    return docSnap.data();
  };


  const postProgressToFirestore = async (progress, userId, book) => {
    const data = {
      [book]: progress
    };
    const booksRef = doc(db, 'progress', userId);
		
    setDoc(booksRef, data, { merge: true });
  };
	

  const value = {
    postProgressToFirestore,
    getProgressFromFirestore
  };

  return (
    <BookProgressContext.Provider value={value}>{children}</BookProgressContext.Provider>
  );
}
