import React from 'react';
import {Box,Typography,Grid,Stack,Avatar} from '@mui/material';
import {useCart} from '../../context/cart';
import toast from 'react-hot-toast';

function ProductCart({product}) {
    const [cart,setCart] = useCart();

    const removeFromCart = (productId) => {
        let myCart = [...cart];
        let index = myCart.findIndex((item)=>item._id === productId);
        myCart.splice(index,1);
        setCart(myCart);
        localStorage.setItem('cart',JSON.stringify(myCart));
        toast.success("Deleted from cart");
    };

  return (
    <Grid item lg={12} sx={{padding:1,border:"0.3px solid #dedede"}}>
    <Grid container sx={{marginTop:"2em"}}>
        <Grid item lg={6}>
            <Avatar variant='square' src={`http://localhost:8000/api/product/photo/${product._id}`} sx={{width:"420px",height:"240px",padding:2}} />
        </Grid>
        <Grid item lg={6}>
            <Stack direction="column">
                <Typography sx={{marginTop:"2em",fontWeight:"bold"}}>
                    {product.name}
                </Typography>
                <Typography sx={{marginTop:"1em"}}>
                    {product.description}
                </Typography>
                <Box sx={{display:"flex",justifyContent:"space-between",marginTop:"1em"}}>
                        {product?.quantity >=1 ? (
                            <Typography sx={{color:"green"}}>
                                In Stock
                            </Typography>
                        ):(
                            <Typography sx={{color:"red"}}>
                                Out of Srock
                            </Typography>
                        )}
                </Box>
                <Typography sx={{marginTop:"1em",fontWeight:"bold"}}>
                    ${product?.price}
                </Typography>
                <Box sx={{marginTop:"auto",marginLeft:"auto",color:"red",cursor:"pointer"}} onClick={()=>removeFromCart(product._id)}>
                    Remove
                </Box>
            </Stack>
        </Grid>
    </Grid>
</Grid>
  )
}

export default ProductCart