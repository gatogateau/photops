
//sets up the reusable Jumbotron component
import React from "react";
import { Image } from 'react-bootstrap';
import "./Jumbotron.css";

const Jumbotron = () => (
	<header className = "header">
		<Image src="/thumbnail.png" alt="image" circle responsive />
	</header>
);
export default Jumbotron;