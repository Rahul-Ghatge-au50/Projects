
import './App.css';
import {Routes,Route, BrowserRouter} from 'react-router-dom';
import Login from './Login/Login';
import Home from './Home/Home';
import ProtectedRoute from './protectedRoute';
import Navbar from './Navbar/Navbar';
import Cart from './Cart/Cart';


function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navbar/>} />
          <Route index element={<ProtectedRoute><Home/></ProtectedRoute>} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/cart' element={<ProtectedRoute><Cart/></ProtectedRoute>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
