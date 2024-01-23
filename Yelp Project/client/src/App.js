import {BrowserRouter, Route,Routes} from 'react-router-dom';
import './App.css';
import Update from './Pages/Update/Update';
import Detailed from './Pages/Detailed/Detailed';
import Home from './Pages/Home/Home';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/resturant/update/:id' element={<Update/>} />
          <Route path='/resturant/:id' element={<Detailed/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
