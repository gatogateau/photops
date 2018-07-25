import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import Navbar from "../../components/Navbar";
// import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Button, Input } from "reactstrap";
import "./CreateGame.css";
import axios from "axios";
import Modal from 'react-awesome-modal';
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
class CreateGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      createGameForm: [
        { game: "", startDate: "", duration: "", gameType: "Public" }
      ],
      allUsers: [],
      visible1: false
    };

    this.createGame = this.createGame.bind(this);
    this.searchAllUsers = this.searchAllUsers.bind(this);
  }

  searchAllUsers() {
    let that = this;
    axios
      .get("/api/users/allUsers")
      .then(function(response) {
        // handle success
        console.log(response);
        that.setState({
          allUsers: response.data
        });
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  }

  startGame() {
    axios
      .get("/api/games/startGame")
      .then(function(response) {
        // handle success
        console.log(response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
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

  createGame(event) {
    event.preventDefault();

    let createGameForm = {
      game: document.getElementById("game").value,
      startDate: document.getElementById("startDate").value,
      duration: document.getElementById("duration").value
    };
    console.log(createGameForm);

    axios
      .post("/api/games/createGame", createGameForm)
      .then(function(response) {
        // handle success
        console.log(response);
      })
      .catch(function(error) {
        // handle error
        console.log(error);
      })
      .then(function() {
        // always executed
      });
  }
  render() {
    return (
      <Container>
        <Row>
          <Col size="md-12">
            <Navbar logOut={this.props.logOut} />
          </Col>

          <Col size="md-12">
            <Jumbotron username={this.props.username} target={this.props.target} targetURL={this.props.targetURL} currentGame={this.props.currentGame} kills={this.props.kills}/>
          </Col>

          <Col size="md-12">
            <div className="createGameForm">
              <form>
              <h1 id="title">Create Game</h1>
                <Input
                  className="gameFormInput"
                  type="submit text"
                  name="input"
                  id="game"
                  placeholder="Game Name"
                  bsSize="md"
                />
                <Input
                  className="gameFormInput"
                  type="input"
                  name="input"
                  id="startDate"
                  placeholder="Start Date"
                  bsSize="md"
                />
                <Input
                  className="gameFormInput"
                  type="input"
                  name="input"
                  id="duration"
                  placeholder="Duration"
                  bsSize="md"
                />
                <Button
                  className="createButton"
                  onClick={this.createGame}
                  type="Success">
                  Create
                </Button>
                {/* run the findUserName function from the api route /api/users/findUserName  in the model Users, username is not camelcase */}
                <Input
                  className="gameFormInput"
                  type="input"
                  name="findUser"
                  id="example"
                  placeholder="Users"
                  bsSize="md"
                />
                <Button className="userButton">Add Users
                </Button>
                <Button className="userButton" onClick={this.searchAllUsers}>
                  Search Users
                </Button>
              </form>
              <div className="usersResults">
              {this.state.allUsers.map((user, i) => (
                <li key={i}>{user.username}</li>
              ))}
              </div>
              <Modal visible={this.state.visible1} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal1()}>
                    <div>
                        <h1 className="eliminated">CLick Users Name To Add To Game</h1>
                        <a href="javascript:void(0);" onClick={() => this.closeModal1()}>Close</a>
                    </div>
                </Modal>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CreateGame;
