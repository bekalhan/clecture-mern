import { Avatar, Box } from '@mui/material'
import React from 'react';
import cartempty from '../../img/emptycart.png';
import {NavLink} from 'react-router-dom';


function CartEmpty() {
  return (
        <Box sx={{display:"flex",justifyContent:"center",width:"100%",backgroundColor:"",marginTop:"5rem"}}>
            <NavLink to="/" sx={{display:"flex",justifyContent:"center"}}>
                    <Avatar variant='square' src={cartempty} sx={{width:"500px",height:"500px"}}  />
            </NavLink>

        </Box>
  )
}

export default CartEmpty