import React, { Component } from 'react';
import Camera from 'react-camera';
import $ from "jquery";
import cloudinary from 'cloudinary';
import axios from 'axios';
import Modal from 'react-awesome-modal';
import './Verifycam.css';
// import { Link } from "react-router-dom";

cloudinary.config({
    cloud_name: 'notjarvis',
    api_key: '478844584369981',
    api_secret: 'vxEprjN0c5IMHkQHu_WUpz1b9hA'
});
class Verifycam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            visible1: false,
            visible2: false,
            visible3: false,
            currentGame: this.props.currentGame
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
            if(response.data == "Chad Rules"){
                that.openModal3(); 
            }
    
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

                            confidence>=.80 ? (that.openModal1(), that.runKillFunction()) : that.openModal2();
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