import React, { Component } from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import {addImages, clearImages, deleteImage, uploadImages} from '../../actions/uploadActions';
import isEmpty from '../../helpers/isEmpty';

type Props = {
    upload:any,
    clearImages:any,
    deleteImage:any
}

type State = {
}

class ShowTempImages extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.deleteImage = this.deleteImage.bind(this);
    }

    deleteImage = (e:any) => {
        this.props.deleteImage(e, this.props.upload.images);
    }

    componentDidMount(){
        this.props.clearImages();
    }

    render () {
        return (
            <div>
                {this.props.upload.images.map((i:any) => {
                    return <><img key={i.index} src={URL.createObjectURL(i.file)} width='100' height='100' alt='waa'/><button onClick={() => this.deleteImage(i.index)}>Delete</button></>
                })}
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
    upload: state.upload
});

export default connect(mapStateToProps,{clearImages, deleteImage})(ShowTempImages);