import React from "react";
import {formatISO9075} from "date-fns"
import { Link } from "react-router-dom";

function Blogitem(props) {

  let {title, summary, updatedAt, image, name, _id} = props
  return (
    <div className="col-md-4">
        <div className="my-2">
      <div className="card">
        <Link to= {`/post/${_id}`}  style={{textDecoration : "None", color:"black"}} ><img src={image}  className="card-img-top" alt="This is empty" /></Link>
        <div className="card-body">
        <Link to= {`/post/${_id}`} className="card-title" style={{textDecoration : "None"}}><h5  >{title}</h5></Link>
          <p className="card-text">{summary}</p>
          
          <p className="card-text">
            <small className="text-muted"> 
              By <strong>{name}</strong> on {formatISO9075(new Date(updatedAt))}
            </small>
          </p>
          
        </div>
      </div>
    </div>
    </div>
  );
}

export default Blogitem;
