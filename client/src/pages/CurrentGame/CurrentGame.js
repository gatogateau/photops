import React, { Component } from "react";
import axios from "axios";
import Jumbotron from "../../components/Jumbotron";
import Navbar from "../../components/Navbar";
import ReactTable from "react-table";
import "react-table/react-table.css"
import { Col, Row, Container } from "../../components/Grid";
import { Button, Input } from "reactstrap";
import "./CurrentGame.css";
import './CurrentGame.css';

class CurrentGame extends Component {
  constructor(props) {
    super(props);

    this.state = {
      GameName: "",
      Alive: "",
      Fallen: ""
    };
  }

  getMyGame = () => {
    axios
      .get("/api/games/myGames")
      .then(response => {
        console.log(response);
        this.setState = {
          GameName : this.response.data.activeGames
        }
      })
      .catch(error => {
        console.log(error);
      });
  };

  render() {
    const { data } = this.state;
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Navbar logOut={this.props.logOut} />
          </Col>
          <Col size="md-12">

            <Jumbotron
              username={this.props.username}
              target={this.props.target}
              targetURL={this.props.targetURL}
            />
          </Col>
          <Col size="md-12">
            <div className="currentGame">
              <button className="curGames" onClick={this.getMyGame}>
               Current Games
              </button>
              <h1> {this.state.GameName} </h1>
              <br />
              <h2>Players</h2>
               
              <ReactTable
              data={[]}
              noDataText="No Cureent Games!"
              columns={[
                {
                  Header: "Alive"
                },{
                  Header: "Fallen"
                }
            ]}
            defaultPageSize={5}
            className="-striped -highlight"
            showPagination={false}
          />

            <Jumbotron username={this.props.username} target={this.props.target} targetURL={this.props.targetURL} currentGame={this.props.currentGame} kills={this.props.kills}/>
          </Col>
          <Col size="md-12">
          <div className="currentGameForm">
              <button style={{visibility: "hidden"}} onClick={this.getMyGame}>Get My Game</button>
              <h1>{this.props.currentGame}</h1>
              <h2 className="notDeadYet">Not Dead Yet</h2>
              <h2 className="dead">The Fallen</h2>
              <br/>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CurrentGame;
