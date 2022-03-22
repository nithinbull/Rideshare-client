import React from "react";
import {useNavigate} from "react-router-dom";
import background from "../../img/img.jpg";

import {Stack,Button } from "@mui/material";

function Landing() {
  const navigate = useNavigate();
  const navuserlogin =()=>{
      navigate("/userlogin");
  }
  const navdriverlogin =()=>{
    navigate("/driverlogin");
}
  return (
    <div style={{ backgroundImage: `url(${background})` }}>
      <Stack style={{ minHeight: '50vh' }}>

      </Stack>
      <Stack  spacing={4}  direction="column"  alignItems="center" justifyContent="center" style={{ minHeight: '50vh' }}>
        <Button size='large' style={{ minWidth: '50vh' }} onClick={navdriverlogin} variant="contained">Driver</Button>
        <Button size='large' style={{ minWidth: '50vh' }} onClick={navuserlogin} variant="contained">Rider</Button>
      </Stack>
    </div>
  )
}



export default Landing;