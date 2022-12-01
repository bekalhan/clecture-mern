import React, { useState } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import { useEffect } from 'react';
import {Avatar, Box,Grid,Stack,Typography,Button,Badge} from '@mui/material';
import DateFormatter from './utils/DateFormatter';
import Loading from '../components/routes/Loading';
import {useCart} from '../context/cart';
import toast from 'react-hot-toast';


function ProductView() {
    const [product,setProduct] = useState({});

    const params = useParams();

    //hook
    const [cart,setCart] = useCart();


    useEffect(()=>{
       loadProduct();
    },[]);

    console.log("params : ",params);

    const loadProduct = async () =>{
        try{
          console.log("girdi");
            const {data} = await axios.get(`http://localhost:8000/api/products/${params.slug}`);
            setProduct(data);
            console.log(data);
        }catch(err){
            console.log(err);
        }
    }

    console.log("pr",product);

  return (
    <Box>
        <Grid container>
          {product[0] ? ( <Grid item lg={12} sx={{backgroundColor:"",padding:10,marginTop:""}}>
              <Grid container>
                    <Grid item lg={5} sx={{backgroundColor:""}}>
                        <Avatar variant='square' src={`http://localhost:8000/api/product/photo/${product[0]._id}`} sx={{width:"100%",height:"100%"}} />
                        <Button variant='contained'sx={{width:"100%",marginTop:"1em"}} onClick={()=>{setCart([...cart,product]);toast.success('Added to cart')}}>Add to Cart</Button>
                    </Grid>
                    <Grid item lg={5} sx={{}}>
                      <Stack direction="column">
                          <Typography sx={{fontWeight:"bold",fontSize:"24px",display:"flex",justifyContent:"center"}}>
                            {product[0].name}
                          </Typography>
                          <Box sx={{display:"flex",justifyContent:"flex-start",marginLeft:"3em",marginTop:"1em"}}>
                            <Typography sx={{fontWeight:"100"}}>
                              {product[0].description}
                            </Typography>
                          </Box>
                          <Stack sx={{display:"flex",justifyContent:"space-between",marginTop:"1em",marginLeft:"3em"}}>
                                <Stack direction="row">
                                    <Typography>
                                      Category :  
                                    </Typography>
                                    <Typography sx={{marginLeft:"0.3em",fontWeight:"bold"}}>
                                      {product[0].category.name}
                                    </Typography>
                                    <Typography sx={{marginLeft:"8em"}}>
                                      <DateFormatter date={product[0].createdAt} />
                                    </Typography>
                                </Stack>
                          </Stack>
                          <Stack direction="row" sx={{display:"flex",justifyContent:"",marginTop:"1em",marginLeft:"3em"}}>
                                    <Typography>
                                      Quantity :  
                                    </Typography>
                                    <Typography sx={{marginLeft:"0.3em",fontWeight:"bold"}}>
                                      {product[0].quantity}
                                    </Typography>
                          </Stack>
                          <Stack direction="row" sx={{display:"flex",justifyContent:"",marginTop:"1em",marginLeft:"3em"}}>
                                    <Typography>
                                      Sold :  
                                    </Typography>
                                    <Typography sx={{marginLeft:"0.3em",fontWeight:"bold"}}>
                                      {product[0].sold}
                                    </Typography>
                          </Stack>
                          <Stack sx={{display:"flex",justifyContent:"center"}}>
                            <Button disabled sx={{width:"80%",color:"black",display:"flex",justifyContent:"center",marginLeft:"3em",marginTop:"3em"}} variant="contained">${product[0].price}</Button>
                          </Stack>
                      </Stack>
                    </Grid>
                  </Grid>
        </Grid>):<Loading />}
       
        </Grid>
    </Box>
  )
}

export default ProductView