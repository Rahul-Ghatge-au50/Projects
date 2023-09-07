import react from 'react';
import {createBrowserRouter, createRoutesFromElements,Route, RouterProvider} from 'react-router-dom';
import './App.css';
import Navbar from './Comp/Navbar/navbar';
import Home from './Pages/Home/home';
import Error from './Pages/Error/error';
import MovieList from './Comp/MovieList/movieList';
import Movie from './Pages/Movie/movie';


const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Navbar/>} >
      <Route index element={<Home/>} />
      <Route path='/movie/:id' element={<Movie/>} />
      <Route path='/movies/:type' element={<MovieList/>} />
      <Route path='/*' element={<Error/>} />
    </Route>
  )
)



function App() {
  return (
    <RouterProvider router={routes}/>
  );
}

export default App;
