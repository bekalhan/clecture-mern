import React, { useState } from 'react';
import {
    AppBar, Toolbar , Grid ,Stack, Typography ,Paper ,IconButton ,InputBase,
    Divider,Box, MenuItem, Avatar
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import BackpackIcon from '@mui/icons-material/Backpack';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import FavoriteIcon from '@mui/icons-material/Favorite';
import {NavLink} from 'react-router-dom';
import {useAuth} from '../../context/auth';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import BarChartIcon from '@mui/icons-material/BarChart';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import admin from '../../img/admin.gif';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShopIcon from '@mui/icons-material/Shop';
import CategoryIcon from '@mui/icons-material/Category';
import LogoutIcon from '@mui/icons-material/Logout';
import Search from '../forms/Search';
import { useEffect } from 'react';




function Menu() {
    const [auth,setAuth] = useAuth();
    const [nav,setNav] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        navigateByRole(auth?.user?.role);
    },[]);

    const logOut = () =>{
        localStorage.removeItem('auth');
        navigate('/login');
        toast.success('logout success');
        window.location.reload();
    }

    const navigateByRole = (role) =>{
        let path;
       if(role===0){
        path = '/dashboard/user/profile';
       }else{
        path = '/dashboard/admin';
       }
       setNav(path);
    };

  return (
    <Box sx={{width:"100%"}}>
        {auth?.user?.role === 1 ?(
                <Box sx={{width:"100%",height:"100vh"}}>
                    <List>
                        <ListItem sx={{display:"flex",justifyContent:"center",marginTop:{lg:"1em",md:"1em",sm:"1em",xs:"1em"}}}>
                            <Stack direction="row">
                                <BarChartIcon sx={{fontSize:{lg:"48px",md:"42px",sm:"36px",xs:"32px"},color:"purple"}} />
                                <Typography sx={{marginTop:{lg:"0.5em",md:"0.3em",sm:"0.15em"},fontSize:{lg:"20px",md:"18px",sm:"16px"},display:{lg:"block",md:"block",sm:"block",xs:"none"}}}>
                                    CLecture
                                </Typography>
                            </Stack>
                        </ListItem>
                        <ListItem sx={{display:"flex",justifyContent:"center",marginTop:{lg:"3rem",md:"3rem",sm:"2rem",xs:"2rem"}}}>
                            <Stack direction="column" sx={{display:"flex",justifyContent:"center"}}>
                                <Avatar src={admin} sx={{width:{lg:"80px",md:"70px",sm:"60px",xs:"40px"},height:{lg:"80px",md:"70px",sm:"60px",xs:"40px"},paddingLeft:2}} />
                                <Typography sx={{marginTop:{lg:"0.4em"},fontWeight:"bold",padding:1,fontSize:{lg:"16px",md:"16px",sm:"13px"},display:{lg:"block",md:"block",sm:"block",xs:"none"}}}>
                                    {auth?.user?.name}
                                </Typography>
                                <Typography sx={{fontWeight:"100",fontSize:{lg:"16px",md:"16px",sm:"12px"},display:{lg:"block",md:"block",sm:"block",xs:"none"}}}>
                                    {auth?.user?.email}
                                </Typography>
                            </Stack>
                        </ListItem>
                        <ListItem sx={{display:"flex",justifyContent:"center",marginTop:{lg:"3rem",md:"2rem",sm:"2rem",xs:"2rem"}}}>
                            <ListItemButton>
                                <ListItemIcon>
                                <NavLink to="/dashboard/admin" style={{textDecoration:"none",color:"black"}}>
                                    <DashboardIcon />
                                </NavLink>
                                </ListItemIcon>
                                <NavLink to="/dashboard/admin" style={{textDecoration:"none",color:"black"}}>
                                     <ListItemText primary="Dashboard" sx={{display:{lg:"block",md:"block",sm:"block",xs:"none"}}} />
                                </NavLink>
                            </ListItemButton>
                        </ListItem>
                        <ListItem sx={{display:"flex",justifyContent:"center"}}>
                            <ListItemButton>
                                <ListItemIcon>
                                <NavLink to="/shop" style={{textDecoration:"none",color:"black"}}>  
                                    <ShopIcon />
                                </NavLink>
                                </ListItemIcon>
                                <NavLink to="/shop" style={{textDecoration:"none",color:"black"}}>
                                  <ListItemText primary="Shop" sx={{display:{lg:"block",md:"block",sm:"block",xs:"none"}}} />
                                </NavLink>
                            </ListItemButton>
                        </ListItem>
                        <ListItem sx={{display:"flex",justifyContent:"center"}}>
                            <ListItemButton>
                                <ListItemIcon>
                                <NavLink to="/" style={{textDecoration:"none",color:"black"}}>  
                                    <CategoryIcon />
                                </NavLink>
                                </ListItemIcon>
                            <NavLink to="/" style={{textDecoration:"none",color:"black"}}>  
                                <ListItemText primary="Home" sx={{display:{lg:"block",md:"block",sm:"block",xs:"none"}}} />
                            </NavLink>
                            </ListItemButton>
                        </ListItem>
                        <Stack sx={{marginTop:"auto"}}>
                        <ListItem sx={{display:"flex",justifyContent:"center",marginTop:"auto"}}>
                            <ListItemButton>
                                <ListItemIcon>
                                <NavLink onClick={()=>{logOut()}} style={{textDecoration:"none",color:"black"}}>
                                    <LogoutIcon/>
                                </NavLink>
                                </ListItemIcon>
                                <NavLink onClick={()=>{logOut()}} style={{textDecoration:"none",color:"black"}}>
                                <ListItemText sx={{display:{lg:"block",md:"block",sm:"block",xs:"none"}}} primary="Logout" />
                                </NavLink>
                            </ListItemButton>
                        </ListItem>
                        </Stack>
                    </List>
                </Box>
        ):(
 <AppBar position='stick' sx={{marginTop:"0.6rem"}}>
 <Toolbar sx={{backgroundColor:"#ffffff",height:{lg:"120px",md:"100px",sm:"80px",sm:"100px"}}}>
     <Grid container spacing={2}>
         <Grid item lg={1} md={1} sx={{backgroundColor:"#fd5e35",width:{lg:"100%",md:"100%"},height:{lg:"120px",md:"100px"},marginTop:"0.8em",display:{lg:"flex",md:"flex",sm:"none",xs:"none"}}}>
         </Grid>
         <Grid item lg={4} md={4} sm={4} sx={{backgroundColor:"",display:"flex",justifyContent:"flex-start",display:{lg:"flex",md:"flex",sm:"none",xs:"none"}}}>
             <Stack direction="row" sx={{marginTop:{lg:"3em",md:"2em"}}}>
                <NavLink to="/shop" style={{textDecoration:"none",color:"black"}}>
                 <Typography sx={{color:"black",marginLeft:{lg:"3em",md:"2em"},fontWeight:"bold"}}>SHOP</Typography>
                 </NavLink>
                 <Stack direction="row">
                    <NavLink to="/" style={{textDecoration:"none",color:"black"}}>
                        <Typography sx={{color:"black",marginLeft:{lg:"2em",md:"1em"},fontWeight:"bold"}}>HOME</Typography>
                    </NavLink>
                 </Stack>
                 {!auth?.user ? (
                 <Stack direction="row">
                         <Typography sx={{color:"black",marginLeft:{lg:"2em",md:"1em"},fontWeight:"bold"}}>
                         <NavLink to="/login" style={{textDecoration:"none",color:"black"}}>
                             LOGIN
                         </NavLink>  
                     </Typography>
                     <Typography sx={{color:"black",marginLeft:{lg:"2em",md:"1em"},fontWeight:"bold"}}>
                         <NavLink to="/register" style={{textDecoration:"none",color:"black"}}>
                             REGISTER
                         </NavLink>  
                     </Typography>
                 </Stack>
                 ):(
                     <Stack direction="row">
                     <Typography sx={{color:"black",marginLeft:{lg:"2em",md:"1em"},fontWeight:"bold"}}>
                         <NavLink to={nav} style={{textDecoration:"none",color:"black"}}>
                             {auth?.user.name.toUpperCase()}
                         </NavLink>  
                     </Typography>
                      <Typography sx={{color:"black",marginLeft:{lg:"2em",md:"1em"},fontWeight:"bold",cursor:"pointer"}} onClick={()=>logOut()}>
                             LOGOUT
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
                <Search />
             </Stack>
         </Grid>
     </Grid>
 </Toolbar>
</AppBar>
        )}
    </Box>

  )
}

export default Menu