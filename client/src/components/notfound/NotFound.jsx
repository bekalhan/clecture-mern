import React from 'react';
import {Avatar, Box} from '@mui/material';
import {useAuth} from '../../context/auth';
import {NavLink} from 'react-router-dom';
import notfound from '../../img/404.gif';



function NotFound() {
    const [auth,setAuth] = useAuth();

  return (
    <Box sx={{display:"flex",justifyContent:"center"}}>
        {!auth?.user ? (
        <NavLink to="/login" sx={{display:"flex",justifyContent:"center",backgroundColor:"red"}}>
        <Box sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                <Avatar
                sx={{marginTop:"5rem",width:"80%",height:"80%",display:"flex",justifyContent:"center"}}
                variant='square' src={notfound} />
        </Box>
        </NavLink>
        ):(
            <NavLink to="/dashboard" sx={{display:"flex",justifyContent:"center",backgroundColor:"red"}}>
            <Box sx={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <Avatar
                    sx={{marginTop:"5rem",width:"80%",height:"80%",display:"flex",justifyContent:"center"}}
                    variant='square' src={notfound} />
            </Box>
            </NavLink>
        )}
    </Box>
  )
}

export default NotFound