import React from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, CardActions, Stack } from '@mui/material';
import {useNavigate} from "react-router-dom";
import background from "../../img/img.jpg";

function DriverLogin() {
	const navigate = useNavigate();
	const handleclick=()=>{
		navigate('/booking');
	}
  return (
    <div style={{ backgroundImage: `url(${background})` }}>
        <Box style={{ minHeight: '100vh' }}>
		<Stack  alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
						
				<Typography align="center" variant="h5" component="h2">				
					You are a Driver				
                </Typography>                
					<TextField style={{ minWidth: '50vh' }} id="passenger-name" label="Name" margin="normal" required/>			
					<TextField style={{ minWidth: '50vh' }} id="passenger-phone" label="Phone" margin="normal" required />			
							
							
				<Button variant="contained" onClick={handleclick} style={{ minWidth: '50vh' }} color="primary"  >Start</Button>				
							
		</Stack>
		</Box>				               
    </div>
  );
}

export default DriverLogin;