import React from 'react';
import {
    AppBar, Toolbar , Grid ,Stack, Typography ,Paper ,IconButton ,InputBase,
    Divider
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BackpackIcon from '@mui/icons-material/Backpack';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {NavLink} from 'react-router-dom';
import {useAuth} from '../../context/auth';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';


function Menu() {
    const [auth,setAuth] = useAuth();
    const navigate = useNavigate();

    const logOut = () =>{
        localStorage.removeItem('auth');
        navigate('/login');
        toast.success('logout success');
        window.location.reload();
    }

  return (
    <AppBar position='stick' sx={{marginTop:"0.6rem"}}>
        <Toolbar sx={{backgroundColor:"#ffffff",height:{lg:"120px",md:"100px",sm:"80px",sm:"100px"}}}>
            <Grid container spacing={2}>
                <Grid item lg={1} md={1} sx={{backgroundColor:"#fd5e35",width:{lg:"100%",md:"100%"},height:{lg:"120px",md:"100px"},marginTop:"0.8em",display:{lg:"flex",md:"flex",sm:"none",xs:"none"}}}>
                </Grid>
                <Grid item lg={4} md={4} sm={4} sx={{backgroundColor:"",display:"flex",justifyContent:"flex-start",display:{lg:"flex",md:"flex",sm:"none",xs:"none"}}}>
                    <Stack direction="row" sx={{marginTop:{lg:"3em",md:"2em"}}}>
                        <Typography sx={{color:"black",marginLeft:{lg:"3em",md:"2em"},fontWeight:"bold"}}>Shop</Typography>
                        <Stack direction="row">
                            <Typography sx={{color:"black",marginLeft:{lg:"2em",md:"1em"},fontWeight:"bold"}}>Categories</Typography>
                            <ArrowDropDownIcon sx={{color:"black"}} />
                        </Stack>
                        {!auth?.user ? (
                        <Stack direction="row">
                                <Typography sx={{color:"black",marginLeft:{lg:"2em",md:"1em"},fontWeight:"bold"}}>
                                <NavLink to="/login" style={{textDecoration:"none",color:"black"}}>
                                    Login
                                </NavLink>  
                            </Typography>
                            <Typography sx={{color:"black",marginLeft:{lg:"2em",md:"1em"},fontWeight:"bold"}}>
                                <NavLink to="/register" style={{textDecoration:"none",color:"black"}}>
                                    Register
                                </NavLink>  
                            </Typography>
                        </Stack>
                        ):(
                            <Stack direction="row">
                            <Typography sx={{color:"black",marginLeft:{lg:"2em",md:"1em"},fontWeight:"bold"}}>
                                <NavLink to={`/dashboard/${auth?.user?.role === 1 ? 'admin' : 'user'}`} style={{textDecoration:"none",color:"black"}}>
                                    {auth?.user.name}
                                </NavLink>  
                            </Typography>
                             <Typography sx={{color:"black",marginLeft:{lg:"2em",md:"1em"},fontWeight:"bold",cursor:"pointer"}} onClick={()=>logOut()}>
                                    Logout
                            </Typography>
                            </Stack>
                        )}
                    </Stack>
                </Grid>
                <Grid item lg={3} md={3} sm={4} xs={12} sx={{display:{lg:"flex",md:"flex",sm:"flex",xs:"center"},justifyContent:"center"}}>
                    <Stack direction="row" sx={{marginTop:{lg:"2em",md:"1.5em"}}}>
                        <BackpackIcon sx={{color:"#fd5e35",fontSize:{lg:"48px",md:"36px",sm:"42px",xs:"50px"},marginLeft:{lg:"0.6em",md:"0.4em"}}} />
                        <Typography sx={{color:"black",fontWeight:"bold",marginTop:{lg:"0.1em",md:"",sm:"0.1em",xs:"0.3em"},fontSize:{lg:"28px",md:"24px",sm:"24px",xs:"24px"}}}>
                            Curlecture
                        </Typography>
                    </Stack>
                </Grid>
                <Grid item lg={4} md={4} sm={8} sx={{display:{lg:"block",md:"block",sm:"block",xs:"none"}}}>
                    <Stack direction="row" sx={{marginTop:{lg:"2.5em",md:"2em",sm:"0.5em"}}}>
                        <FavoriteIcon sx={{color:"#fd5e35",fontSize:{lg:"32px",md:"24px",sm:"32px"}}} />
                        <PermIdentityIcon sx={{color:"black",fontSize:{lg:"32px",md:"24px",sm:"32px"},marginLeft:{lg:"0.3em",md:"0.2em",sm:"0.3em"}}} />

                        <Paper
                            component="form"
                            sx={{display: 'flex', alignItems: 'center', width: 400,marginLeft:{lg:"3em",md:"2em",sm:"3em"},borderRadius:"30px"}}
                            >
                            <IconButton sx={{ p: '10px' }} aria-label="menu">
                                <SearchIcon />
                            </IconButton>
                            <InputBase
                                sx={{ ml: 1, flex: 1 }}
                                placeholder="Search"
                                inputProps={{ 'aria-label': 'search google maps' }}
                                size="small"
                            />
                            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
                            <IconButton  sx={{ p: '10px',color:"black" }} aria-label="directions">
                                <ShoppingBasketIcon />
                            </IconButton>
                            </Paper>
                    </Stack>
                </Grid>
            </Grid>
        </Toolbar>
    </AppBar>
  )
}

export default Menu