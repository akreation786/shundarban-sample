import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState} from "react";
import { useEffect } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import { Route, Redirect } from 'react-router-dom';



firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();

// Redirect auth 
export const PrivateRoute = ({ children, ...rest }) => {
   const auth = useAuth();
   return (
     <Route
       {...rest}
       render={({ location }) =>
         auth.user ? (
           children
         ) : (
           <Redirect
             to={{
               pathname: "/login",
               state: { from: location }
             }}
           />
         )
       }
     />
   );
}

export const AuthContextProvider = (props) => {
   const auth = Auth();
   return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext);

const getUser = user => {
   const {displayName, email, photoURL} = user;
   return {Name: displayName, email, Photo: photoURL};
}

const Auth = () => {
   const [user, setUser] = useState(null);
   
   const signInWithGoogle = () => {
      const provider = new firebase.auth.GoogleAuthProvider();
      return firebase.auth().signInWithPopup(provider)
      .then(res => {
         const signedInUser = getUser(res.user);
         setUser(signedInUser);
         return res.user;
      })
      .catch(err => {
         setUser(null);
         return err.message;
      })
   }

   const signOut = () => {
      return firebase.auth().signOut().then(function() {
         setUser(null);
         return true;
       }).catch(function(error) {
         console.log(error);
         return false;
       });
   }

   useEffect(() => {
      firebase.auth().onAuthStateChanged(function(usr) {
         if (usr) {
            const currentUser = getUser(usr);
            setUser(currentUser);
           console.log(usr);
         } else {
           // No user is signed in.
         }
       });
   }, [])
   
   return {
      user,
      signInWithGoogle,
      signOut
   }
}

export default Auth;