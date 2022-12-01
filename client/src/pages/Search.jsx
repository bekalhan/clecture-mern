import React from 'react';
import {useSearch} from '../context/search';
import {Box, Grid,Stack,Typography,Button,Badge,Avatar} from '@mui/material';
import NotFound from '../components/notfound/NotFound';
import DateFormatter from './utils/DateFormatter';

function Search() {
    const [values,setValues] = useSearch();
  return (
    <Box>
        {values?.results?.length < 1 ? 
            <NotFound /> :(
                <Grid container sx={{marginTop:"1em"}}>
                    {values?.results?.map((product)=>(
                                <Grid item lg={4} sx={{backgroundColor:"#ffffff"}}>
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
            )
        }

    </Box>
  )
}

export default Search