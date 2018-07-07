import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import Navbar from "../../components/Navbar";
// import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Button, ButtonGroup } from "react-bootstrap";
import './home.css';
import { getFromStorage, setInStorage } from '../../utils/storage';
import 'whatwg-fetch';
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
class Home extends Component {
  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Navbar />
          </Col>
          <Col size="md-12">
            <Jumbotron />
          </Col>
          <Col size="md-12">
            <a href="/enrollcam">
              <Button className="btns">
                <h1>Upload Your Face</h1>
              </Button>
            </a>
            <a href="/currentgame">
              <Button className="btns">
                <h1>Current Game</h1>
              </Button>
            </a>
            <a href="/creategame">
              <Button className="btns">
                <h1>Create Game</h1>
              </Button>
            </a>
            <a href="/joingame">
              <Button className="btns">
                <h1>Join Game</h1>
              </Button>
            </a>
            <a href="/verifycam">
              <Button className="btns">
                <h1>Assassinate</h1>
              </Button>
            </a>
            <Button className="btns">
              <h1>Store</h1>
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;