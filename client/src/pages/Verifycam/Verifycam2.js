import React, { Component } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import $ from "jquery";
import "jquery";
import cloudinary from 'cloudinary';
import axios from 'axios';
import Modal from 'react-awesome-modal';
import Cors from 'cors';

cloudinary.config({
  cloud_name: 'notjarvis',
  api_key: '478844584369981',
  api_secret: 'vxEprjN0c5IMHkQHu_WUpz1b9hA'
});


class Verifycam2 extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible1: false,
      visible2: false,
      visible3: false,
      currentGame: this.props.currentGame,
    };
    this.runKillFunction = this.runKillFunction.bind(this);
    this.onTakePhoto = this.onTakePhoto.bind(this);
  }
  
  onTakePhoto (dataUri) {
    let that = this;
    alert(dataUri.data);
    // Do stuff with the dataUri photo...
    Cors(cloudinary.v2.uploader.unsigned_upload(dataUri, "yg8xsc2x", 
    { cloud_name: "notjarvis" }, 
    function(error, result) {alert(error) 
      let payload = { "image": result.url, "subject_id": that.props.target, "gallery_name": "players" };
      let headers = {
        "Content-type": "application/json",
        "app_id": "3152266b",
        "app_key": "702449259a83518d27467f43d20715d4"
      };
      $.ajax("https://api.kairos.com/verify", {
          headers: headers,
          type: "POST",
          data: JSON.stringify(payload),
          dataType: "text"
      }).done(function (response) {
        console.log(response);
          let confidence = JSON.parse(response).images["0"].transaction.confidence;

          if(confidence >= .80) {
            // that.openModal1();
            alert("Target Eliminated")
            that.runKillFunction();
          } else {
            // that.openModal2();
            alert("Sorry you missed!")
          // change alert to modal
        } 
          
      });

  }));
  }
 
  onCameraError (error) {
    console.log('onCameraError', error);
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
openModal2() {
    this.setState({
        visible2: true
    });
}

closeModal2() {
    this.setState({
        visible2: false
    });
}
openModal3() {
    this.setState({
        visible3: true
    });
}

closeModal3() {
    this.setState({
        visible3: false
    });
}

runKillFunction() {
    let that = this;
    console.log("pre kill target");
    axios.put('/api/games/killTarget', {
        username: that.props.target,
        game: that.state.currentGame

    })
      .then(function (response) {
        // handle success
        console.log(response.data);
        if(response.data === "Chad Rules"){
            // that.openModal3(); 
            alert("Congratulations You Win!!!")
        }

      })
      .catch(function (error) {
        // handle error
        console.log(error);
      })
  }
 
  render () {
    return (
      <div className="Verifycam2">
        <Camera
          onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
          onCameraError = { (error) => { this.onCameraError(error); } }
          idealFacingMode = {FACING_MODES.ENVIRONMENT}
          idealResolution = {{width: 640, height: 480}}
          imageType = {IMAGE_TYPES.JPG}
          imageCompression = {0.97}
          isMaxResolution = {false}
          isImageMirror = {false}
          isDisplayStartCameraError = {true}
          sizeFactor = {1}
        />
        <a href="/"><button>Back</button></a>
        <Modal visible={this.state.visible1} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal1()}>
          <div>
            <h1 className="eliminated">Target Eliminated!</h1>
            <a href="javascript:void(0);" onClick={() => this.closeModal1()}>Close</a>
          </div>
        </Modal>
        <Modal visible={this.state.visible2} width="400" height="300" effect="fadeInDown" onClickAway={() => this.closeModal2()}>
          <div>
            <h1 className="missed">Oops, you missed!</h1>
            <p>Please try again.</p>
            <a href="javascript:void(0);" onClick={() => this.closeModal2()}>Close</a>
          </div>
        </Modal>
        <Modal visible={this.state.visible3} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal3()}>
          <div>
            <h1 className="youWin">Congratulations</h1>
            <img id="winning" src="https://media0.giphy.com/media/Q56SF4czEtSZG/giphy.gif"/>
            <h1 className="win">You Win!</h1>
            <a href="javascript:void(0);" onClick={() => this.closeModal3()}>Close</a>
          </div>
        </Modal>
      </div>
    );
  }
}
 
export default Verifycam2;