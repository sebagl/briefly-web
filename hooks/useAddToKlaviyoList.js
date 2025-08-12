import { useState } from 'react';
import axios from 'axios';

const useAddToKlaviyoList = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const addToKlaviyoList = (emailData) => {
    setLoading(true);
    axios.post('/api/addToKlaviyoList', emailData) 
      .then(response => {
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  };

  return { loading, error, addToKlaviyoList };
};

export default useAddToKlaviyoList;
