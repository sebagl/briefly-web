import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

const useBooks = () => {
  const [books, setBooks] = useState([]);
  const [loadingBooks, setLoadingBooks] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await getDocs(collection(db, 'books'));
        const fetchedBooks = res.docs.map((doc) => {
          const data = doc.data();
          return {
            ...data,
            id: doc.id,
          };
        });
        setBooks(fetchedBooks);
        setLoadingBooks(false);
      } catch (err) {
        setError(err);
        setLoadingBooks(false);
      }
    };
    
    fetchBooks();
  }, []);

  return { books, loadingBooks, error };
};

export default useBooks;
