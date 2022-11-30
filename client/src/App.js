import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Menu from './components/nav/Menu';
import Dashboard from './pages/user/Dashboard';
import AdminDashboard from './pages/admin/Dashboard';
import {Toaster} from 'react-hot-toast';
import PrivateRoute from './components/routes/PrivateRoute';
import AdminRoute from './components/routes/AdminRoute';
import NotFound from './components/notfound/NotFound';
import {useAuth} from './context/auth';
import {Grid} from '@mui/material';
import React from 'react';
import AdminCategory from './pages/admin/Category';
import AdminProduct from './pages/admin/Product';
import ProductList from './pages/admin/ProductList';
import ProductUpdate from './pages/admin/ProductUpdate';


function App() {
  const [auth,setAuth] = useAuth();

  return (
    <BrowserRouter>
    <Toaster />
    {auth?.user?.role === 1 ? (
      <Grid container>
        <Grid item lg={3} md={3} sm={3} xs={2} sx={{backgroundColor:"#ffffff"}}>
          <Menu />
        </Grid>
          <Grid item lg={9} md={9} sm={9} xs={10} sx={{backgroundColor:"#eeeeee"}}>
              <Routes>
                <Route path='/' element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path='/dashboard' element={<PrivateRoute />}>
                    <Route path='user' element={<Dashboard />} />
                </Route>
                <Route path='/dashboard' element={<AdminRoute />}>
                    <Route path="admin" element={<AdminDashboard />} />
                    <Route path="admin/category" element={<AdminCategory />} />
                    <Route path="admin/product" element={<AdminProduct />} />
                    <Route path='admin/product-list' element={<ProductList/>} />
                    <Route path="admin/product/update/:slug" element={<ProductUpdate/>} />
                </Route>
                <Route path="*" element={<NotFound />} />
              </Routes>
           </Grid>
      </Grid>
    ):(
    <React.Fragment>
      <Menu />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/dashboard' element={<PrivateRoute />}>
              <Route path='user' element={<Dashboard />} />
          </Route>
          <Route path='/dashboard' element={<AdminRoute />}>
              <Route path="admin" element={<AdminDashboard />} />
              <Route path="admin/category" element={<AdminCategory />} />
              <Route path="admin/product" element={<AdminProduct />} />
              <Route path='admin/product-list' element={<ProductList/>} />
              <Route path="admin/product/update/:slug" element={<ProductUpdate/>} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
    </React.Fragment>
    )}
    </BrowserRouter>
  );
}

export default App;
