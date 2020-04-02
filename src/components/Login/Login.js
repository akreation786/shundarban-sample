import React from 'react';
import Auth from './useAuth';

const Login = () => {
   const auth = Auth();
   const handleSignIng = () => {
      auth.signInWithGoogle()
      .then(res => {
         window.location.pathname = "/review";
      })
   }
   const handleSignOut = () => {
      auth.signOut()
      .then(res => {
         window.location.pathname= "/"
      }) 
   }
   return (
      <div>
         <h3>Joining the Party</h3>
         {
            auth.user ? <button onClick={handleSignOut} >Sign Out</button> :
            <button onClick={handleSignIng} >Sign In Google</button>
         }
      </div>
   );
};

export default Login;