import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Menu from './components/nav/Menu';
import Dashboard from './pages/user/Dashboard';
import {Toaster} from 'react-hot-toast';
import PrivateRoute from './components/routes/PrivateRoute';


function App() {
  return (
    <BrowserRouter>
    <Toaster />
      <Menu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path='/dashboard' element={<PrivateRoute />}>
          
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
