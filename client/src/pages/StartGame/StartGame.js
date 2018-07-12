import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import Navbar from "../../components/Navbar";
// import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Button, Input } from "reactstrap";
import './StartGame.css';
import axios from "axios"
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
class JoinGame extends Component {
  constructor(props) {
    super(props)

    this.state = {
      gameName: "",
      allGames: [ ]
    }
    this.findAllGames = this.findAllGames.bind(this);
  }
  
  findAllGames() {
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

  joinGame = (e) => {
    console.log("hit")
    e.preventDefault;
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
    e.preventDefault;
    axios.put("/api/games/startGame", { game: gameName })
      .then(function (response) {
        if (response.data.message) {
          alert(response.data.message)
        }
        console.log(response);
      })

  } 

  render() {
    console.log(this)
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Navbar logOut={this.props.logOut}/>
          </Col>
          <Col size="md-12">
            <Jumbotron username={this.props.username} />
          </Col>
          <Col size="md-12">
            <div className="card">
              <h1>Start</h1>
              <br />
              <button
                className="fag"
                onClick={this.findAllGames}
              >
                <h4>Find All Games</h4>
              </button>
              {this.state.allGames.map((game, i) =>
              <li key={i} onClick={(e) =>{this.startSpecificGame(e, game.game)}}>{game.game}</li>
            )}
              <br />
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default JoinGame;