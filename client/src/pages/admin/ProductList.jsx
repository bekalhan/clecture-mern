import React from 'react';
import {Avatar, Box, Grid,Stack, Typography} from '@mui/material';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import DateFormatter from '../utils/DateFormatter';

function ProductList() {
    const [productList,setProductList] = useState([]);

    useEffect(()=>{
        loadProducts();
    },[])

    const loadProducts = async () =>{
        try{
            const {data} = await axios.get('http://localhost:8000/api/products');
            setProductList(data);
        }catch(err){
            console.log(err);
        }
    }

  return (
    <Box>
        <Grid container spacing={3} sx={{padding:6}}>
            {productList?.map((product)=>(
            <Grid item lg={6} sx={{marginTop:"3em",width:"100%",height:"100%",backgroundColor:"#ffffff"}}>
                <Stack direction="column">
                     <Avatar variant="square" src={`http://localhost:8000/api/product/photo/${product._id}`} sx={{width:"100%",height:"100%"}} />
                    <Stack direction="row" sx={{display:"flex",justifyContent:"space-between",padding:4}}>
                        <Typography>
                            {product?.name}
                        </Typography>
                        <Typography>
                            ${product?.price}
                        </Typography>
                    </Stack>
                    <Typography sx={{padding:2}}>
                        {product?.description}
                    </Typography>
                    <Typography sx={{padding:2}}>
                        Release Date :   <DateFormatter date={product?.createdAt} />
                    </Typography>
                </Stack>
            </Grid>
            ))}
            
        </Grid>

    </Box>
  )
}

export default ProductList