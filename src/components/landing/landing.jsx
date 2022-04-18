import React from "react";
import {useNavigate} from "react-router-dom";
import background from "../../img/img.jpg";
import { useContext } from "react";
import {Stack,Button } from "@mui/material";
import { UserContext } from "../../contexts/userContext";
import  {RideshareContext}  from '../../contexts/rideshareContext';
function Landing() {
  const navigate = useNavigate();
  //const {setUsertype} = useContext(UserContext);
  const {connectWallet,getEthereumContract} =  useContext(RideshareContext);
  const navuserlogin =()=>{
  
    sessionStorage.setItem("usertype",'Rider');
    navigate("/login");
  }
  
  const navdriverlogin =()=>{
    
    sessionStorage.setItem("usertype",'Driver');
    navigate("/login");
  }
  
  return (
    <div style={{ backgroundImage: `url(${background})` }}>
      <Stack style={{ minHeight: '50vh' }}>

      </Stack>
      <Stack  spacing={4}  direction="column"  alignItems="center" justifyContent="center" style={{ minHeight: '50vh' }}>
        <Button size='large' style={{ minWidth: '50vh' }} onClick={connectWallet} color='info' variant="outlined">Connect Wallet</Button>
        <Button size='large' style={{ minWidth: '50vh' }} onClick={navdriverlogin} variant="contained">Driver</Button>
        <Button size='large' style={{ minWidth: '50vh' }} onClick={navuserlogin} variant="contained">Rider</Button>
      </Stack>
    </div>
  )
}



export default Landing;