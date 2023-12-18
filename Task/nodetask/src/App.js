
import './App.css';
import Register from './Pages/register';
import Home from './Pages/home';
import Login from './Pages/login';
import {BrowserRouter,Route,Routes} from 'react-router-dom';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/register' element={<Register/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
