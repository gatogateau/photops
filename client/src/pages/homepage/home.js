import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import Navbar from "../../components/Navbar";
// import API from "../../utils/API";
// import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Button} from "react-bootstrap";
import './home.css';
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
class Home extends Component {
  constructor(props){
    super(props)
  }

  componentWillMount(){
    this.checkLoggedIn();
  }
  
  checkLoggedIn = () => {
    if(!this.props.loggedIn) {
      window.location.pathname = '/'
    }
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-12">
            <Navbar checkLoggedIn={this.checkLoggedIn} logOut={this.props.logOut} />
          </Col>
          <Col size="md-12">
            <Jumbotron username={this.props.username} target={this.props.target} targetURL={this.props.targetURL}/>
          </Col>
          <Col size="md-12">
            <a href="/enrollcam">
              <Button className="btns">
                Upload Your Face
              </Button>
            </a>
            <a href="/currentgame">
              <Button className="btns">
                Current Game
              </Button>
            </a>
            <a href="/creategame">
              <Button className="btns">
                Create Game
              </Button>
            </a>
            <a href="/joingame">
              <Button className="btns">
                Join Game
              </Button>
            </a>
            <a href="/verifycam">
              <Button className="btns">
                Assassinate
              </Button>
            </a>
            <a href="/StartGame">
              <Button className="btns">
                Start Game
              </Button>
            </a>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;