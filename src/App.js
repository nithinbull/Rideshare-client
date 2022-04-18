//import Landing from './components/landing/landing';
import Start from './components/start/start';
import { RideshareProvider } from './contexts/rideshareContext';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Landing from './components/landing/landing';
import Booking from './components/booking/Booking';

import UserLogin from './components/login/UserLogin';
import Home from './components/home/Home';

import {UserProvider} from './contexts/userContext';
function App() {
  return (
    <UserProvider>
    <RideshareProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing/>} />
          <Route path='/start' element={<Start/>} />
          <Route path='/login' element={<UserLogin/>} />
          <Route path='/home' element={<Home/>} />
        </Routes>  
      </BrowserRouter>
    </RideshareProvider>
    </UserProvider>  
  );
}

export default App;
