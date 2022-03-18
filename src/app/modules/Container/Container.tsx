import React, { FC, useEffect} from 'react';
import {connect} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {getContainer} from '../../actions/containerActions';
import AddImagesButton from '../Images/AddImagesButton';
import ShowImages from '../Images/ShowImages';
import timeFormat from '../../helpers/timeFormat';

type Props = {
    container:any
};

const Container: FC<Props> = ({container}) => {
    const navigate = useNavigate();

    let {container_id,creator_id,role,title,message,created,time_start,time_end} = container;
    function handleClick() {
        navigate(`/container/${container_id}`)
    }
    return (
        <div className="mb-5" onClick={handleClick}>
            <div>Container id: {container_id}</div>
            <div>creator_id: {creator_id}</div>
            <div>role: {role}</div>
            <div>title: {title}</div>
            <div>message: {message}</div>
            <div>created: {timeFormat(created)}</div>
            <div>time_start: {timeFormat(time_start)}</div>
            <div>time_end: {timeFormat(time_end)}</div>
        </div>
    )
};

const mapStateToProps = (state:any)=>({
});

export default connect(mapStateToProps, {})(Container);