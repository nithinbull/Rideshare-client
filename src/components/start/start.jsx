import React, { useContext } from 'react'
import { ethers } from 'ethers';
import { Typography } from '@mui/material';

import  {RideshareContext}  from '../../contexts/rideshareContext';
function Start() {
  const {connectWallet,getEthereumContract} =  useContext(RideshareContext);
  
  const test = async ()=>{
    const rideshareContract = getEthereumContract();
    try{
    await rideshareContract.createBooking("Rajesh","Salem","Mumbai");
    //let a = await rideshareContract.getBookingCount();
    rideshareContract.on("BookingCreated",(bookinglength)=>{
      console.log("Booking Accepted",bookinglength.toNumber());   
             
    })
    

  }

    catch(error){
      console.log(error);
    }
  }
  const logContract = async ()=>{
    const rideshareContract = getEthereumContract();
    console.log(rideshareContract);
  }

  const setWindowSize = ()=>{
    window.resizeTo(400,400);
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
          Click me to log the details
        </button>
        <button onClick={connectWallet}>
          Click me to connect
        </button>
        
        <button onClick={logContract}>
          Click me to Log contract
        </button>
        
        <button onClick={logBookingCount}>
          Click me to get Booking count
        </button>
        <button onClick={setWindowSize}>
          Click me to resize window
        </button>
    </div>
    
  )
}

export default Start;