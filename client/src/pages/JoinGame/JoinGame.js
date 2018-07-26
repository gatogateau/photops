import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import Navbar from "../../components/Navbar";
// import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";

import { Button, Input } from "reactstrap";
import "./JoinGame.css";
import axios from "axios";

import { Input } from "reactstrap";
import './JoinGame.css';
import axios from "axios";
import Modal from 'react-awesome-modal';

// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
class JoinGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allGames: [ ],
      visible1: false
    }

    this.findAllGames = this.findAllGames.bind(this);
  }

  findAllGames() {
    this.openModal1();
    let that = this;
    axios
      .get("/api/games/allGames")
      .then(function(response) {
        // handle success
        console.log(this, response.data, that);
        that.setState({
          allGames: response.data
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      });
  }


  joinGame = (e) => {
    console.log("hit")
    e.preventDefault();
    axios.put("/api/games/joinGameByGameName", { game: this.state.gameName })
      .then(function (response) {
        if (response.data.message) {
          alert(response.data.message);
        }
        console.log(response);
      });
  };

  handleGameNameInput = e => {
    console.log("hit");
    this.setState({
      gameName: e.target.value
    });
  };
  joinSpecificGame = (e, gameName) => {

    e.preventDefault();
    axios.put("/api/games/joinGameByGameName", { game: gameName })
      .then(function (response) {
        if (response.data.message) {
          alert(response.data.message);
        }
        console.log(response);
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

  render() {
    console.log(this);
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Navbar logOut={this.props.logOut} />
          </Col>
          <Col size="md-12">

            <Jumbotron username={this.props.username} target={this.props.target} targetURL={this.props.targetURL} currentGame={this.props.currentGame} kills={this.props.kills}/>
          </Col>
          <Col size="md-12">
            <div className="joinGameForm">
            <form>
              <h1>Join Game</h1>
                <Input className="inputField" onChange={(e) => this.handleGameNameInput(e)} type="input" name="input" 
                  placeholder="Game Name" bsSize="md" />
                  <br/>
                <Input className="inputField" type="input" name="input" 
                  placeholder="Game ID" bsSize="md" />
                  <br/>
                <button className="fag" onClick={(e) => this.joinGame(e)}><h4>Join</h4></button>

              </form>
              <br />
              <button className="fag" onClick={this.findAllGames}>
                Find All Games
              </button>

              <br/>
              {this.state.allGames.map((game, i) =>
              <li key={i} onClick={(e) =>{this.joinSpecificGame(e, game.game)}}>{game.game}</li>
            )}

              <br />
            </div>

            <div className="gameResults">
            {this.state.allGames.map((game, i) => (
              <div
                key={i}
                onClick={e => {
                  this.joinSpecificGame(e, game.game);
                }}
              >
                {game.game}
              </div>
            ))}
            </div>
          </Col>
        </Row>
        <Modal visible={this.state.visible1} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal1()}>
          <div>
            <h2  id="joinInstructions">Click Game Name to Join</h2>
            <br/>
            <a href="javascript:void(0);" onClick={() => this.closeModal1()}>Close</a>
          </div>
        </Modal>
      </Container>
    );
  }
}

export default JoinGame;
