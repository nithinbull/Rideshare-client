import React,{useEffect,useState, useContext} from 'react';
import { Box, Card, CardContent, Typography, TextField, Button, CardActions, Stack } from '@mui/material';
import {useNavigate} from "react-router-dom";
import background from "../../img/img.jpg";
import { UserContext } from '../../contexts/userContext';
import {app,auth} from '../../firebaseconfig';
import {signInWithPhoneNumber, RecaptchaVerifier} from 'firebase/auth';
import { EventRounded, InputOutlined } from '@mui/icons-material';

function UserLogin() {
	
	//const {username,usernumber,usertype,setUsertype,setUsername,setUsernumber} = useContext(UserContext);
	
	const navigate = useNavigate();
	const [usertype,setUsertype] = useState(sessionStorage.getItem('usertype'));
	const [input,setInputs] = useState({'name':'','number':'','otp':''});
	
	//Button states
	const [expandForm,setExpandForm] = useState(false);
	const [otpInputLock,setOtpInputLock] =  useState(false);
	
	const setSession=()=>{
		
		//Todo : need to validate the inputs before the updation		
		sessionStorage.setItem('username',input.name);		
		sessionStorage.setItem('usernumber',input.number);
		console.log('Here');
	}

	const createRecaptchaVerifier = ()=>{

		window.recaptchaVerifier = new RecaptchaVerifier('sign-in-button', {
		'size': 'invisible',
		'callback': (response) => {
			console.log('recaptcha sucess');
		}
	}, auth);
	}

	
	useEffect(() => {
       if(!usertype){
			console.log('usertype is not defined navigating back to landing page');
			navigate('/');
			return
		}
		auth.onAuthStateChanged(user=>{
			if(user)
			{
				console.log("You're Logged in");
				navigate('/home');
				return;
			}
		});
		
	  },[]);
	
	const requestOTP = ()=>{
		setExpandForm(true);
		createRecaptchaVerifier();
		let appVerifier = window.recaptchaVerifier;
		console.log(appVerifier);
		signInWithPhoneNumber(auth, input.number, appVerifier)
		.then((confirmationResult) => {
			window.confirmationResult = confirmationResult;
			setSession();
		}).catch((error) => {
			console.log(error);
		});

	
	}


	const handleInputChange = (event)=>{
		setInputs(inputs=>({...inputs,[event.target.name]:event.target.value}));
		
	}
	
	useEffect(()=>{
		verifyOtp();
	},[input]);

	const verifyOtp = ()=>{
		if(input.otp.length==6){
			setOtpInputLock(true);
			let confirmationResult = window.confirmationResult;
			confirmationResult.confirm(input.otp).then((result) => {
				const user = result.user;
				user.displayName = input.name;
				console.log(user);
			  }).catch((error) => {
				console.log(error);
				setInputs(inputs=>({...inputs,otp :''}));
				setOtpInputLock(false);
			  });
		}
	}

	return (
    <div style={{ backgroundImage: `url(${background})` }}>
        <Box style={{ minHeight: '100vh' }}>
		<Stack  alignItems="center" justifyContent="center" style={{ minHeight: '100vh' }}>
						
				<Typography align="center" variant="h5" component="h2">				
					You are a {usertype}			
                </Typography>                
				
				<TextField style={{ minWidth: '50vh' }} value={input.name} onChange={handleInputChange} name="name" label="Name" margin="normal" required/>			
				<TextField style={{ minWidth: '50vh' }} value={input.number} onChange={handleInputChange} name="number" label="Phone" margin="normal"  required />						

							
				<Button variant="contained" id='sign-in-button' onClick={requestOTP} style={!expandForm?{ minWidth: '50vh' }:{ minWidth: '50vh', display:'none' }} color="primary"  >Request OTP</Button>
					
				{ expandForm?
				<>
				<TextField style={{ minWidth: '50vh' }} disabled={otpInputLock} value={input.otp} onChange={handleInputChange} name="otp" label="otp" margin="normal"  required />						
					
				</>:null}				
							
		</Stack>
		</Box>				               
    </div>
  );
}

export default UserLogin;