import React from "react";
import "./Backdrop.css";

const BackDrop = (props) => {
  return <div className="backdrop" onClick={props.closeDrawer}></div>;
};

export default BackDrop;
