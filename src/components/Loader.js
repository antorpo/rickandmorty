import React from "react";
import "./styles/Loader.css";

class Loader extends React.Component {
  render() {
    return (
      <div className="spinner-container">
        <div className="spinner">
          <div className="sk-chase ">
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
            <div className="sk-chase-dot"></div>
          </div>
        </div>
      </div>
    );
  }
}

export default Loader;
