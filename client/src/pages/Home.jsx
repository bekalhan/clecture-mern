import React, { useEffect, useState } from 'react';
import {useAuth} from '../context/auth';
import axios from 'axios';
import DateFormatter from './utils/DateFormatter';
import {Avatar, Box, Button, Grid, Typography} from '@mui/material';
import { Stack } from '@mui/system';
import Badge from '@mui/material/Badge';
import {NavLink} from 'react-router-dom';
import {useCart} from '../context/cart';
import toast from 'react-hot-toast';


function Home() {
    const [products,setProducts] = useState([]);
    const [total,setTotal] = useState(0);
    const [page,setPage] = useState(1);
    const [loading,setLoading] = useState(false);
    //hook
    const [cart,setCart] = useCart();

    useEffect(()=>{
      loadProducts();
      getTotal();
    },[]);

    useEffect(()=>{
      if(page===1) return;
      loadMore();
    },[page]);

    const getTotal = async () =>{
      try{
        const {data} = await axios.get("http://localhost:8000/api/products-count");
        setTotal(data);
      }catch(err){
        console.log(err);
      }
    }

    const loadProducts = async () =>{
      try{
        const {data} = await axios.get(`http://localhost:8000/api/list-products/${page}`);
        setProducts(data);
      }catch(err){
        console.log(err);
      }
    };

    const loadMore = async () =>{
      try{
        setLoading(true);
        const {data} = await axios.get(`http://localhost:8000/api/list-products/${page}`);
        setProducts([...products,...data]);
        setLoading(false);
      }catch(err){
        console.log(err);
        setLoading(false);
      }
    };

    console.log("cart items :",cart);



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
                          <Button variant='contained' sx={{width:"50%"}}>
                           <NavLink to={`/product/${product.slug}`} style={{textDecoration:"none",color:"white"}}>
                               View Product
                            </NavLink>
                          </Button>
                          <Button variant='contained' sx={{width:"50%",marginLeft:"0.2em"}} onClick={()=>{setCart([...cart,product]);toast.success('Added to cart');localStorage.setItem("cart",JSON.stringify([...cart,product]))}}>
                            Add to Cart
                          </Button>
                      </Stack>
                    </Stack>
                </Grid>
              ))}
            </Grid>
            <Box sx={{display:"flex",justifyContent:"center",marginTop:"2rem",marginBottom:"2rem"}}>
            {products && products.length < total && (
            <Button
            variant='contained'
              disabled={loading}
              onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}
              sx={{backgroundColor:"orange"}}
            >
              {loading ? "Loading..." : "Load more"}
            </Button>
          )}
            </Box>
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
                          <Button variant='contained' sx={{width:"50%",marginLeft:"0.2em"}} onClick={()=>{setCart([...cart,product]);toast.success('Added to cart');localStorage.setItem("cart",JSON.stringify([...cart,product]))}}>Add to Cart</Button>
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