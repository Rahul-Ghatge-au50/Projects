
import './App.css';
import {BrowserRouter,createBrowserRouter,createRoutesFromElements, Navigate, Route, RouterProvider, Routes,} from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Voting from './Pages/Voting/Voting';
import Topbar from './topbar';
import ProtectedRoute from './ProtectedRoute';


function App() {

  const routers = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<Topbar/>}>
        <Route index element={<Login/>} />
        <Route path='/email' element={<Login/>} />
        <Route path='/voting' element={<Voting/>} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home/>} />
      </Route>
    )
  )
  

  return (
    <RouterProvider router={routers} />
  );
}

export default App;
