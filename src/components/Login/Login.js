import React from 'react';
import Auth from './useAuth';

const Login = () => {

   const auth = Auth();
   console.log(auth);

   return (
      <div>
         <h3>Joining the Party</h3>
         {
            auth.user ? <button onClick={auth.signOut} >Sign Out</button> :
            <button onClick={auth.signInWithGoogle} >Sign In Google</button>
         }
      </div>
   );
};

export default Login;