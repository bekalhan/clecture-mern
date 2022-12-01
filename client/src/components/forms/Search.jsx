import React from 'react';
import {Paper,Divider,InputBase,IconButton, Button, Badge} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import { useState } from 'react';
import axios from 'axios';
import {useSearch} from '../../context/search';
import {useNavigate} from 'react-router-dom';
import {useCart} from '../../context/cart';
import {NavLink} from 'react-router-dom';



function Search() {
    const [keywords,setKeywords] = useState('');
    const [result,setResults] = useState([]);
    //hook
    const [values,setValues] = useSearch();
    const [cart,setCart] = useCart();


    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        try{
            const {data} = await axios.get(`http://localhost:8000/api/product/search/${values.keyword}`);
            setValues({...values,results:data});
            navigate('/search');
        }catch(err){
            console.log(err);
        }
    }

  return (
    <Paper
        component="form"
        sx={{display: 'flex', alignItems: 'center', width: 300,marginLeft:{lg:"3em",md:"2em",sm:"3em"},borderRadius:"30px"}}
        >
        <IconButton onClick={()=>handleSubmit()} sx={{ p: '10px' }} aria-label="menu">
            <SearchIcon />
        </IconButton>
        <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search google maps' }}
            size="small"
            onChange={(e)=>setValues({...values,keyword:e.target.value})}
            value={values.keywords}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton  sx={{ p: '10px',color:"black" }} aria-label="directions">
        <NavLink to="/cart" style={{textDecoration:"none",color:"black"}}>
            <Badge badgeContent={cart?.length >=1 ? cart.length : null} color="primary">
                    <ShoppingBasketIcon />
            </Badge>
        </NavLink>
        </IconButton>
   </Paper>
  )
}

export default Search