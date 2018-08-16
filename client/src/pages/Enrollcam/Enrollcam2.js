import React, { Component } from 'react';
import Camera, { FACING_MODES, IMAGE_TYPES } from 'react-html5-camera-photo';
import 'react-html5-camera-photo/build/css/index.css';
import $ from "jquery";
import "jquery";
import cloudinary from 'cloudinary';
import axios from 'axios';
import Modal from 'react-awesome-modal';

cloudinary.config({
  cloud_name: 'notjarvis',
  api_key: '478844584369981',
  api_secret: 'vxEprjN0c5IMHkQHu_WUpz1b9hA'
});
 
class Enrollcam extends Component {
  constructor(props) {
    super(props);
    this.onTakePhoto = this.onTakePhoto.bind(this);
}
  componentDidMount() {
      alert("Please take 3-4 picture to help with detction.");
  }
  onTakePhoto (dataUri) {
    let that = this;
    // Do stuff with the dataUri photo...
    axios
    .post('/api/users/cloudinary', { picture: dataUri })
    .then(response => {
      console.log(response)
      axios.put('/api/users/capturePic', {
        userPicture: response.data
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
      let payload = { "image": response.data, "subject_id": that.props.username, "gallery_name": "players" };
      let headers = {
        "Content-type": "application/json",
        "app_id": "3152266b",
        "app_key": "702449259a83518d27467f43d20715d4"
      };
      $.ajax("https://api.kairos.com/enroll", {
          headers: headers,
          type: "POST",
          data: JSON.stringify(payload),
          dataType: "text"
      }).done(function (response) {
        console.log(response);
          
      });

  });
  }
 
  onCameraError (error) {
    console.log('onCameraError', error);
  }

 
  render () {
    return (
      <div className="Verifycam2">
        <Camera
          onTakePhoto = { (dataUri) => { this.onTakePhoto(dataUri); } }
          onCameraError = { (error) => { this.onCameraError(error); } }
          idealFacingMode = {FACING_MODES.USER}
          idealResolution = {{width: 640, height: 480}}
          imageType = {IMAGE_TYPES.JPG}
          imageCompression = {0.5}
          isMaxResolution = {false}
          isImageMirror = {false}
          isDisplayStartCameraError = {true}
          sizeFactor = {1}
        />
        <a href="/"><button>Back</button></a>
      </div>
    );
  }
}
 
export default Enrollcam;