import React,{useEffect,useState} from 'react';
import {Typography,Box,Button,Stack,Divider,Grid} from '@mui/material';
import {useAuth} from '../../context/auth';
import {useCart} from '../../context/cart';
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import DropIn from 'braintree-web-drop-in-react';


function CartSidebar() {
    const [auth,setAuth] = useAuth();
    const [cart,setCart] = useCart();
    const [clientToken,setClientToken] = useState('');
    const [instance,setInstance] = useState('');

    const navigate = useNavigate();

    const cartTotal = () => {
        let total = 0;
        cart.map((item)=>{
            total +=item.price;
        });
        return total;
    };

    useEffect(()=>{
        if(auth?.token){
            getClientToken();
        }
    },[auth?.token]);

    const getClientToken = async () => {
        try{
            const {data} = await axios.get("http://localhost:8000/api/braintree/token");
            console.log("d",data);
            setClientToken(data.clientToken);
        }catch(err){
            console.log(err);
        }
    };

    const handleBuy = async () => {
        try{
            const {nonce} = await instance.requestPaymentMethod();
            const {data} = await axios.post('http://localhost:8000/api/braintree/payment',{
                nonce,cart
            },{
                headers:{
                    authorization:auth?.token
                }
            });
        }catch(err){
            console.log(err);
        }
    }

    console.log("token :",clientToken);

  return (
    <Grid item lg={4}>
    <Stack direction="column">
        <Typography sx={{fontWeight:"bold",marginTop:"2em",display:"flex",justifyContent:"center"}}>
            Your Cart Summary 
        </Typography>
        <Typography sx={{display:"flex",justifyContent:"center",marginTop:"2em"}}>
            Total / Address / Payments
        </Typography>
        <Divider sx={{marginTop:"2em"}}></Divider>
        <Typography sx={{fontWeight:"bold",display:"flex",justifyContent:"center",marginTop:"2em"}}>
                ${cartTotal()}
        </Typography>
        <Divider sx={{marginTop:"2em"}}></Divider>
        {auth?.user ? (
        <Stack direction="column">
        <Stack direction="row">
              <Typography sx={{fontWeight:"bold",marginTop:"1em",marginLeft:"1em"}}>
                  Address :
              </Typography>
              <Typography sx={{marginTop:"1em",marginLeft:"1em"}}>
                  {auth?.user?.address}
              </Typography>
          </Stack>      
          <Box sx={{display:"flex",justifyContent:"center",marginTop:"2em"}}>
              <Button variant='contained' sx={{width:"70%"}} size="small" onClick={()=>navigate('/dashboard/user/profile')}>Update Address</Button>                   
          </Box>
        </Stack>
        ):(
        <Box sx={{display:"flex",justifyContent:"center",marginTop:"2em"}}>
            <Button variant='contained' sx={{width:"70%",backgroundColor:"red",color:"white"}} size="small" onClick={()=>navigate('/login')}>Login to Checkout</Button>                   
        </Box>
        )}
      <Box>
      {!clientToken || !cart?.length ? (
          ""
        ) : (
        <>
        <DropIn
        options={{
            authorization: clientToken,
            paypal:{
                flow:"vault"
            }
        }}
        onInstance={(instance)=> setInstance(instance)}
        />
        <Box sx={{display:"flex",justifyContent:"center"}}>
            <Button onClick={handleBuy} variant='contained' sx={{width:"80%",marginBottom:"2rem"}} disabled={!auth?.user.address}>
                Buy
            </Button>
        </Box>
        </>
        )}
      </Box>
    </Stack>
</Grid>
  )
}

export default CartSidebar