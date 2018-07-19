import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = props => (
      <div>
      <ul className="nav nav-pills nav-justified">
          <li><Link to="/">Photo-Ops Assassin</Link></li>
          <li className="signOut" onClick={(e) => {props.logOut(e); props.checkLoggedIn()}}>SignOut</li>
      </ul>
  </div>
);

export default Navbar;