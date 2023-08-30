import React from 'react';
import './App.css';
import Login from './Pages/Login/Login';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home/Home';
import Header from './Pages/Header/Header';



const routers = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Header/>}>
      <Route index element={<Home/>} />
      <Route path='/login' element={<Login/>} />
    </Route>
  )
)


function App() {
  return (
    <RouterProvider router={routers} />
  )
}

export default App;
