import React,{useEffect, useState} from 'react';
import axios from 'axios';
import {Box, Grid,Stack,Typography,Button,Badge,Avatar} from '@mui/material';
import DateFormatter from './utils/DateFormatter';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import {prices} from '../prices';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControl from '@mui/material/FormControl';

function Shop() {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [checked, setChecked] = useState([]); // categories
    const [radio, setRadio] = useState([]); // radio

    useEffect(()=>{
        if(!checked.length || !radio.length){
            loadProducts();
        }
    },[]);

    const loadProducts = async () =>{
        try{
            const {data} = await axios.get('http://localhost:8000/api/products');
            setProducts(data);
        }catch(err){
            console.log(err);
        }
    };

    useEffect(()=>{
        loadCategories();
    },[]);

    const loadCategories = async () =>{
        try{
            const {data} = await axios.get("http://localhost:8000/api/categories");
            setCategories(data);
        }catch(err){
            console.log(err);
        }
    };

    const handleCheck = (value,id) =>{
        let all = [...checked];
        if(value){
            all.push(id);
        }else{
            all = all.filter((c)=> c!== id);
        }
        setChecked(all);
    }

    useEffect(()=>{
        if(checked.length || radio.length){
            loadFilteredProducts();
        }
    },[checked,radio]);

    const loadFilteredProducts = async () =>{
        try{
            console.log("load filtered pro chec : ",radio);
            const {data} = await axios.post("http://localhost:8000/api/filtered-products",{
                checked : checked,
                radio
            });
            setProducts(data);
        }catch(err){
            console.log(err);
        }
    }


  return (
    <Box>
        <Grid container>
            <Grid item lg={3}>
                <Stack>
                    <Box sx={{display:"flex",justifyContent:"center"}}>
                        <Typography sx={{marginTop:"2em"}}>
                                Filter By Category
                        </Typography>
                    </Box>
                        <FormGroup sx={{marginLeft:"2em",marginTop:"1em"}}>
                            {/* <FormControlLabel control={<Checkbox />} label="Label" />
                            <FormControlLabel control={<Checkbox />} label="Disabled" /> */}
                            {categories?.map((category)=>(
                                <FormControlLabel
                                key={category?._id}
                                control={<Checkbox />}
                                label={category?.name}
                                onChange={(e)=>{handleCheck(e.target.value,category._id)}}
                                />
                            ))}
                        </FormGroup>
                </Stack>
                <Stack>
                    <Box sx={{display:"flex",justifyContent:"center"}}>
                        <Typography sx={{marginTop:"2em"}}>
                            Filter By Price
                        </Typography>
                    </Box>
                    <FormControl sx={{marginLeft:"2em",marginTop:"1em"}}>
                        <RadioGroup onChange={(e)=>{setRadio(e.target.value)}}>
                            {prices?.map((price)=>(
                                <FormControlLabel  value={price.array} control={<Radio />} label={price.name} />
                            ))}
                        </RadioGroup>
                    </FormControl>
                </Stack>
                <Stack>
                    <Button variant='outlined' sx={{margin:5}} onClick={()=>{window.location.reload()}}>
                        Reset
                    </Button>
                </Stack>
            </Grid>
            <Grid item lg={9} sx={{overflow:"scroll"}}>
                <Grid container>
                    {products?.map((product)=>(
                                        <Grid item lg={6} sx={{backgroundColor:"#ffffff"}}>
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

export default Shop