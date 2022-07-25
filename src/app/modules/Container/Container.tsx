import React, { FC, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {getContainer} from '../../actions/containerActions';
import AddImagesButton from '../Images/AddImagesButton';
import ShowImages from '../Images/ShowImages';
import timeFormat from '../../helpers/timeFormat';
import ContainerReactions from './ContainerReactions';
var classNames = require('classnames');
type Props = {
    container:any;
    index:any;
    disabled:any;
};

const Container: FC<Props> = ({container, index, disabled}) => {
    const navigate = useNavigate();
    const [onHover, setOnHover] = useState(false);

    let {container_id,creator_id,role,title,message,created,time_start,time_end, name} = container;
    function handleClick() {
        navigate(`/container/${container_id}`)
    }
    return (
        <div
            className={classNames("card", {"bg-light": onHover, "bg-white":!onHover})}
            onMouseEnter={() => setOnHover(true)}
            onMouseLeave={() => setOnHover(false)}
            onClick={() => handleClick()}
        >
            <div className="card-header">
                {title}
            </div>
            <div className={"card-body"} >
                <div className="container text-center">
                    <div className="row">
                        <div className="col">
                            <div>Létrehozta: {name}</div>
                            <div>Mikor kezdődik: {timeFormat(time_start)}</div>
                            <div>Tervezett végpont: {timeFormat(time_end)}</div>
                            <div>Kiírva: {timeFormat(created)}</div>
                            <div>{message}</div>
                        </div>
                        <div className="col">
                            Column
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-footer">
                <ContainerReactions container={container} index={index} disabled={disabled} />
            </div>

        </div>
    )
};

const mapStateToProps = (state:any)=>({
});

export default connect(mapStateToProps, {})(Container);