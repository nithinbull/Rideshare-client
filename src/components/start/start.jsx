import React, { useContext } from 'react';
import { ethers } from 'ethers';
import { Typography } from '@mui/material';

import  {RideshareContext}  from '../../contexts/rideshareContext';
function Start() {
  const {connectWallet,getEthereumContract,getBookings,createNewBooking} =  useContext(RideshareContext);
  
  const test = ()=>{
    getBookings();
  }

  const createbooking = ()=>{
    createNewBooking('Nithin Kumar M R','Salem','Erode',20);
  }

  const logContract = async ()=>{
    const rideshareContract = getEthereumContract();
    console.log(rideshareContract);
  }

  
  const logBookingCount =async ()=>{
    try{
    const rideshareContract = getEthereumContract();
    let a = await rideshareContract.getBookingCount();
    console.log(a.toNumber());
    }
    catch(error){
      console.log(error);
    }
  }

  return (
    <div>
        <button onClick={test} >
          Click me to get booking details
        </button><br/>
        
        <button onClick={createbooking} >
          Click me to CREATE A BOOKING.. HOPEFULLY
        </button><br/>
        

        <button onClick={connectWallet}>
          Click me to connect
        </button><br/>
        
        <button onClick={logContract}>
          Click me to Log contract
        </button><br/>
        
        <button onClick={logBookingCount}>
          Click me to get Booking count
        </button><br/>
        
        
    </div>
  );
}

export default Start;