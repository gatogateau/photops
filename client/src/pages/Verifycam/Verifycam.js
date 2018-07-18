import React, { Component } from 'react';
import Camera from 'react-camera';
import $ from "jquery";
import cloudinary from 'cloudinary';
import axios from 'axios';
import Modal from 'react-awesome-modal';
import './Verifycam.css';

cloudinary.config({
    cloud_name: 'notjarvis',
    api_key: '478844584369981',
    api_secret: 'vxEprjN0c5IMHkQHu_WUpz1b9hA'
});
class Verifycam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible: false
        };
        this.takePicture = this.takePicture.bind(this);
        this.runKillFunction = this.runKillFunction.bind(this);
    }
    style = {
        preview: {
            position: 'relative',
        },
        captureContainer: {
            display: 'flex',
            position: 'absolute',
            justifyContent: 'center',
            zIndex: 1,
            bottom: 0,
            width: '100%'
        },
        captureButton: {
            backgroundColor: '#fff',
            borderRadius: '50%',
            height: 56,
            width: 56,
            color: '#000',
            margin: 20
        },
        captureImage: {
            width: '100%',
        }
    }

    openModal() {
        this.setState({
            visible : true
        });
    }
 
    closeModal() {
        this.setState({
            visible : false
        });
    }

    runKillFunction() {
        console.log("pre kill target");
        axios.put('/api/games/killTarget')
          .then(function (response) {
            // handle success
            console.log(response);
    
          })
          .catch(function (error) {
            // handle error
            console.log(error);
          })
      }


    takePicture() {
        let that = this;
        this.camera.capture()
            .then(blob => {
                this.img.src = URL.createObjectURL(blob);
                let reader = new FileReader();
                reader.readAsDataURL(blob);
                reader.onloadend = function () {
                    const base64data = reader.result;
                    cloudinary.uploader.upload(base64data, function (result) {
                        console.log(result);
                        let payload = { "image": result.url, "subject_id": that.props.target, "gallery_name": "players" };
                        let headers = {
                            "Content-type": "application/json",
                            "app_id": "3152266b",
                            "app_key": "702449259a83518d27467f43d20715d4"
                        };
                        $.ajax("http://api.kairos.com/verify", {
                            headers: headers,
                            type: "POST",
                            data: JSON.stringify(payload),
                            dataType: "text"
                        }).done(function (response) {
                            let confidence = JSON.parse(response).images["0"].transaction.confidence;

                            confidence>=.80 ? (that.openModal(), that.runKillFunction()) : alert('Please try again!')
                            // change alert to modal
                            
                        });

                    });
                }

                //this.img.onload = () => { URL.revokeObjectURL(this.src); }



            })
    }




    render() {
        return (
            <div style={this.style.container}>
                <Camera
                    style={this.style.preview}
                    ref={(cam) => {
                        this.camera = cam;
                    }}
                >
                    <view style={this.style.captureContainer} onClick={this.takePicture}>
                        <button style={this.style.captureButton} />
                    </view>
                </Camera>
                <Modal visible={this.state.visible} width="400" height="300" effect="fadeInUp" onClickAway={() => this.closeModal()}>
                    <div>
                        <h1 className="eliminated">Target Eliminated!</h1>
                        <a href="javascript:void(0);" onClick={() => this.closeModal()}>Close</a>
                    </div>
                </Modal>
                <a href="/"><button>Back</button></a>
                <img
                    style={this.style.captureImage}
                    ref={(img) => {
                        this.img = img;

                    }}
                />
            </div>
        );
    }
}

export default Verifycam;