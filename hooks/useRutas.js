import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

const useRutas = (books) => {
  const [rutas, setRutas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRutas = async () => {
      try {
        const rutasRef = collection(db, 'rutas');
        const rutasSnapshot = await getDocs(rutasRef);
        const rutasData = rutasSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
          books: doc.data().content
            .map(bookId => books?.find(book => book.id === bookId))
            .filter(Boolean) // Remove any undefined values
        }));
        setRutas(rutasData);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching rutas:', err);
        setError(err);
        setLoading(false);
      }
    };

    if (books?.length > 0) {
      fetchRutas();
    }
  }, [books]);

  return { rutas, loading, error };
};

export default useRutas;
