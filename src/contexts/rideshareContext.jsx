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


export const RideshareProvider = ({children})=>{
    
    const [connectedAccount,setConnectedAccount] = useState("");
    
    const checkIfWalletConnected =async ()=>{
        if(!ethereum) return alert('Please install MetaMask');
        const accounts = await ethereum.request({method: 'eth_accounts'});
        console.log(accounts);
    }

    const connectWallet =async ()=>{
        try{
            if(!ethereum) return alert('Please install MetaMask');
            const accounts = await ethereum.request({method: 'eth_requestAccounts'});
            setConnectedAccount(accounts[0]);
            console.log(accounts);
        }
        catch(error){
            console.log(error);
        }
    }



    return(
    <RideshareContext.Provider value={{connectWallet,getEthereumContract}}>
        {children}
    </RideshareContext.Provider>);

}



