import React,{useState,useEffect} from 'react';
import {Grid,Stack,Paper,InputBase,Box, Button,Typography,Modal,TextField} from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import axios from 'axios';
import toast from 'react-hot-toast';
import {useAuth} from '../../context/auth';
import ModeEditOutlineIcon from '@mui/icons-material/ModeEditOutline';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });
  

function Category() {
    const [auth,setAuth] = useAuth();
    const [name,setName] = useState('');
    const [updateName,setUpdateName] = useState('');
    const [categories,setCategories] = useState([]);
    const [Id,setId] = useState('');
    const [open, setOpen] = React.useState(false);
    const [openDialog, setOpenDialog] = React.useState(false);

    const handleOpen = (id) => {
        setOpen(true);
        setId(id);
    }
    const handleClose = () => setOpen(false);

    const handleDialogOpen = (id) => {
        setOpenDialog(true);
        setId(id);
      };
    
      const handleDialogClose = () => {
        setOpenDialog(false);
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
        const {data} = await axios.post(`http://localhost:8000/api/category`,{name},{
            headers:{
                Authorization:auth?.token
            }
        });
        if(data?.error){
            toast.error(data.error);
        }else{
            toast.success(`${data.name} is created successfully`);
            loadCategories();
        }
        }catch(err){
            console.log(err);
            toast.error("create category failed");
        }
    };

    useEffect(()=>{
        loadCategories();
    },[])

    const loadCategories = async () =>{
        try{
            const {data} = await axios.get("http://localhost:8000/api/categories");
            setCategories(data);
        }catch(err){
            console.log(err);
        }
    }

    const handleUpdate = async () =>{
        try{
            const {data} = await axios.put(`http://localhost:8000/api/category/${Id}`,{
                name:updateName
            },{
                headers:{
                    Authorization:auth?.token
                }
            });
            if  (data?.error){
                toast.error(data?.error);
            }else{
                toast.success("category updated successfully");
                window.location.reload();
                loadCategories();
            }
        }catch(err){
            toast.error("category updated failed");
        }
    }

    const handleDelete = async () =>{
        try{
            const {data} = await axios.delete(`http://localhost:8000/api/category/${Id}`,{
                headers:{
                    Authorization:auth?.token
                }
            });
            if  (data?.error){
                toast.error(data?.error);
            }else{
                toast.success("category deleted successfully");
                window.location.reload();
                loadCategories();
            }
        }catch(err){
            toast.error("category delete failed");
        }
    }


  return (
    <Stack direction="column">
        {/* modal */}
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
            <Stack direction="column" sx={{display:"flex",justifyContent:"center"}}>
                <Typography sx={{display:"flex",justifyContent:"center",fontWeight:"bold"}}>
                    Update Category
                </Typography>
                    <Box sx={{display:"flex",justifyContent:"center",marginTop:"1em"}}>
                    <TextField
                    id="filled-basic"
                    label="New category name"
                    variant="filled"
                    value={updateName}
                    onChange={(e)=>setUpdateName(e.target.value)}
                    />

                    </Box>
                            <Box sx={{display:"flex",justifyContent:"center"}}>
                                <Button type='submit' variant="contained" sx={{width:"60%",marginTop:"2em"}} onClick={()=>handleUpdate()}>
                                    Update Category
                                </Button>
                            </Box>
                    </Stack>
            </Box>
        </Modal>
        {/* model end */}
        {/* dialog */}
        <Dialog
        open={openDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Are you sure remove this category?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            if you remove this category there is no way to get back , if you still want to click on the remove button
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Close</Button>
          <Button onClick={()=>{handleDelete()}}>Remove</Button>
        </DialogActions>
      </Dialog>
        {/* dialog end */}
        <Grid container>
                <Grid item lg={3}></Grid>
                <Grid item lg={6} sx={{display:{lg:"block",md:"block",sm:"block",xs:"none"}}}>
                    <form onSubmit={handleSubmit}>
                    <Stack direction="row" sx={{marginTop:{lg:"2.5em",md:"2em",sm:"0.5em"}}}>
                        <Paper
                            component="form"
                            sx={{display: 'flex', alignItems: 'center', width: 600,marginLeft:{lg:"3em",md:"2em",sm:"3em"},borderRadius:"30px"}}
                            >
                            <InputBase
                                sx={{ ml: 1,p:1, flex: 1 }}
                                placeholder="Add new Category"
                                inputProps={{ 'aria-label': 'search google maps' }}
                                size="small"
                                value={name}
                                onChange={(e)=>setName(e.target.value)}
                            />

                            </Paper>
                            <Button sx={{color:"green"}} aria-label="menu" type='submit'>
                                <AddCircleIcon />
                            </Button>
                    </Stack>
                    </form>
                </Grid>
                <Grid item lg={3}></Grid>
        </Grid>
        <Grid container  sx={{padding:10,display:"flex",justifyContent:"center",marginLeft:{lg:"2em"}}}>
                {categories?.map((category)=>(
                    <Grid item key={category._id} lg={3} sx={{backgroundColor:"#48a2da",borderRadius:"30px",display:"flex",justifyContent:"center",textAlign:"center",padding:4,margin:2}}>
                        <Stack direction="column">
                            {category?.name}
                        <Stack direction="row" sx={{marginTop:{lg:"0.3em"}}}>
                            <ModeEditOutlineIcon sx={{cursor:"pointer"}} onClick={()=>{handleOpen(category._id)}}  />
                            <RemoveCircleIcon sx={{cursor:"pointer",marginLeft:{lg:"0.3em"}}} onClick={()=>{handleDialogOpen(category._id)}} />
                        </Stack>
                        </Stack>
                    </Grid>
                ))}
        </Grid>
    </Stack>
  )
}

export default Category