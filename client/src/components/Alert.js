import React, { useContext } from "react";
import { alertContext } from "../contexts/alerts/AlertState";

export default function Alert() {

  const {alert} = useContext(alertContext)

  const captilaize = (word) => {
     if(word === "danger") word="error";

     return word[0].toUpperCase()+word.slice(1);
  }

  return (
    <div style={{height:"50px"}}>
     {alert && <div className={`alert alert-${alert.type}`} role="alert">
       {captilaize(alert.type)}: {alert.msg}
      </div>
}
    </div>
  );
}
