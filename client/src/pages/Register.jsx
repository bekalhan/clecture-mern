import React,{useState} from 'react';
import {Grid,Stack, Typography,TextField,Button,Avatar} from '@mui/material';
import BackpackIcon from '@mui/icons-material/Backpack';
import img from '../img/img.jpeg';
import axios from 'axios';
import toast,{Toaster} from 'react-hot-toast';


function Register() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");


    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
            const {data} = await axios.post(`http://localhost:8000/api/register`,{
                name,
                email,
                password
            });
            if(data?.error){
                toast.error(data.error);
            }else{
                toast.success("Registiration success");
            }
        }catch(err){
            console.log(err);
            toast.error("Registration error try again");
        }
    }

  return (
    <Grid container>
        <Grid item lg={6} md={6} sm={12} xs={12}>
            <Grid item lg={12} sx={{marginTop:{lg:"2em",md:"2em",sm:"2em",xs:"2em"},marginLeft:{lg:"2em",md:"2em",sm:"2em",xs:"2em"}}}>
                <Stack direction="row">
                    <BackpackIcon sx={{color:"black",fontSize:{lg:"32px",md:"28px"}}} />
                    <Typography sx={{fontWeight:"bold",marginTop:{lg:"0.3em",md:"0.2em"}}}>Curlecture</Typography>
                </Stack>
            </Grid>
            <Grid item lg={12} sx={{marginTop:{lg:"3rem",md:"2rem",sm:"2rem",xs:"2rem"},display:"flex",justifyContent:"center",backgroundColor:""}}>
            <form onSubmit={handleSubmit}>

                    <Stack direction="column">
                        <Typography sx={{fontWeight:"200",fontSize:{lg:"28px",md:"24px",sm:"32px",xs:"32px"}}}>Welcome back</Typography>
                        <Typography sx={{fontWeight:"100"}} >The faster you fill up , the faster you get a lecture</Typography>
                        <Stack direction="column" sx={{marginTop:{lg:"1em",md:"1em",sm:"1em",xs:"1em"}}}>
                            <Typography sx={{fontWeight:"bold"}}>Name</Typography>
                            <TextField
                            label="Enter your name"
                            variant="outlined"
                            size='small'
                            sx={{marginTop:{lg:"0.3em",md:"0.3em",sm:"0.3em",xs:"0.3em"}}}
                            value={name}
                            onChange={(e)=>{setName(e.target.value)}}
                            autoFocus
                            />

                            <Typography sx={{fontWeight:"bold",marginTop:{lg:"1em",md:"0.8em",sm:"0.8em",xs:"0.8em"}}}>Email</Typography>
                            <TextField
                            label="Enter your email"
                            variant="outlined"
                            size='small'
                            sx={{marginTop:{lg:"0.3em",md:"0.2em",sm:"0.3em"}}}
                            value={email}
                            onChange={(e)=>{setEmail(e.target.value)}}
                            autoFocus
                            />

                            <Typography sx={{fontWeight:"bold",marginTop:{lg:"1em",md:"0.8em",sm:"0.6em",xs:"0.6em"}}}>Password</Typography>
                            <TextField
                            sx={{marginTop:{lg:"0.3em"}}}
                            id="outlined-password-input"
                            label="Password"
                            type="password"
                            autoComplete="current-password"
                            size='small'
                            value={password}
                            onChange={(e)=>{setPassword(e.target.value)}}
                            autoFocus
                            />

                            <Button sx={{marginTop:{lg:"2rem",md:"2rem",sm:"2rem",xs:"2rem",backgroundColor:"black"}}} variant="contained" type='submit'>Register</Button>


                            <Stack direction="row" sx={{display:"flex",justifyContent:"space-between"}}>
                                <Typography sx={{marginTop:{lg:"2em",md:"2em",sm:"2em",xs:"2em"},fontSize:{lg:"14px"},fontWeight:"100"}}>
                                    You already have an account
                                </Typography>
                                <Typography sx={{marginTop:{lg:"2em",md:"2em",sm:"2em",xs:"2em"},fontSize:{lg:"14px"},fontWeight:"bold"}}>
                                    Sign in?
                                </Typography>   
                            </Stack>

                        </Stack>
                    </Stack>
                    </form>

            </Grid>
        </Grid>
        <Grid item lg={6} md={6} sx={{marginTop:{lg:"2rem"},padding:3,display:{lg:"block",md:"block",sm:"none",xs:"none"}}}>
            <Avatar variant='square' sx={{width:"100%",height:"100%"}} src={img} />
        </Grid>
    </Grid>
  )
}

export default Register