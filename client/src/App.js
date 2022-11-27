import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Menu from './components/nav/Menu';
import {Toaster} from 'react-hot-toast';


function App() {
  return (
    <BrowserRouter>
    <Toaster />
      <Menu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
