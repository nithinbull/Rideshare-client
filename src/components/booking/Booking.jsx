import React from 'react'
import {TextField,Fab,Table,TableBody,TableHead,TableRow,TableCell,Button,AppBar,Toolbar,Typography, Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

function Booking() {

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };


  return (
    <div >
      
      <AppBar position="sticky">
					<Toolbar>
						<Typography variant="h5" style={{minWidth:'100%'}} align="center" color="white" >
							Bookings List
            </Typography>
					</Toolbar>
			</AppBar>
    
      <Table>
        <TableHead>
          <TableRow>
            <TableCell >Route</TableCell>
            <TableCell >Passenger</TableCell>
            <TableCell >Cost</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow> 
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
                <Button size="small" color="success" align="center" variant="outlined" >Cancel</Button>
              </TableCell>
            </TableRow>
            
            <TableRow> 
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
                <Button size="small" color="success" align="center" variant="outlined" >Cancel</Button>
              </TableCell>
            </TableRow>

            <TableRow> 
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
                <Button size="small" color="success" align="center" variant="outlined" >Cancel</Button>
              </TableCell>
            </TableRow>

            <TableRow> 
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
                <Button size="small" color="success" align="center" variant="outlined" >Cancel</Button>
              </TableCell>
            </TableRow>

            <TableRow> 
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
                <Button size="small" color="success" align="center" variant="outlined" >Cancel</Button>
              </TableCell>
            </TableRow>
            
        </TableBody>
      </Table>
      
      <Fab size="medium" onClick={handleClickOpen} style={{ position: 'sticky', left:'90%',bottom:'2vh'}} color="primary" aria-label="add">
        <AddIcon />
      </Fab>

      <Dialog open={open}>
        <DialogTitle>New Booking</DialogTitle>
        <DialogContent>
            <DialogContentText>
							To book a trip, please enter your locations...
            </DialogContentText>
                
				    	<TextField  label="From" margin="normal" required/>			
				    	<TextField  label="To" margin="normal" required />			
              <div className="distance-result">
                <div> Distance: <span className="number-label">50</span><span className="unit">Km</span></div>
                <div> Fee: <span className="number-label">0.01</span><span className="unit">/Km</span></div>
                <div> Total Cost: <span className="number-label">0.50</span><span className="unit">Eth</span></div>
              </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleClose}>Submit</Button>
        </DialogActions>
      </Dialog>
      


    </div>
  )
}

export default Booking;