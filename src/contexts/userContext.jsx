import { useState, createContext, useEffect} from "react";
import React from 'react';

export const UserContext = createContext({});


export const UserProvider = ({children})=>{
    const [username,setUsername] = useState(sessionStorage.getItem('username'));
    const [usernumber,setUsernumber] = useState(sessionStorage.getItem('usernumber'));
    const [usertype,setUsertype] = useState(sessionStorage.getItem('usertype'));

      

    return(
        <UserContext.Provider value={{username,usernumber,usertype,setUsername,setUsernumber,setUsertype}}>
            {children}
        </UserContext.Provider>
    );
    

}   