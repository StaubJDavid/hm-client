import React, { FC, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Wrapper } from "@googlemaps/react-wrapper";
import OwnMapStatic from '../OwnMapStatic';
import {getContainer} from '../../actions/containerActions';
import AddImagesButton from '../Images/AddImagesButton';
import ShowImages from '../Images/ShowImages';
import timeFormat from '../../helpers/timeFormat';
import trimString from '../../helpers/trimString';
import ContainerReactions from './ContainerReactions';
import TextArea from '../../common/TextArea';
var classNames = require('classnames');
type Props = {
    container:any;
    index:any;
    disabled:any;
};

const Container: FC<Props> = ({container, index, disabled}) => {
    const navigate = useNavigate();
    const [onHover, setOnHover] = useState(false);
    const [apiKey,setApiKey] = React.useState("AIzaSyARRtkSAG99I9zFX49zYBttg7tKaGFJExs");
    const [zoom, setZoom] = React.useState(10); // initial zoom
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
      lat: 47.491853377245285,
      lng: 19.042819149443883,
    });

    let {container_id,creator_id,role,title,message,created,time_start,time_end, name} = container;
    function handleClick() {
        navigate(`/container/${container_id}`)
    }
    return (
        <div
            className={classNames("card mb-4", {"bg-light pointer-cursor": onHover, "bg-white":!onHover})}
        >
            <div
                onMouseEnter={() => setOnHover(true)}
                onMouseLeave={() => setOnHover(false)}
            >
            <div className="card-header fw-bold fs-5" onClick={() => handleClick()} >
                {title}
            </div>
            <div className={"card-body"} >
                <div className="container text-center">
                    <div className="row">
                        <div className="col" onClick={() => handleClick()} >
                            <div className="container-fluid">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="row mb-1 pb-2 border-bottom">
                                            <div className="col-md-6 px-1">
                                                <div className={"fw-bold"}>Létrehozta</div>
                                                <div>{name}</div>
                                            </div>
                                            <div className="col-md-6 px-1">
                                                <div className={"fw-bold"}>Mikor Kezdődik</div>
                                                <div>{timeFormat(time_start)}</div>
                                            </div>
                                        </div>
                                        <div className="row mb-2">
                                            <div className="col-md-6 px-1">
                                                <div className={"fw-bold"}>Tervezett végpont</div>
                                                <div>{timeFormat(time_end)}</div>
                                            </div>
                                            <div className="col-md-6 px-1">
                                                <div className={"fw-bold"}>Kiírva</div>
                                                <div>{timeFormat(created)}</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <TextArea
                                            name="message" 
                                            maxlength={16384}
                                            value={message}
                                            error={false} 
                                            onChange={() => {}}  
                                            placeholder="Terv, tudnivalók stb..."
                                            classNamesInherited={"mb-4 text-area-no-resize pointer-cursor"}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col" onClick={() => {}}>
                            <Wrapper apiKey={apiKey} libraries={["places"]}>
                                <OwnMapStatic
                                    style={{height:"100%", width:"100%", margin:"0", padding:"0"}}
                                    center={center}
                                    zoom={zoom}
                                    onZoom={setZoom}
                                    startPoint={container.start_point}
                                    endPoint={container.end_point}
                                    waypoints={container.waypoints}
                                />
                            </Wrapper>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <div className="card-footer">
                <ContainerReactions
                    container={container}
                    index={index}
                    disabled={disabled}
                    containerPage={false}
                />
            </div>

        </div>
    )
};

const mapStateToProps = (state:any)=>({
});

export default connect(mapStateToProps, {})(Container);