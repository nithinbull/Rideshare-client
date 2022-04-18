import React, { useEffect, useState, useContext } from 'react';
import background from "../../img/img.jpg";
import { AppBar,Toolbar,Typography,TableBody, TableCell, TableRow,Table, Paper, Button,Grid } from '@mui/material';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import  {RideshareContext}  from '../../contexts/rideshareContext';
import { UserContext } from '../../contexts/userContext';

function OnTrip({viewOnMap}) {
	const [book,setBook] = useState(null);
	const {connectWallet,getEthereumContract,getBookings,cancelBooking,connectedAccount,getBlocknumber,acceptBooking,completeBooking} =  useContext(RideshareContext);
	const {username,usernumber,usertype,setUsertype,setUsername,setUsernumber} = useContext(UserContext);
 
	const loadBookings= ()=>{
		getBookings().then((result)=>{
		  
		  //logic to list bookings made by the user
		  if(usertype == "Rider")
		  { 
			let riderBookings ;
			for(let i=0;i<result.length;i++){
			  if(sessionStorage.getItem('usernumber') === result[i].passengerInfo.split(';')[1] && result[i].status === 'ontrip')
				riderBookings = result[i];   
			}
			setBook(riderBookings);
		  }
		  else
		  {
			let driverBookings ;
			for(let i=0;i<result.length;i++){
			  if(sessionStorage.getItem('usernumber') === result[i].driverInfo.split(';')[1] && result[i].status === 'ontrip')
				driverBookings = result[i];   
			}
			setBook(driverBookings);
		  }
		});
	  }

	  useEffect(()=>{
		loadBookings();
	  },[]);

	//   useEffect(()=>{
	// 	console.log(book);
	//   },[book]);

	const handleComplete = ()=>{
		completeBooking(book.id);
	}
	


	return (
    <div >
	 {
      book==null && 
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >

      <Grid item xs={3}>
      <Typography variant='h6'>You are not in any Trip right now <br/> </Typography>
      </Grid>   
      <Grid item xs={3}>
      <SentimentVeryDissatisfiedIcon fontSize='large' />
      </Grid> 
      </Grid> 
      
      }
     {		
      book !=null &&
      <Paper elevation={7} style={{ backgroundImage: `url(${background})`, height: '90vh' }} align="center">
	  <div style={{marginTop:'2%'}} >
      <Typography variant="h7" >Your trip Details are shown below</Typography>
	  </div>
      <Table align ='center' style={{maxWidth:'80%',marginTop:'0%'}}>
						
						<TableBody>
							<TableRow>
								<TableCell>Passenger Name</TableCell>
								<TableCell>{book.passengerInfo.split(";")[0]}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Passenger Phone</TableCell>
								<TableCell>{book.passengerInfo.split(";")[1]}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Driver Name</TableCell>
								<TableCell>{book.driverInfo.split(";")[0]}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Driver Phone</TableCell>
								<TableCell>{book.driverInfo.split(";")[1]}</TableCell>
							</TableRow>
							<TableRow onClick={()=>viewOnMap([book.originLocation.split(",")[0],book.originLocation.split(",")[1]],[book.destLocation.split(",")[0],book.destLocation.split(",")[1]])}>
								<TableCell>Route</TableCell>
								<TableCell>
										Lng :{book.originLocation.split(",")[0].substring(0,4)} Lat:{book.originLocation.split(",")[1].substring(0,4)}<br/><br/>
                        				Lng :{book.destLocation.split(",")[0].substring(0,4)} Lat:{book.destLocation.split(",")[1].substring(0,4)}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Booking Time</TableCell>
								<TableCell>
									{new Date(book.createdAt * 1000).toISOString()}
								</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Total Cost</TableCell>
								<TableCell>{book.totalCost/(10**18)}</TableCell>
							</TableRow>
							<TableRow>
								<TableCell>Status</TableCell>
								<TableCell>Ontrip<span className="status"></span></TableCell>
							</TableRow>
						</TableBody>
					</Table>
          <Button variant="outlined" onClick={handleComplete} disabled={sessionStorage.getItem('usertype')==="Driver"} color="secondary" fullWidth >
					Complete Trip
          </Button>
          </Paper>
		}
    </div>
  );
}

export default OnTrip;