
//sets up the reusable Jumbotron component
import React, { Component } from 'react';
import "./Jumbotron.css";
// import Background from "../../images/Wallpaper-HD.jpg";

class Jumbotron extends Component {
	render (props) {
	<header className = "header">
	<h1 id="userName">{props.username.toUpperCase()}</h1>
		<h5 id="kills">Kills : {props.kills}</h5>
		<h3 id="currentGame">Game: {props.currentGame}</h3>
		<h3 id="target">Target : <span id="tguy">{props.target}</span></h3>
		<img src={props.targetURL}id="targetpic" alt="Target needs to upload their face!"></img>
		
		
	</header>
	}
};
export default Jumbotron;