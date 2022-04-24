import React,{useEffect,useState, useContext, useRef} from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import {BottomNavigation,BottomNavigationAction, Paper} from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Booking from '../booking/Booking';
import {auth} from '../../firebaseconfig';
import { signOut } from "firebase/auth";
import {useNavigate} from "react-router-dom";
import { UserContext } from '../../contexts/userContext';
import  {RideshareContext}  from '../../contexts/rideshareContext';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import Map from '../map/map';
import { ContentPasteOffSharp } from '@mui/icons-material';
import OnTrip from '../trip/OnTrip';
export default function Home() {
  
  //setting up rideshare context
  const {connectWallet,getEthereumContract,getBookings,cancelBooking,connectedAccount,getBlocknumber,acceptBooking,getBooking} =  useContext(RideshareContext);
  

  //const {username,usernumber,usertype,setUsertype,setUsername,setUsernumber} = useContext(UserContext);
  const [usertype,setUsertype] = useState(sessionStorage.getItem('usertype'));
  const [username,setUsername] = useState(sessionStorage.getItem('username'));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [newbooking,setNewbooking] = useState(true);
  const [isOntrip,setisOntrip] = useState(false);
  const [route,setRoute] = useState(null);
  
  //bottom navigation values
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();
  const refreshbookings = useRef(null);
  
   //handle signout
   const handleSignout = ()=>{
    handleClose();
    signOut(auth).then(() => {
      console.log("logged out");
    }).catch((error) => {
      console.log(error);
    });
  }

  //check authentication status 
    useEffect(() => {
        if(!usertype){
          console.log('usertype is not defined navigating back to landing page');
          navigate('/');
          return
        }

        //checking for the authentication status and restricting access to the page
        auth.onAuthStateChanged(user=>{
          if(user)
          {
            return;
          }
          else
          {
            navigate('/');
          }
        });

        checkOntrip();

        //rideshare contract events subscription...
        const rideshareContract = getEthereumContract();
        let startBlockNumber=0;
        getBlocknumber().then(result=>startBlockNumber=result);
        
        rideshareContract.on("BookingCreated",(...args)=>{

          
            const event = args[args.length-1];
            //console.log(event.blockNumber + ' '+ startBlockNumber);
            if(event.blockNumber <= startBlockNumber) return;
            //console.log("checkpoint 1");
            getBooking(parseInt(event.data)-1).then((result)=>{ 
              if(sessionStorage.getItem('usernumber') === result.passengerInfo.split(';')[1])
                setValue(0);  
            })

            if(sessionStorage.getItem('usertype') === "Driver")
              refreshbookings.current(); 
            
            getBlocknumber().then(result=>startBlockNumber=result);
            

        });
        
        rideshareContract.on("BookingCancelled",(...args)=>{
          
              const event = args[args.length-1];
              if(event.blockNumber <= startBlockNumber) return;
              
              getBooking(parseInt(event.data)).then((result)=>{ 
                if(sessionStorage.getItem('usernumber') === result.passengerInfo.split(';')[1])
                  refreshbookings.current();
              })
              if(sessionStorage.getItem('usertype') === "Driver")
                  refreshbookings.current();   
              getBlocknumber().then(result=>startBlockNumber=result);
        });

        rideshareContract.on("BookingAccepted",(...args)=>{
          
              const event = args[args.length-1];
              if(event.blockNumber <= startBlockNumber) return;
              
              getBooking(parseInt(event.data)).then((result)=>{ 
                if(sessionStorage.getItem('usernumber') === result.passengerInfo.split(';')[1] || sessionStorage.getItem('usernumber') === result.driverInfo.split(';')[1])
                { setValue(2);
                  setisOntrip(true);
                if(sessionStorage.getItem('usertype') === "Driver") 
                  alert("You are on trip");
                else
                  alert(`Your booking as been accepted by ${result.driverInfo.split(';')[0]}, You are on trip`);
                }
              })
              getBlocknumber().then(result=>startBlockNumber=result);
        });

        rideshareContract.on("BookingCompleted",(...args)=>{
          
              const event = args[args.length-1];
              if(event.blockNumber <= startBlockNumber) return;
              //console.log(event.blockNumber + ' '+ startBlockNumber);
              getBooking(parseInt(event.data)).then((result)=>{ 
                if(sessionStorage.getItem('usernumber') === result.passengerInfo.split(';')[1] || sessionStorage.getItem('usernumber') === result.driverInfo.split(';')[1])
                {
                  
                  setValue(0);
                  setisOntrip(false);
                  if(sessionStorage.getItem('usertype') === "Driver") 
                    alert("Your trip has been completed, and the funds will be transferred shortly to your ethereum account");
                  else
                    alert(`Your trip with ${result.driverInfo.split(';')[0]} is completed`);
                }
                });
                getBlocknumber().then(result=>startBlockNumber=result);
        });

    },[]);
    
    
  const viewOnMap = (origin,destination)=>{
    setValue(1);
    setRoute([origin,destination]);
  }  

 
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const checkOntrip = ()=>{
    getBookings().then((result)=>{
      for(let i=0;i<result.length;i++){
        if(result[i].status==="ontrip" && (sessionStorage.getItem('usernumber') === result[i].passengerInfo.split(';')[1] || sessionStorage.getItem('usernumber') === result[i].driverInfo.split(';')[1])){
          setNewbooking(false);
          setisOntrip(true);
          return;
        }
      }
    });
  }
  
  

  return (
    <div>
    
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Rideshare
          </Typography>
          
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem >{username}</MenuItem>
                <MenuItem onClick={handleSignout}>Logout</MenuItem>
               {/* <MenuItem onClick={firebaseTest}>Test</MenuItem> */}
              </Menu>
            </div>
          
        </Toolbar>
      </AppBar>  

    
    {value==0?<Booking viewOnMap={viewOnMap} isOntrip= {isOntrip} refreshbookings={refreshbookings} />:null}
    {value==1?<Map route={route} isOntrip={isOntrip}/>:null}
    {value==2?<OnTrip  viewOnMap={viewOnMap} />:null}
      


    <Paper style={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
    <BottomNavigation
    showLabels
    value={value}
    onChange={(event, newValue) => {
        setValue(newValue);
    }}
    >
        <BottomNavigationAction label="Recents" icon={<RestoreIcon/>} />
        <BottomNavigationAction label="New Booking" icon={<LocationOnIcon color={newbooking?'':'warning'} />} />
        <BottomNavigationAction label="Current Trip" icon={<ElectricCarIcon />} />
    </BottomNavigation>
    </Paper>
    
    </div>

  );
}
