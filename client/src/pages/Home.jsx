import React, { useEffect, useState } from 'react';
import {useAuth} from '../context/auth';
import axios from 'axios';
import DateFormatter from './utils/DateFormatter';
import {Avatar, Box, Button, Grid, Typography} from '@mui/material';
import { Stack } from '@mui/system';
import Badge from '@mui/material/Badge';


function Home() {
    const [auth,setAuth] = useAuth();
    const [products,setProducts] = useState([]);

    useEffect(()=>{
      loadProducts();
    },[]);

    const loadProducts = async () =>{
      try{
        const {data} = await axios.get('http://localhost:8000/api/products');
        setProducts(data);
      }catch(err){
        console.log(err);
      }
    };

    const arr = [...products];
    const  sortedBySold = arr?.sort((a,b)=>(a.sold < b.sold? 1 : -1));

  return (
    <Box sx={{backgroundColor:""}}>
        <Grid container>
          <Grid item lg={6}>
            <Grid container>
              <Typography sx={{paddingLeft:8,paddingRight:10,paddingTop:6,fontSize:{lg:"32px"},fontWeight:"100"}}>New Lectures</Typography>
              {products?.map((product)=>(
                <Grid item lg={12} sx={{backgroundColor:"#ffffff"}}>
                    <Stack direction="column">
                    <Badge badgeContent={product?.sold} color="secondary" sx={{marginRight:"4rem",marginTop:"3rem"}}>
                      <Avatar variant='square' src={`http://localhost:8000/api/product/photo/${product._id}`} sx={{width:"80%",height:"80%",paddingLeft:8,paddingRight:8,paddingTop:5}} />
                      </Badge>
                      <Stack direction="row" sx={{display:"flex",justifyContent:"space-between",paddingLeft:8,paddingRight:10,paddingTop:4}}>
                            <Typography>
                                {product?.name}
                            </Typography>
                            <Stack direction="row" sx={{}}>
                            <Typography sx={{backgroundColor:"purple",borderRadius:"30px",padding:1,color:"white"}}>
                              {product?.quantity >= 1 ? 'In stock' : 'Out of Stock'}
                            </Typography>
                            <Typography sx={{marginTop:"0.4em",marginLeft:"0.2em",fontWeight:"bold"}}>
                              ${product?.price}
                            </Typography>
                            </Stack>
                      </Stack>
                      <Box sx={{paddingLeft:8,paddingRight:10,paddingTop:4}}>
                        <Typography>
                            {product?.description?.substring(0,80)}...
                        </Typography>
                      </Box>
                      <Typography sx={{paddingLeft:8,paddingRight:10,paddingTop:4}}>
                        <DateFormatter date={product?.createdAt} />
                      </Typography>
                      <Stack direction="row" sx={{paddingLeft:8,paddingRight:10,paddingTop:4}}>
                          <Button variant='contained' sx={{width:"50%"}}>View Product</Button>
                          <Button variant='contained' sx={{width:"50%",marginLeft:"0.2em"}}>Add to Cart</Button>
                      </Stack>
                    </Stack>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item lg={6}>
            <Grid container>
              <Typography sx={{paddingLeft:8,paddingRight:10,paddingTop:6,fontSize:{lg:"32px"},fontWeight:"100"}}>Best Sellers</Typography>
              {sortedBySold?.map((product)=>(
                <Grid item lg={12} sx={{backgroundColor:"#ffffff"}}>
                    <Stack direction="column">
                    <Badge badgeContent={product?.sold} color="secondary" sx={{marginRight:"4rem",marginTop:"3rem"}}>
                      <Avatar variant='square' src={`http://localhost:8000/api/product/photo/${product._id}`} sx={{width:"80%",height:"80%",paddingLeft:8,paddingRight:8,paddingTop:5}} />
                      </Badge>
                      <Stack direction="row" sx={{display:"flex",justifyContent:"space-between",paddingLeft:8,paddingRight:10,paddingTop:4}}>
                            <Typography>
                                {product?.name}
                            </Typography>
                            <Stack direction="row" sx={{}}>
                            <Typography sx={{backgroundColor:"purple",borderRadius:"30px",padding:1,color:"white"}}>
                              {product?.quantity >= 1 ? 'In stock' : 'Out of Stock'}
                            </Typography>
                            <Typography sx={{marginTop:"0.4em",marginLeft:"0.2em",fontWeight:"bold"}}>
                              ${product?.price}
                            </Typography>
                            </Stack>
                      </Stack>
                      <Box sx={{paddingLeft:8,paddingRight:10,paddingTop:4}}>
                        <Typography>
                            {product?.description?.substring(0,80)}...
                        </Typography>
                      </Box>
                      <Typography sx={{paddingLeft:8,paddingRight:10,paddingTop:4}}>
                        <DateFormatter date={product?.createdAt} />
                      </Typography>
                      <Stack direction="row" sx={{paddingLeft:8,paddingRight:10,paddingTop:4}}>
                          <Button variant='contained' sx={{width:"50%"}}>View Product</Button>
                          <Button variant='contained' sx={{width:"50%",marginLeft:"0.2em"}}>Add to Cart</Button>
                      </Stack>
                    </Stack>
                </Grid>
              ))}
            </Grid>
          </Grid>
        </Grid>
    </Box>
  )
}

export default Home