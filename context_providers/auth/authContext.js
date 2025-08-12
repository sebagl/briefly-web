// @ts-nocheck
import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  onIdTokenChanged,
  sendPasswordResetEmail,
  signOut,
  updatePassword,
  updateEmail,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
} from 'firebase/auth';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import nookies from 'nookies';

const AuthContext = React.createContext({});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [userData, setUserData] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stripeRole, setStripeRole] = useState(null);
  const [userCredential, setUserCredential] = useState(null);

  const user = auth.currentUser;

  async function signup(email, password, name) {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    await setUsername(result.user, name);
    setUserCredential(result);
  }

  // Function for Google Sign-In
  async function googleSignin() {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
  
      setCurrentUser(result.user);
      authenticateUser(); 
      const firstName = result.user.displayName.split(' ')[0];
      
      await setUsername(result.user, firstName);
      
      // Create new user object
      const newUser = {
        user: {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result,
        }
      };
      
      setUserCredential(newUser);
      return result.user;
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  function setUsername(user, name) {
    return updateProfile(user, { displayName: name });
  }



  function login(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logout() {
    setCurrentUser(null);
    setIsAuthenticated(false);
    return signOut(auth);
  }

  function resetPassword(email) {
    return sendPasswordResetEmail(auth, email);
  }

  function changeEmail(email) {
    return updateEmail(user, email);
  }

  function changePassword(newPassword) {
    return updatePassword(user, newPassword);
  }

  function authenticateUser() {
    setIsAuthenticated(true);
  }

  const getUserData = async (userId) => {
    try {
      const res = await getDoc(userId);
      const user = res.data();
      setUserData(user);
    } catch (error) {
      console.log(error);
    }

  };

  // User token

  async function getCustomClaimRole() {
    (await auth.currentUser) && auth.currentUser.getIdToken(true);
    const decodedToken = await auth.currentUser.getIdTokenResult();
    setStripeRole(decodedToken.claims.stripeRole);
  }

  function createUserData(obj) {
    return setDoc(doc(db, 'users', user.uid), obj);
  }

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, async (user) => {
      if(user){
        const token = await user.getIdToken();
        setCurrentUser(user);
        nookies.set(undefined, 'token', token, { path: '/' });
      } else {
        setCurrentUser(null);
        nookies.set(undefined, 'token', '', { path: '/' });
      }

      setLoading(false);
    });
    return () => unsubscribe();
  });

  // force refresh the token every 10 minutes
  useEffect(() => {
    const handle = setInterval(async () => {
      const user = auth.currentUser;
      if (user) await user.getIdToken(true);
    }, 45 * 60 * 1000);

    // clean up setInterval
    return () => clearInterval(handle);
  }, []);

  useEffect(() => {
    if (currentUser) {
      getUserData(user.uid);
      getCustomClaimRole();
    }
  }, [currentUser]);

  const value = {
    currentUser,
    isAuthenticated,
    userData,
    stripeRole,
    userCredential,
    login,
    signup,
    googleSignin,
    logout,
    resetPassword,
    changeEmail,
    changePassword,
    authenticateUser,
    getUserData,
    createUserData,
    setUsername,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
