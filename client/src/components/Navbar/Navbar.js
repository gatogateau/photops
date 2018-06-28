import React from "react";
import "./Navbar.css";

const Navbar = props => (
      <div>
      <ul className="nav nav-pills nav-justified">
          <li><a href="/">Photo-Ops Assassin</a></li>
          <li>SignOut</li>
      </ul>
  </div>
);

export default Navbar;