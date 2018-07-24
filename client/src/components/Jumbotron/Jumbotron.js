
//sets up the reusable Jumbotron component
import React from "react";
import "./Jumbotron.css";
// import Background from "../../images/Wallpaper-HD.jpg";

const Jumbotron = (props) => (
	<header className = "header">
		<h1 id="userName">{props.username.toUpperCase()}</h1>
		<h5>Kills</h5>
		<h5 id="kills">{props.kills}</h5>
		<h3 id="currentGame">Current Game: {props.currentGame}</h3>
		<h2 id="target">Target : {props.target}</h2>
		<img src={props.targetURL}id="targetpic" alt="Target needs to upload their face!"></img>
		
	</header>
);
export default Jumbotron;