import { useState } from 'react';
import { functions } from '../config/firebase';
import { httpsCallable } from 'firebase/functions';

const useSendEmail = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [result, setResult] = useState(null);

  const sendEmailFunction = httpsCallable(functions, 'sendEmail');


  const sendEmail = async (emailData) => {
    setLoading(true);
    try {
      const res = await sendEmailFunction(emailData);
      setResult(res.data);
      setError(null);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, result, sendEmail };
};

export default useSendEmail;
