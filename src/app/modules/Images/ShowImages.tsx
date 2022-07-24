import React, { Component } from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import {} from '../../actions/containerActions';
import isEmpty from '../../helpers/isEmpty';

type Props = {
    container:any
}

type State = {
}

class ShowImages extends Component<Props,State> {
    render () {
        return (
            <div>
                {this.props.container.currentContainer.images.map((i:any) => {
                    return <>
                        <img key={i.image_id} src={`http://localhost:3001/${i.container_id}/${i.file_name}`} width='100' height='100' alt='waa'/>
                        <button>Delete Picture</button>
                    </>
                })}
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
    container: state.container
});

export default connect(mapStateToProps,{})(ShowImages);