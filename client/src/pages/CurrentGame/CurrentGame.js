import React, { Component } from "react";
import axios from 'axios';
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import Navbar from "../../components/Navbar";
// import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Button, Input } from "reactstrap";
import './CurrentGame.css';
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
class CurrentGame extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }
  }

  getMyGame = () => {
    axios.get("/api/games/myGames")
      .then(response => {
        console.log(response)
      }).catch(error => {
        console.log(error);
      })
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Navbar logOut={this.props.logOut}/>
          </Col>
          <Col size="md-12">
            <Jumbotron username={this.props.username} target={this.props.target} targetURL={this.props.targetURL} currentGame={this.props.currentGame}/>
          </Col>
          <Col size="md-12">
            <div className="card">
              <button style={{width:"100px"}} onClick={this.getMyGame}>Get My Game</button>
              <h1>Group Name</h1>
              <br />
              <h2>Players</h2>
              <li />
              <ul className="nutDeadYet">Not Dead Yet</ul>
              <ul className="dead">The Fallen</ul>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CurrentGame;