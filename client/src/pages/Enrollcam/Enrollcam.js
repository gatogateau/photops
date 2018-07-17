import React, { Component } from 'react';
import Camera from 'react-camera';
import $ from "jquery";
import cloudinary from 'cloudinary';
import axios from 'axios';

cloudinary.config({
    cloud_name: 'notjarvis',
    api_key: '478844584369981',
    api_secret: 'vxEprjN0c5IMHkQHu_WUpz1b9hA'
});

class Enrollcam extends Component {

    constructor(props) {
        super(props);
        this.takePicture = this.takePicture.bind(this);
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
                        console.log(typeof(result.secure_url));
                        axios.put('/api/users/capturePic', {
                            capturePic: result.secure_url
                          })
                          .then(function (response) {
                            console.log(response);
                          })
                          .catch(function (error) {
                            console.log(error);
                          });
                        let payload = { "image": result.url, "subject_id": that.props.username, "gallery_name": "players" };
                        let headers = {
                            "Content-type": "application/json",
                            "app_id": "3152266b",
                            "app_key": "702449259a83518d27467f43d20715d4"
                        };
                        $.ajax("http://api.kairos.com/enroll", {
                            headers: headers,
                            type: "POST",
                            data: JSON.stringify(payload),
                            dataType: "text"
                        }).done(function (response) {
                            console.log(response);
                            console.log(that);
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

export default Enrollcam;