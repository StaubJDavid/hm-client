import React, { Component } from "react";
import {connect} from 'react-redux';
import {addImages, clearImages, deleteImage, uploadImages} from '../../actions/uploadActions';
import isEmpty from '../../helpers/isEmpty';
import Image from './Image';
import 'bootstrap/js/dist/modal.js';

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
            <div className="of-auto-x d-flex flex-row mb-4">
                {this.props.upload.images.map((i:any,index:any) => {
                    return (
                        <div className="mx-2">
                            <div
                                className="text-center mb-2 border border-2 border-dark rounded-3"
                            >
                                <Image imageData={{key: i.index, src: URL.createObjectURL(i.file)}} />
                            </div>
                            <div className="text-center mb-2">
                                <button
                                    className="btn btn-primary"
                                    onClick={() => this.deleteImage(i.index)}
                                >
                                    Kép törlése
                                </button>
                            </div>
                        </div>
                    )
                })}
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
    upload: state.upload
});

export default connect(mapStateToProps,{clearImages, deleteImage})(ShowTempImages);