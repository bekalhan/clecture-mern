import React from 'react';
import {useAuth} from '../context/auth';

function Home() {
    const [auth,setAuth] = useAuth();
  return (
    <div>
        This is Home Page
    </div>
  )
}

export default Home