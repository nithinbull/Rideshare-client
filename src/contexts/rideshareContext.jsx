import React, { useState } from "react";
import { createContext } from "react";
import {ethers} from "ethers";

import { contractABI, contractAddress } from "../utils/constants";

export const RideshareContext = createContext({});
const {ethereum} = window;

const getEthereumContract = ()=>{
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const rideshareContract = new ethers.Contract(contractAddress,contractABI,signer); 
    return rideshareContract;
}

const getBlocknumber = async ()=>{
    const provider =  new ethers.providers.Web3Provider(ethereum);
    const blocknumber = await provider.getBlockNumber();
    return blocknumber;
}

export const RideshareProvider = ({children})=>{
    
    const [connectedAccount,setConnectedAccount] = useState("");
    
    const checkIfWalletConnected =async ()=>{
        if(!ethereum) return alert('Please install MetaMask');
        const accounts = await ethereum.request({method: 'eth_accounts'});
        console.log(accounts[0]);
    }

    const connectWallet =async ()=>{
        try{
            if(!ethereum) return alert('Please install MetaMask');
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            setConnectedAccount(accounts[0]);
            console.log(accounts[0]);
        }
        catch(error){
            console.log(error);
        }
    }


    const createNewBooking = async (username,origin,destination,amount)=>{
        const rideshareContract = getEthereumContract();
        amount = amount * (10**18); 
        
        try{
            await rideshareContract.createBooking(username,origin,destination,{ from: connectedAccount, value: `${amount}`});
        }
        catch(error){
            console.log(error);
        }
    }

    const cancelBooking =  async (id)=>{
        const rideshareContract = getEthereumContract();
        try{
            await rideshareContract.cancelBooking(id);
        }
        catch(error){
            console.log(error);
        }
    }

    const acceptBooking = async (driverInfo,id)=>{
        const rideshareContract= getEthereumContract();
        try{
            await rideshareContract.acceptBooking(id,driverInfo,{from: connectedAccount});
        }
        catch(error){
            console.log(error);
        }
    }

    const completeBooking = async (id)=>{
        const rideshareContract = getEthereumContract();
        try{
            await rideshareContract.completeBooking(id, {from: connectedAccount});
        }
        catch(error){
            console.log(error);
        }
    }

    const getBookings = async ()=>{
        const rideshareContract = getEthereumContract();
        let books = [];
        try{
             let bookingcount = await rideshareContract.getBookingCount();
             bookingcount = bookingcount.toNumber();
             
             for(let i=bookingcount-1; i>=0 && bookingcount!=0;i--){
                let bookDetail = await rideshareContract.getBooking(i);
                let book = {
                        id: i,
						passengerAddress: bookDetail[0].toString(),
						passengerInfo: bookDetail[1].toString(),
						driverAddress: bookDetail[2].toString(),
						driverInfo: bookDetail[3].toString(),
						createdAt: parseFloat(bookDetail[4]),
						originLocation: bookDetail[5].toString(),
						destLocation: bookDetail[6].toString(),
						totalCost: parseFloat(bookDetail[7]),
						status: bookDetail[8].toString()
                }   
                books.push(book);
                
             }   
             
             
             
        }
        catch(error){
            console.log(error);
        }
        return books;
    }

    const getBooking = async (i)=>{
        const rideshareContract = getEthereumContract();
        
        try{
            
            let bookDetail = await rideshareContract.getBooking(i-1);
            
            let book = {
                            id: i,
                            passengerAddress: bookDetail[0].toString(),
                            passengerInfo: bookDetail[1].toString(),
                            driverAddress: bookDetail[2].toString(),
                            driverInfo: bookDetail[3].toString(),
                            createdAt: parseFloat(bookDetail[4]),
                            originLocation: bookDetail[5].toString(),
                            destLocation: bookDetail[6].toString(),
                            totalCost: parseFloat(bookDetail[7]),
                            status: bookDetail[8].toString()
            }
            return book;
        }
        catch(error){
            console.log(error);
        }
        

    }


    return(
    <RideshareContext.Provider value={{connectedAccount,connectWallet,getEthereumContract,createNewBooking,getBookings,cancelBooking,getBlocknumber,acceptBooking,completeBooking,getBooking}}>
        {children}
    </RideshareContext.Provider>);

}



