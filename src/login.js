import React, { Component } from 'react';
import './App.css';``


class LogIn extends Component {
  render() {
    return (
      
      <div className="signInBox">
       <form>
         <br/>
         <input type="text" placeholder="Username">
         </input>
         <br/>
         <br/>
         <input type="text"
         placeholder="Password">
         </input>
         <input type="submit" className="signInButton"
         placeholder="Login">
         
         </input>
         </form>

         <div>
           <br/>
           {/* <h2>Not a user? </h2> */}
         <button className="signUpButton">
          Sign up now!
         </button> 
        </div>
      </div>
     
    );
  }
}

export default LogIn;
