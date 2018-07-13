import React from "react";
import "./Navbar.css";

const Navbar = props => (
      <div>
      <ul className="nav nav-pills nav-justified">
          <li><a href="/">Photo-Ops Assassin</a></li>
          <li className="signOut" onClick={(e) => {props.logOut(e); props.checkLoggedIn()}}>SignOut</li>
      </ul>
  </div>
);

export default Navbar;