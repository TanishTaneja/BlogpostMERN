import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";

const Navbar = ({isLoggedIn,setAuth}) => {
  const [style, setStyle] = useState(false);
  let navigate=useNavigate();
  const handleLogout = async() => {
    try{
      await axios.get('http://localhost:5000/post/logout')
      .then((res)=>{
        if(res.data.logout){
          navigate("/")
          setAuth(res.data.logout)
        }
      })
      .catch((err)=>{
        console.log("Session was not destroyed")
      })
      console.log('User logged out successfully.');
      localStorage.removeItem("auth");
      setAuth(false);
    }
    catch(er){
      console.log(er)
    }
  };
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
        <div className="container">
          <Link to="/" className="navbar-brand" >Blogs</Link>
          <button onClick={() => {
            setStyle(!style);
          }} className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
            Menu
            <i className="fas fa-bars"></i>
          </button>
          <div id="navbarResponsive2">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to="/" className="nav-link">Home</Link>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">Contact</a>
              </li>
              {isLoggedIn?(
                <li className="nav-item">
                  <a onClick={handleLogout} className="nav-link">LogOut</a>
                </li>
              ):(
                <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                <Link to="login" className="nav-link">LogIn</Link>
                </li>
                <li className="nav-item">
                  <Link to="register" className="nav-link">Register</Link>
                </li>
                </ul>
              )}
            </ul>
          </div>
          <div style={style ? {
            height: "100px",
            overflow: "hidden",
            transition: "0.4s"
          } : {
            height: "0px",
            overflow: "hidden",
            transition: "0.4s"
          }} className="collapse navbar-collapse" id="navbarResponsive">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact">Contact</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}
export default Navbar;
