
//sets up the reusable Jumbotron component
import React from "react";
import "./Jumbotron.css";

const Jumbotron = () => (
	<header className = "header">
		<img src="/thumbnail.png" alt="Image" circle responsive />
		<h1></h1>
	</header>
);
export default Jumbotron;