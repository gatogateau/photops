
//sets up the reusable Jumbotron component
import React from "react";
import "./Jumbotron.css";
import Background from "../../images/Wallpaper-HD.jpg";
import axios from "axios"

axios.get('/api/users/allusers')
  .then(function (response) {
    console.log(response);
  })
  .catch(function (error) {
    console.log(error);
  });

const Jumbotron = () => (
	<header className = "header">
		<h4 id="userName">User Name</h4>
		<h5>Kills</h5>
		<h5 id="kills">0</h5>
		<h1 id="target">Target</h1>
		<img id="targetpic" alt="target picture"></img>
		
	</header>
);
export default Jumbotron;