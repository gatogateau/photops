import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { Container } from "../Grid/index";

const Navbar = props => (
      <div>
      <ul className="nav nav-pills nav-justified">
          <li className="gameName"><Link to="/">Photo-Ops <li className="gameName" id="assassin">Assassin</li></Link></li>
          <li className="signOut" onClick={(e) => {props.logOut(e); props.checkLoggedIn()}}>SignOut</li>
      </ul>
  </div>
);

export default Navbar;