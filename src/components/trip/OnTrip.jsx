import React from 'react';
import background from "../../img/img.jpg";
import { AppBar,Toolbar,Typography,TableBody, TableCell, TableRow,Table, Paper, Button } from '@mui/material';
function OnTrip() {
  return (
    <div >
      <AppBar position="sticky">
					<Toolbar>
						<Typography variant="h5" style={{minWidth:'100%'}} align="center" color="white" >
							Ride Started
            			</Typography>
					</Toolbar>
			</AppBar>
      
      
      <Paper elevation={7} style={{ backgroundImage: `url(${background})` }} align="center">
	  <div style={{marginTop:'2%'}} >
      <Typography variant="h7" >Your trip Details are shown below</Typography>
	  </div>
      <Table align ='center' style={{maxWidth:'80%', margin:'10%',marginTop:'0%'}}>
						
						<TableBody>
							<TableRow>
								<TableCell>Passenger Name</TableCell>
								<TableCell>Nithin</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Passenger Phone</TableCell>
								<TableCell>91+ 9943503811</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Driver Name</TableCell>
								<TableCell>Rajesh</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Driver Phone</TableCell>
								<TableCell>+91 9952504892</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Route</TableCell>
								<TableCell>
								  Salem,Bypass,TN<br/><br/>
                  Namakkal,Busstand
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Booking Time</TableCell>
								<TableCell>
									11:06:00
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Total Cost</TableCell>
								<TableCell>0.5</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Status</TableCell>
								<TableCell>Ontrip<span className="status"></span></TableCell>
							</TableRow>
						</TableBody>
					</Table>
          <Button variant="outlined" color="secondary" fullWidth >
					Complete Trip
          </Button>
          </Paper>
          
    </div>
  );
}

export default OnTrip;