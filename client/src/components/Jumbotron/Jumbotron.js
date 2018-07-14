
//sets up the reusable Jumbotron component
import React from "react";
import "./Jumbotron.css";
// import Background from "../../images/Wallpaper-HD.jpg";

const Jumbotron = (props) => (
	<header className = "header">
		<h1 id="userName">{props.username.toUpperCase()}</h1>
		<h5>Kills</h5>
		<h5 id="kills">0</h5>
		<h1 id="target">Target : {props.target}</h1>
		<img id="targetpic" alt="target"></img>
		
	</header>
);
export default Jumbotron;