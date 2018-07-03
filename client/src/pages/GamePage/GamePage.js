import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import Navbar from "../../components/Navbar";
// import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
// import { Button,Input } from "reactstrap";
import './GamePage.css';
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";

class GamePage extends Component {
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

          </Col>
        </Row>
      </Container>
    );
  }
}

export default GamePage;