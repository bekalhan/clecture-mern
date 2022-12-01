import React,{useState} from 'react';
import { useEffect } from 'react';
import {useAuth} from '../../context/auth';
import axios from 'axios';
import { Box, Button } from '@mui/material';
import { Grid, Typography,Stack,TextField } from '@mui/material';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

function Profile() {
    //hooks
    const [auth,setAuth] = useAuth();
    //state
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [address,setAdress] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        if(auth?.user){
            const {name,email,address} = auth?.user;
            setName(name);
            setEmail(email);
            setAdress(address);
        }
    },[auth?.user]);

    const handleSubmit = async  (e) =>{
        e.preventDefault();
        try{
            const {data} = await axios.put('http://localhost:8000/api/profile',{
                name,
                password,
                address
            },{
                headers:{
                    Authorization:auth?.token
                }
            });
            if(data?.error){
                toast.error(data?.error);
            }else{
                setAuth({...auth,user:data});
                //local storage update
                let ls = localStorage.getItem('auth');
                ls = JSON.parse(ls);
                ls.user = data;
                localStorage.setItem('auth',JSON.stringify(ls));
                toast.success("Profile updated");
                navigate('/cart')
            }
        }catch(err){
            console.log(err);
            toast.error("Profile update failed");
        }
    }


  return (
    <Box>
        <Grid container>
            <Grid item lg={3}></Grid>
            <Grid item lg={6}>
                <Typography sx={{display:"flex",justifyContent:"center",fontWeight:"bold",marginTop:"2em",backgroundColor:"#dedede"}}>Profile Update</Typography>
                <form onSubmit={handleSubmit}>
                <Stack direction="column" sx={{marginTop:"2em"}}>
                <TextField
                            id="outlined-basic"
                            label="Enter a name"
                            variant="outlined"
                            value={name}
                            onChange={(e)=>{setName(e.target.value)}}
                            autoFocus={true}
                            sx={{marginTop:{lg:"0.6em"}}}
                            />
                <TextField
                            id="outlined-basic"
                            label="Enter a email"
                            variant="outlined"
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            autoFocus={true}
                            disabled={true}
                            sx={{marginTop:{lg:"1em"}}}
                            />
                <TextField
                            id="outlined-basic"
                            label="Enter a password"
                            variant="outlined"
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            autoFocus={true}
                            type="password"
                            sx={{marginTop:{lg:"1em"}}}
                            />
                <TextField
                            id="outlined-basic"
                            label="Enter a address"
                            variant="outlined"
                            value={address}
                            onChange={(e)=>{setAdress(e.target.value)}}
                            autoFocus={true}
                            type="password"
                            multiline
                            rows={6}
                            sx={{marginTop:{lg:"1em"}}}
                            />
                <Button variant='contained' type='submit' sx={{marginTop:"2em"}}>
                    Update Profile
                </Button>                
                </Stack>
                </form>

            </Grid>
            <Grid item lg={3}></Grid>
        </Grid>
    </Box>
  )
}

export default Profile