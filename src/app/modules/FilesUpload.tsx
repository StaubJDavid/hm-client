import React, { Component } from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import {addImages, clearImages, deleteImage, uploadImages} from '../actions/uploadActions';
import isEmpty from '../helpers/isEmpty';

type Props = {
    upload:any,
    addImages:any,
    clearImages:any,
    deleteImage:any,
    uploadImages:any
}

type State = {
}

class FilesUpload extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {
        }
        this.onChange = this.onChange.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
    }

    componentDidMount(){
        this.props.clearImages();
    }

    onChange(e:any){
        this.setState({[String(e.target.name)]: String(e.target.value)} as any);
    }
    
    fileSelectedHandler = (e:any) => {
        console.log(e.target.files);
        this.props.addImages(e.target.files, this.props.upload.images.length);
    }

    deleteImage = (e:any) => {
        console.log(e);
        this.props.deleteImage(e, this.props.upload.images);
    }
    
    fileUploadHandler = (event:any) => {
        event.preventDefault();        
        this.props.uploadImages(this.props.upload.images, "512657f5-2d95-41b5-aacc-564dfe934e3e");
    }

    render () {
        return (
            <div>
                <form encType="multipart/form">
                    <br/>
                    <input 
                        type="file" 
                        name="files" 
                        id="files" 
                        multiple={true}
                        placeholder="Upload your files" 
                        onChange={this.fileSelectedHandler}
                    />
                    <br/>
                    <button 
                        type="submit" 
                        onClick={this.fileUploadHandler}
                    >Add Products</button>
                </form>
                
                <div>
                    {this.props.upload.images.map((i:any) => {
                        return <><img key={i.index} src={URL.createObjectURL(i.file)} width='100' height='100' alt='waa'/><button onClick={() => this.deleteImage(i.index)}>Delete</button></>
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
    upload: state.upload
});

export default connect(mapStateToProps,{addImages, clearImages, deleteImage, uploadImages})(FilesUpload);