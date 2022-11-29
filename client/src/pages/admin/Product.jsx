import React,{useState} from 'react';
import { useEffect } from 'react';
import axios from "axios";
import toast from 'react-hot-toast';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {Box,Stack,Grid, Typography,TextField, Button, Avatar} from '@mui/material';
import {useAuth} from '../../context/auth';
import {useNavigate} from 'react-router-dom';



function Product() {
    const [auth,setAuth] = useAuth();
    const [categories,setCategories] = useState([]);
    const [photo,setPhoto] = useState("");
    const [name,setName] = useState(""); //
    const [description,setDescription] = useState(""); //
    const [price,setPrice] = useState(""); //
    const [category,setCategory] = useState(""); //
    const [shipping,setShipping] = useState(""); //
    const [quantity,setQuantity] = useState("");

    const navigate = useNavigate();


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
    }

    const handleChange = (event) =>{
        setCategory(event.target.value);
    }

    const handleShipChange = (event) =>{
        setShipping(event.target.value);
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const productData = new FormData();
            productData.append("photo",photo);
            productData.append("name",name);
            productData.append("description",description);
            productData.append("price",price);
            productData.append("category",category);
            productData.append("shipping",shipping);
            productData.append("quantity",quantity);

            console.log([...productData]);

            const {data} = await axios.post("http://localhost:8000/api/product",productData,{
                headers:{
                    Authorization:auth?.token
                }
            });

            if(data?.error){
                toast.error(data?.error);
            }else{
                toast.success("Product created successfully");
                window.location.reload();
                navigate('/dashboard/admin/product-list');
            }

        }catch(err){
            console.log("err");
            toast.error("Create product failed");
        }
    }



  return (
    <Box sx={{padding:8}}>
        <Stack direction="column">
        <form onSubmit={handleSubmit}>
            <Grid container>
                {photo && (
                    <Box sx={{width:"100%",display:"flex",justifyContent:"center"}}>
                    <Grid container sx={{display:"flex",justifyContent:"center"}}>
                        <Grid item lg={12} sx={{display:"flex",justifyContent:"center"}}>
                            <Avatar variant='square' src={URL.createObjectURL(photo)} sx={{width:{lg:"140px",md:"120px",sm:"80px",xs:"60px"},height:{lg:"140px",md:"120px",sm:"80px",xs:"60px"}}} />
                        </Grid>
                    </Grid>
                    </Box>
                )}
                <Grid item lg={12} md={12} sm={12} xs={12} sx={{display:"flex",justifyContent:"center",textAlign:"center"}}>
                <Button sx={{width:"100%",display:"flex",justifyContent:"center",textAlign:"center"}}>
                    {"Upload Photo"}
                   <input
                        type="file"
                        name="photo"
                        accept='image/*'
                        onChange={(e)=>setPhoto(e.target.files[0])}
                        style={{width:"100%"}}
                        />
                </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Stack direction="column">
                        <Typography sx={{fontWeight:"bold"}}>
                            Name
                        </Typography>
                        <TextField
                        id="outlined-basic"
                        label="Enter a name"
                        variant="outlined"
                        value={name}
                        onChange={(e)=>{setName(e.target.value)}}
                        sx={{marginTop:{lg:"0.6em"}}}
                        />
                    </Stack>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                    <Stack direction="column">
                            <Typography sx={{fontWeight:"bold"}}>
                                Price
                            </Typography>
                            <TextField
                            id="outlined-basic"
                            label="Enter a price"
                            variant="outlined"
                            value={price}
                            onChange={(e)=>{setPrice(e.target.value)}}
                            sx={{marginTop:{lg:"0.6em"}}}
                            />
                    </Stack>
                </Grid>
            </Grid>
            <Grid container sx={{marginTop:"1em"}}>
                <Grid lg={12} md={12} sm={12} xs={12}>
                    <Stack direction="column">
                        <Typography sx={{fontWeight:"bold"}}>
                            Description
                        </Typography>
                        <TextField
                        id="outlined-basic"
                        label="Enter a description"
                        variant="outlined"
                        value={description}
                        onChange={(e)=>{setDescription(e.target.value)}}
                        sx={{marginTop:{lg:"0.6em"}}}
                        />
                    </Stack>
                </Grid>
            </Grid>
            <Grid container spacing={2} sx={{marginTop:"1em"}}>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                <Stack direction="column">
                <Typography sx={{fontWeight:"bold"}}>
                    Select Category
                </Typography>
                <FormControl sx={{minWidth: "100%",marginTop:"0.6em" }}>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={category}
                            onChange={handleChange}
                            sx={{}}
                            label="Age"
                        >
                            {categories?.map((category)=>(
                                <MenuItem value={category._id}>{category?.name}</MenuItem>
                            ))}
                        </Select>
                </FormControl>
                </Stack>
                </Grid>
                <Grid item lg={6} md={6} sm={6} xs={12}>
                <Stack direction="column">
                <Typography sx={{fontWeight:"bold"}}>
                    Select Shipping
                </Typography>
                <FormControl sx={{minWidth: "100%",marginTop:"0.6em" }}>
                        <Select
                            labelId="demo-simple-select-autowidth-label"
                            id="demo-simple-select-autowidth"
                            value={shipping}
                            onChange={handleShipChange}
                            sx={{}}
                            label="Age"
                        >
                        <MenuItem value="true">Yes</MenuItem>
                        <MenuItem value="false">No</MenuItem>
                        </Select>
                </FormControl>
                </Stack>
                </Grid>
            </Grid>
            <Grid container sx={{marginTop:"1em"}}>
                <Grid lg={12} md={12} sm={12} xs={12}>
                    <Stack direction="column">
                        <Typography sx={{fontWeight:"bold"}}>
                            Quantity
                        </Typography>
                        <TextField
                        id="outlined-basic"
                        label="Enter a quantity"
                        variant="outlined"
                        value={quantity}
                        onChange={(e)=>{setQuantity(e.target.value)}}
                        sx={{marginTop:{lg:"0.6em"}}}
                        />
                    </Stack>
                </Grid>
            </Grid>
            <Grid container sx={{marginTop:"2em"}}>
                <Grid item lg={12} md={12} sm={12} xs={12}>
                    <Button sx={{width:"100%"}} variant='outlined' type='submit'>Create New Product</Button>
                </Grid>
            </Grid>
        </form>
        </Stack>
    </Box>
  )
}

export default Product