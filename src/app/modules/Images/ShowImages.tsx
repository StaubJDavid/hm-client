import React, { Component, FC } from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import {} from '../../actions/containerActions';
import isEmpty from '../../helpers/isEmpty';
import Image from './Image';

type Props = {
    container:any
}

const ShowImages: FC<Props> = ({container}) => {

    const deleteImage = () => {

    }

    return (
        <div className="of-auto d-flex flex-wrap mb-4 show-image-size">
            {container.currentContainer.images.map((image:any,index:any) => {
                return (
                    <div className="mx-2">
                        <div
                            className="text-center mb-2 border border-2 border-dark rounded-3"
                        >
                            <Image imageData={{key: image.image_id, src: `http://localhost:3001/${image.container_id}/${image.file_name}`}} />
                        </div>
                        <div className="text-center mb-2">
                            <button
                                className="btn btn-primary"
                                onClick={() => deleteImage()}
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

const mapStateToProps = (state:any)=>({
    container: state.container
});

export default connect(mapStateToProps,{})(ShowImages);