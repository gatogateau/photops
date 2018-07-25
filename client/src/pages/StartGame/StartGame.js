import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import Navbar from "../../components/Navbar";
// import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
// import { Button, Input } from "reactstrap";
import './StartGame.css';
import axios from "axios";
import Modal from 'react-awesome-modal';
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
class JoinGame extends Component {
  constructor(props) {
    super(props)

    this.state = {
      gameName: "",
      allGames: [],
      visible1: false
    }
    this.findAllGames = this.findAllGames.bind(this);
  }

  findAllGames() {
    this.openModal1();
    let that = this;
    axios.get('/api/games/allGames')
      .then(function (response) {
        // handle success
        console.log(this, response.data, that);
        that.setState({
          allGames: response.data,
        });

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
  openModal1() {
    this.setState({
      visible1: true
    });
  }

  closeModal1() {
    this.setState({
      visible1: false
    });
  }

  joinGame = (e) => {
    console.log("hit")
    e.preventDefault();
    axios.put("/api/games/joinGameByGameName", { game: this.state.gameName })
      .then(function (response) {
        if (response.data.message) {
          alert(response.data.message)
        }
        console.log(response);
      })
  }

  handleGameNameInput = (e) => {
    console.log("hit")
    this.setState({
      gameName: e.target.value
    })
  }
  startSpecificGame = (e, gameName) => {
    console.log('anything')
    e.preventDefault();
    axios.put("/api/games/start/startGame", { game: gameName })
      .then(function (response) {
        if (response.data.message) {
          alert(response.data.message)
        }
        console.log("this should be the start game response" + response);
      })
    axios.post("/api/games/updateActiveGames", { game: gameName })
      .then(function (response) {
        if (response.data.message) {
          alert(response.data.message)
        }

        console.log("this should be the start game response" + response);

      })
    console.log("this should be the current game" + this.props.currentGame);
    window.location.pathname = "/";

  }
  sendGameToJerson = (game) => {
    axios.post("/api/games/start/startGame", { game: game })
      .then(function (response) {
        if (response.data.message) {
          alert(response.data.message)
        }
        console.log("this should be the response from jerson " + response);
      })
  }

  render() {
    console.log(this)
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Navbar logOut={this.props.logOut} />
          </Col>
          <Col size="md-12">
            <Jumbotron username={this.props.username} logOut={this.props.logOut} target={this.props.target} targetURL={this.props.targetURL} currentGame={this.props.currentGame} kills={this.props.kills} />
          </Col>
          <Col size="md-12">
            <div className="startGameForm">
              <h1>Start</h1>
              <br />
              <button
                className="fag"
                onClick={this.findAllGames}
              >
                <h4>Find All Games</h4>
              </button>
              <br />
              {this.state.allGames.map((game, i) =>
                <li key={i} onClick={(e) => { this.startSpecificGame(e, game.game), this.sendGameToJerson(game.game) }}>{game.game}</li>
              )}
              <br />
            </div>
          </Col>
        </Row>
        <Modal visible={this.state.visible1} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal1()}>
          <div>
            <h2  id="startInstructions">Click Game Name to Start</h2>
            <br/>
            <a href="javascript:void(0);" onClick={() => this.closeModal1()}>Close</a>
          </div>
        </Modal>
        <Link style={{ visibility: "hidden" }} to="/" id="linkHome">Home</Link>
      </Container>
    );
  }
}

export default JoinGame;