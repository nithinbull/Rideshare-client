import React,{useRef, useState,useEffect, useContext} from 'react'
import mapboxgl from 'mapbox-gl';
import MapboxDirections from '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions';
import Fab from '@mui/material/Fab';
import '@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions.css';
import AddIcon from '@mui/icons-material/Add';
import {Paper,Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText,TextField,Button, Typography} from '@mui/material';

import  {RideshareContext}  from '../../contexts/rideshareContext';
import { useNavigate } from 'react-router-dom';
import { DinnerDining } from '@mui/icons-material';

function Map({route,isOntrip}) {
  mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_TOKEN;
  
  const mapContainer = useRef(null);
  const map = useRef(null);
  const directions =useRef(null);
  const [lng, setLng] = useState(78.1460);
  const [lat, setLat] = useState(11.6643);
  const [zoom, setZoom] = useState(12);
 
  //rideshare context
  const {connectWallet,getEthereumContract,createNewBooking,getBlocknumber} =  useContext(RideshareContext);
  
  //Booking properties are stored here
  const [distance,setDistance] = useState(0);
  const [origin,setOrigin] = useState();
  const [destination,setDestination] = useState();
  const [username,setUsername] = useState(sessionStorage.getItem('username'));
  const [cost, setCost] = useState(0); 

  //for opening and closing the dialoge box
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  //dialog box handlers end

  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
    container: mapContainer.current,
    style: 'mapbox://styles/mapbox/streets-v11',
    //style: 'mapbox://styles/nithinraj1106/cl24jsrrg000314l9g2eosoz2',
   center: [lng, lat],
    zoom: zoom
    });
    console.log('Map API triggered');
    directions.current = new MapboxDirections({
      accessToken: mapboxgl.accessToken,
      unit: 'metric',
      profile: 'mapbox/driving'
    });

    directions.current.on("route", e => {
      setDistance(Math.round(e.route[0].distance/1000));
      //console.log(e.route[0].legs[0].steps[0].name);
      setDestination(directions.current.getDestination().geometry.coordinates.toString());
      setOrigin(directions.current.getOrigin().geometry.coordinates.toString());
      
    })

    if(route){
      directions.current.setOrigin(route[0]);
      directions.current.setDestination(route[1]);
    }

    map.current.addControl(directions.current,'top-left');
   
},[]);
    
 
  useEffect(() => {
      if (!map.current) return; // wait for map to initialize
      map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
    });
  
  useEffect(()=>{
    const pricePerKm = 0.00005;                                  //ethers per km set by default
    setCost(parseFloat((distance * pricePerKm).toFixed(8))); //ether wei rate  
  },[distance]);  

    //this function handles the create booking action
   //version 0.1.0
  //do not let the user click more than once
  const handleSubmit = ()=>{
    if(origin && destination){
      createNewBooking(username+';'+sessionStorage.getItem('usernumber'),origin,destination,cost);
      handleClose();
    }
      else  
      alert('Please set the origin and destination');
  }

  return (
    <>
    <Paper ref={mapContainer} style={{height: '100vh', width : '100vw',}} className='map-container'>
        
    </Paper>
    <Fab  onClick={handleClickOpen} disabled={isOntrip} style={sessionStorage.getItem('usertype')==='Driver'?{display:'none'}:{position:'sticky', bottom:'10vh', left:'90vw'  }} size="small" color="secondary" aria-label="add">
    <AddIcon/>
    </Fab>
    <Dialog open={open} fullWidth={true} scroll='body' >
        <DialogTitle>New Booking</DialogTitle>
        <DialogContent>
            <DialogContentText>
							Please confirm your booking...
            </DialogContentText>
                
              <Typography> Origin Location :  {origin}</Typography>
              <Typography> Destiantion Location :  {destination}</Typography>
              
              <div className="distance-result">
                <div> Distance: <span className="number-label">{distance}</span><span className="unit">Km</span></div>
                <div> Fee: <span className="number-label">0.05</span><span className="unit">/Km</span></div>
                <div> Total Cost: <span className="number-label">{cost}</span><span className="unit">Eth</span></div>
              </div> 
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default Map;