
//sets up the reusable Jumbotron component
import React from "react";
import "./Jumbotron.css";
// import Background from "../../images/Wallpaper-HD.jpg";

const Jumbotron = (props) => (
	<header className = "header">
	<h1 id="userName">{props.username.toUpperCase()}</h1>
	<div className="gradient">
		<h5 id="kills">Kills : {props.kills}</h5>
		<h3 id="currentGame">Game: {props.currentGame}</h3>
		<h3 id="target">Target : <span id="tguy">{props.target}</span></h3>
		<img src={props.targetURL}id="targetpic" alt="Target needs to upload their face!"></img>
		</div>
		
	</header>
);
export default Jumbotron;