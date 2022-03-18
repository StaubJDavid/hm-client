import React, { FC, useEffect} from 'react';
import {connect} from 'react-redux';
import {getContainer} from '../../actions/containerActions';
import AddImagesButton from '../Images/AddImagesButton';
import ShowImages from '../Images/ShowImages';
import {useParams} from 'react-router-dom';
import isEmpty from '../../helpers/isEmpty';

type Props = {
    currentContainer:any,
    getContainer:any
};

const ContainerPage: FC<Props> = ({currentContainer,getContainer}) => {
    let { c_id } = useParams();

    useEffect(() => {
        console.log(c_id);
        getContainer(c_id);
    },[]);

    useEffect(() => {
        getContainer(c_id);
    },[c_id])

    let content = <>sad</>;

    if(!isEmpty(currentContainer)){
        content = <>
            <div>Container id: {currentContainer.container_id}</div>
            <div>creator_id: {currentContainer.creator_id}</div>
            <div>role: {currentContainer.role}</div>
            <div>title: {currentContainer.title}</div>
            <div>message: {currentContainer.message}</div>
            <div>created: {currentContainer.created}</div>
            <div>time_start: {currentContainer.time_start}</div>
            <div>time_end: {currentContainer.time_end}</div>
            <div>name: {currentContainer.name}</div>
            <AddImagesButton container_id={currentContainer.container_id} />
            <hr/>
            <ShowImages />
        </>
    }
    
    return (
        <div>
            {content}
        </div>
    )
};

const mapStateToProps = (state:any)=>({
    currentContainer: state.container.currentContainer
});

export default connect(mapStateToProps, {getContainer})(ContainerPage);