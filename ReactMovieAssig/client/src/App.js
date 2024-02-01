import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import Home from './Pages/Home/Home';
import Summary from './Pages/Summary/Summary';
import BookingForm from './Pages/BookingForm/BookingForm';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/summary/:id' element={<Summary/>} />
          <Route path='/booking/:id' element={<BookingForm/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
