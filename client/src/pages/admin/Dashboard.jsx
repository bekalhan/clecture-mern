import React from 'react';
import {Box,Stack, Typography} from '@mui/material';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import {NavLink} from 'react-router-dom';


function AdminDashboard() {
  return (
    <Box>
      <Stack direction="row" sx={{marginTop:{lg:"3rem",md:"3rem",sm:"2.5rem",xs:"2rem"},marginLeft:{lg:"3rem",md:"3rem",sm:"3rem",xs:"2rem"}}}>
          <Stack direction="column" sx={{cursor:"pointer"}}>
          <NavLink to="/dashboard/admin/category" style={{textDecoration:"none",color:"black"}}>
              <CreateNewFolderIcon sx={{backgroundColor:"#65c498",color:"white",fontSize:{lg:"140px",md:"110px",sm:"80px",xs:"70px"}}} />
              <Typography sx={{marginTop:{lg:"0.3em",md:"0.2em",sm:"0.2em"},marginLeft:{lg:"1em",md:"0.5em",sm:"0.3em"},fontSize:{lg:"24px",md:"20px",xs:"16px"},fontWeight:"100"}}>
                Category
              </Typography>
          </NavLink>
          </Stack>
          <Stack direction="column" sx={{marginLeft:{lg:"3rem",md:"3rem",sm:"3rem",xs:"3rem"},cursor:"pointer"}}>
          <NavLink to="/dashboard/admin/product" style={{textDecoration:"none",color:"black"}}>
              <PrecisionManufacturingIcon sx={{backgroundColor:"#f6817a",color:"white",fontSize:{lg:"140px",md:"110px",sm:"80px",xs:"70px"}}} />
              <Typography sx={{marginTop:{lg:"0.3em",md:"0.2em",sm:"0.2em"},marginLeft:{lg:"1em",md:"0.5em",sm:"0.4em",xs:"0.3em"},fontSize:{lg:"24px",md:"20px"},fontWeight:"100"}}>
                Product
              </Typography>
          </NavLink>
          </Stack>
      </Stack>
    </Box>
  )
}

export default AdminDashboard;