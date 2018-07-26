import React, { Component } from "react";
// import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import Navbar from "../../components/Navbar";
// import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { Button} from "react-bootstrap";
import './home.css';
// import { List, ListItem } from "../../components/List";
// import { Input, TextArea, FormBtn } from "../../components/Form";
class Home extends Component {

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
            <Jumbotron username={this.props.username} target={this.props.target} targetURL={this.props.targetURL} currentGame={this.props.currentGame} kills={this.props.kills}/>
          </Col>
          <Col size="md-12">
            <Link to="/enrollcam">
              <Button className="btns">
                Upload Your Face
              </Button>
            </Link>
            <Link to="/creategame">
              <Button className="btns">
                Create Game
              </Button>
            </Link>
            <Link to="/joingame">
              <Button className="btns">
                Join Game
              </Button>
            </Link>
            <Link to="/StartGame">
              <Button className="btns">
                Start Game
              </Button>
            </Link>
            {/* <Link to="/currentgame">
              <Button style={{visibility: "hidden"}} className="btns">
                Current Game
              </Button>
            </Link> */}
            <Link to="/verifycam">
              <Button id="assButt" className="btns">
                Assassinate
              </Button>
            </Link>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Home;