import React from "react";
import {backendURL} from "../constants";
import Session from "../session/Session";

class ProfilePicture extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: null,
            image: null,
            drag: false
        };
        this.componentDidMount.bind(this);
        this.componentWillUnmount.bind(this);
        this.sendImage.bind(this)
    }

    dropRef = React.createRef();

    handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({drag: true})
    };

    handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };


    handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({drag: false})
    };

    handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({drag: false});
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.sendImage(e.dataTransfer);
        }
    };

    componentDidMount() {
        let div = this.dropRef.current;
        if (div == null) return;
        div.addEventListener('dragenter', this.handleDragIn);
        div.addEventListener('dragleave', this.handleDragOut);
        div.addEventListener('dragover', this.handleDrag);
        div.addEventListener('drop', this.handleDrop)
    }

    componentWillUnmount() {
        let div = this.dropRef.current;
        if (div == null) return;
        div.removeEventListener('dragenter', this.handleDragIn);
        div.removeEventListener('dragleave', this.handleDragOut);
        div.removeEventListener('dragover', this.handleDrag);
        div.removeEventListener('drop', this.handleDrop)
    }

    render() {
        let name = this.state.name;
        let image = this.state.image;
        if (Session.getUserId() == this.props.searchedUserId) {
            return (
                <div className={"profilePictureContainer"} ref={this.dropRef} >
                    <div className={this.state.drag === true ? "dragging" : "notDragging"}>
                        <img alt="" className={"imageBox"} src={image == null ? "data:image/png;base64," + this.props.image: image}/><br/>
                        <label className={"fileLabel"} htmlFor="upload-photo">{name == null ? "Select Image" : name}</label>
                        <input className={"fileInput"} type={"file"} id={"upload-photo"} onChange={e => {
                            if (e.target.files.length > 0) {
                                this.sendImage(e.target);
                            }
                        }}/>
                    </div>
                </div>
            );
        } else {
            return (
                <div className={"profilePictureContainer"}>
                    <div className={"notDragging"}>
                        <img alt="" className={"imageBox"} src={image == null ? "data:image/png;base64," + this.props.image: image}/><br/>
                        <label className={"fileLabel"}>{this.props.username}</label>
                    </div>
                </div>
            );
        }

    }

    sendImage(e) {
        this.setState({
            name: e.files[0].name,
            image: URL.createObjectURL(e.files[0])
        });
        let file = e.files[0];
        let data = new FormData();
        data.append("file", file);
        console.log("sending file", file);
        fetch(backendURL + '/user/user-image/' + Session.getUserId(),{
            method: 'POST',
            body: data
        }).then(response => response.json()).then(json => {
            console.log(json);
        }).catch(e => {
            console.log(e);
        })
    }
}

export default ProfilePicture;