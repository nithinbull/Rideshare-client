//import Landing from './components/landing/landing';
import Start from './components/start/start';
//import { RideshareProvider } from './contexts/rideshareContext';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Landing from './components/landing/landing';
import Booking from './components/booking/Booking';
import OnTrip from './components/trip/OnTrip';
import UserLogin from './components/login/UserLogin';
import DriverLogin from './components/login/DriverLogin';

function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/start' element={<Start/>} />
          <Route path='/userlogin' element={<UserLogin/>} />
          <Route path='/driverlogin' element={<DriverLogin/>} />
          <Route path='/booking' element={<Booking/>} />
          <Route path='/ontrip' element={<OnTrip/>} />
        </Routes>  
      </BrowserRouter>
      
  );
}

export default App;
