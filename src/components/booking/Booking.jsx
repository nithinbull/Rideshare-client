import React,{useEffect,useState, useContext} from 'react'
import {TextField,Fab,Table,TableBody,TableHead,TableRow,TableCell,Button,AppBar,Toolbar,Typography, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText, Grid} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { UserContext } from '../../contexts/userContext';
import {useNavigate} from "react-router-dom";
import  {RideshareContext}  from '../../contexts/rideshareContext';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
const {ethereum} = window;

function Booking({isOntrip, refreshbookings,viewOnMap}) {
  const {username,usernumber,usertype,setUsertype,setUsername,setUsernumber} = useContext(UserContext);
  const {connectWallet,getEthereumContract,getBookings,cancelBooking,connectedAccount,getBlocknumber,acceptBooking} =  useContext(RideshareContext);
  
  const [books,setBooks] = useState([]);


  const navigate = useNavigate();
  //function for accepting the ride
  const handleAccept=(id)=>{
    //console.log(id);
    acceptBooking(username+';'+sessionStorage.getItem('usernumber'),id);


  }

  //function to handle cancel new booking event
  const handleCancel = (id)=>{
    cancelBooking(id);
  }
  
  const loadBookings= ()=>{
    getBookings().then((result)=>{
      
      //logic to list bookings made by the user
      if(usertype == "Rider")
      { 
        let riderBookings = [];
        for(let i=0;i<result.length;i++){
          if(sessionStorage.getItem('usernumber') === result[i].passengerInfo.split(';')[1])
            riderBookings.push(result[i]);   
        }
        setBooks(riderBookings);
      }
      else
      {
        let driverBookings = [];
        for(let i=0;i<result.length;i++){
          if((result[i].status === "ontrip" || result[i].status === "completed")  && sessionStorage.getItem('usernumber') !== result[i].driverInfo.split(';')[1])
              continue;
        
          if(sessionStorage.getItem('usernumber') !== result[i].passengerInfo.split(';')[1] && result[i].status != "cancelled")
              driverBookings.push(result[i]);   
        }
        setBooks(driverBookings);
      }
    });
  }


  useEffect(()=>{
    loadBookings();
    refreshbookings.current = loadBookings;
    
  },[]);
  
  // useEffect(()=>{
  //   console.log(books);
  // },[books]);


  return(
    <div>    
      {
      books.length==0 && 
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >

      <Grid item xs={3}>
      <Typography variant='h6'>There are no bookings available right now. <br/> </Typography>
      </Grid>   
      <Grid item xs={3}>
      <SentimentVeryDissatisfiedIcon fontSize='large' />
      </Grid> 
      </Grid> 
      
      }
      <Table style={{marginBottom:'50px'}}>
      {
       books.length!=0 &&
        
        <TableHead>
          <TableRow>
            <TableCell >Route</TableCell>
            <TableCell >Passenger</TableCell>
            <TableCell >Cost</TableCell>
          </TableRow>
        </TableHead>
       
      }     
      <TableBody>
          {books.map((book)=>{
              return(
                    <TableRow key={book.id}> 
                      <TableCell onClick={()=>viewOnMap([book.originLocation.split(",")[0],book.originLocation.split(",")[1]],[book.destLocation.split(",")[0],book.destLocation.split(",")[1]])}> 
                        Lng :{book.originLocation.split(",")[0].substring(0,4)} Lat:{book.originLocation.split(",")[1].substring(0,4)}<br/><br/>
                        Lng :{book.destLocation.split(",")[0].substring(0,4)} Lat:{book.destLocation.split(",")[1].substring(0,4)}
                      </TableCell>
                      <TableCell> 
                        {book.passengerInfo.split(";")[0]}<br/><br/>
                        {book.passengerInfo.split(";")[1]}
                      </TableCell>
                      <TableCell> 
                        {(book.totalCost / (10**18)).toFixed(2)}<br/><br/>
                        <Button style={book.status === "completed" ? {} : { display: 'none' }} size="small" color="success" align="center" variant="outlined">Completed</Button>
                        <Button style={book.status === "cancelled" ? {} : { display: 'none' }} size="small" color="error" align="center" variant="outlined">Cancelled</Button>
                        <Button style={book.status === "ontrip" ? {} : { display: 'none' }} size="small" color="error" align="center" variant="outlined">OnTrip</Button>
                        <Button onClick={()=> handleCancel(book.id)} style={usertype === "Rider" && book.status === "new" ? {} : { display: 'none' }} size="small" color="secondary" align="center" variant="outlined" >Cancel</Button>
                        <Button onClick={()=> handleAccept(book.id)} disabled={isOntrip} style={usertype === "Driver" && book.status==="new" ? {} : { display: 'none' }} size="small" color="secondary" align="center" variant="outlined" >Accept</Button>
                      </TableCell>
                    </TableRow>
              );
          })}
            
            

            { 
            /*<TableRow> 
              <TableCell> 
                Salem,Bypass,TN<br/><br/>
                Namakkal,Busstand
              </TableCell>
              <TableCell> 
                Nithin Kumar M R<br/><br/>
                +91 987654321
              </TableCell>
              <TableCell> 
                0.2 Ether <br/><br/>
                <Button style={usertype === "Rider" ? {} : { display: 'none' }} size="small" color="secondary" align="center" variant="outlined" >Cancel</Button>
                <Button onClick={handleAccept} style={usertype === "Driver" ? {} : { display: 'none' }} size="small" color="secondary" align="center" variant="outlined" >Accept</Button>
              </TableCell>
              </TableRow>
            */}
            
            
        </TableBody>
      </Table>
      
      {/* <Fab size="medium"  onClick={handleClickOpen} style={usertype === "Rider" ?{ position: 'sticky', left:'90%',bottom:'9vh'}:{display:'none'}} color="primary" aria-label="add">
        <AddIcon />
      </Fab>

      <Dialog open={open} fullWidth={true} scroll='body' >
        <DialogTitle>New Booking</DialogTitle>
        <DialogContent>
            <DialogContentText>
							To book a trip, please enter your locations...
            </DialogContentText>
                
				    	<TextField size="small" label="From" margin="normal" required/>	<br/>	
				    	<TextField size="small" label="To" margin="normal" required />			
              <div className="distance-result">
                <div> Distance: <span className="number-label">50</span><span className="unit">Km</span></div>
                <div> Fee: <span className="number-label">0.01</span><span className="unit">/Km</span></div>
                <div> Total Cost: <span className="number-label">0.50</span><span className="unit">Eth</span></div>
              </div> 
              <Address/>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog> */}
      
    </div>
  )
}

export default Booking;