import { createContext, useState } from "react";


const alertContext = createContext();



const   AlertState = (props) => {
   
 const [alert, setalert] = useState(null) ;

 const showAlert = (message, type) => {
    setalert({
        msg : message, 
        type : type
    })

    setTimeout(() => {
        setalert(null);
      }, 3000);
 }
     
  return (
    <alertContext.Provider value={{showAlert, alert}}>
        {props.children}
    </alertContext.Provider>
  )
}

export  {AlertState, alertContext}