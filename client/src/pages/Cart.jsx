import { Avatar, Box, Grid,Stack, Typography,Divider, Button } from '@mui/material';
import React from 'react';
import {useCart} from '../context/cart';
import {useAuth} from '../context/auth';
import CartEmpty from '../components/cartempty/CartEmpty';
import toast from 'react-hot-toast';
import {useNavigate} from 'react-router-dom';
import CartSidebar from '../components/cart/CartSidebar';
import ProductCart from '../components/cart/ProductCart';

function Cart() {
    //hook
    const [cart,setCart] = useCart();

    const navigate = useNavigate();

  return (
    <Box>
        <Grid container>
            {!cart.length >=1 ? (<CartEmpty />) : null}
                <Grid container>
                {cart.length >=1 ?(
                <Grid item lg={8}>
                    {cart?.map((product)=>(
                      <ProductCart product={product} />
                    ))}
                </Grid>
                ):null}
               <CartSidebar />
            </Grid>
        </Grid>
    </Box>
  )
}

export default Cart