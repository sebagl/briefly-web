import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context_providers/auth/authContext';
import { db } from '../../config/firebase';
import { collection, addDoc, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/router';

import { loadStripe } from '@stripe/stripe-js';
import { CircularProgress } from '@mui/material';

// It's good practice to move your Stripe key to an environment variable.
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY);

function CheckoutLoad(props) {
  const { currentUser } = useAuth();
  const [error, setError] = useState('');
  const router = useRouter();
  const { price } = router.query; 

  useEffect(() => {
    let unsubscribe;

    const createSession = async () => {
      try {
        const stripe = await stripePromise;

        const data = {
          price,
          locale: 'es',
          success_url: 'https://www.streamreaders.com/confirmation',
          cancel_url: window.location.origin,
          allow_promotion_codes: true,
          // trial_from_plan: false,
        };

        // Make sure currentUser.uid is not undefined
        if (!currentUser?.uid) throw new Error('User ID is undefined');

        const docRef = await addDoc(
          collection(db, 'customers', currentUser.uid, 'checkout_sessions'),
          data
        );

        unsubscribe = onSnapshot(docRef, (snap) => {
          const { error, sessionId } = snap.data();
          if (error) {
            setError(`An error occured: ${error.message}`);
          }
          if (sessionId) {
            stripe.redirectToCheckout({ sessionId });
          }
        });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
        setError(error.message);
      }
    };

    if (currentUser) {
      createSession();
    }

    // Clean up the onSnapshot listener when the component unmounts
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [currentUser, price]);

  return (
    <div className="loader">
      {error && (
        <p style={{ color: 'white' }}>
          Ha ocurrido un error, por favor intentalo de nuevo. {error}
        </p>
      )}
      {!error && <CircularProgress className="progress" />}
    </div>
  );
}

export default CheckoutLoad;
