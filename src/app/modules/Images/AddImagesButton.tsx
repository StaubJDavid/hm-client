import React, { Component } from "react";
import {connect} from 'react-redux';
import {addImages, clearImages, deleteImage, uploadImages} from '../../actions/uploadActions';
import isEmpty from '../../helpers/isEmpty';
import ShowTempImages from './ShowTempImages';

type Props = {
    upload:any,
    container_id:any,
    addImages:any,
    clearImages:any,
    deleteImage:any,
    uploadImages:any
}

type State = {
}

class AddImagesButton extends Component<Props,State> {
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
        this.props.uploadImages(this.props.upload.images, this.props.container_id);
    }

    render () {
        return (
            <div>
                <form encType="multipart/form" className="text-center mb-4">
                    <br/>
                    <input 
                        type="file" 
                        name="files" 
                        id="files"
                        accept="image/png, image/jpg, image/jpeg" 
                        multiple={true}
                        placeholder="Upload your files" 
                        onChange={this.fileSelectedHandler}
                    />
                    <button 
                        className="btn btn-primary"
                        type="submit" 
                        onClick={this.fileUploadHandler}
                    >
                        Képek feltöltése
                    </button>
                </form>
                
                <div>
                    <ShowTempImages />
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
    upload: state.upload
});

export default connect(mapStateToProps,{addImages, clearImages, deleteImage, uploadImages})(AddImagesButton);