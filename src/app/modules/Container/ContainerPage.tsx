import React, { FC, useEffect} from 'react';
import {connect} from 'react-redux';
import {getContainer} from '../../actions/containerActions';
import {clearMapsEverything} from '../../actions/googleMapsActions';
import { Wrapper } from "@googlemaps/react-wrapper";
import AddImagesButton from '../Images/AddImagesButton';
import ShowImages from '../Images/ShowImages';
import {useParams, useNavigate} from 'react-router-dom';
import isEmpty from '../../helpers/isEmpty';
import OwnMapStatic from '../OwnMapStatic';
import Comments from './Comments/Comments';

type Props = {
    errors:any;
    currentContainer:any;
    getContainer:any;
    clearMapsEverything:any;
};

const ContainerPage: FC<Props> = ({errors,currentContainer,getContainer,clearMapsEverything}) => {
    let { c_id } = useParams();
    const navigate = useNavigate();

    const [apiKey,setApiKey] = React.useState("AIzaSyARRtkSAG99I9zFX49zYBttg7tKaGFJExs");

    const [zoom, setZoom] = React.useState(10); // initial zoom
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
      lat: 47.491853377245285,
      lng: 19.042819149443883,
    });

    /*useEffect(() => {
        //console.log(c_id);
        console.log("xd");
        getContainer(c_id);
    },[]);*/

    useEffect(() => {
        console.log("xd2");
        clearMapsEverything();
        getContainer(c_id);
    },[c_id])

    useEffect(() => {
        //console.log(errors);
        if(errors){
            if(errors.log === "No such container"){
                navigate(`/`);
            }
        }
    },[errors])

    let content = <>sad</>;

    if(!isEmpty(currentContainer)){
        console.log(currentContainer);
        content = <>
            <div>Static Map</div>
            <div>Container id: {currentContainer.container_id}</div>
            <div>creator_id: {currentContainer.creator_id}</div>
            <div>role: {currentContainer.role}</div>
            <div>title: {currentContainer.title}</div>
            <div>message: {currentContainer.message}</div>
            <div>created: {currentContainer.created}</div>
            <div>time_start: {currentContainer.time_start}</div>
            <div>time_end: {currentContainer.time_end}</div>
            <div>name: {currentContainer.name}</div>
            {/*
            <Wrapper apiKey={apiKey} libraries={["places"]}>
                <OwnMapStatic
                    style={{height:"100vh", width:"100vw", margin:"0", padding:"0"}}
                    center={center}
                    zoom={zoom}
                    onZoom={setZoom}
                    startPoint={currentContainer.start_point}
                    endPoint={currentContainer.end_point}
                    waypoints={currentContainer.waypoints}
                />
    </Wrapper>*/}
            <AddImagesButton container_id={currentContainer.container_id} />
            <hr/>
            <ShowImages />
            <Comments container_id={currentContainer.container_id} />
        </>
    }
    
    return (
        <div>
            {content}
        </div>
    )
};

const mapStateToProps = (state:any)=>({
    currentContainer: state.container.currentContainer,
    errors: state.errors
});

export default connect(mapStateToProps, {getContainer,clearMapsEverything})(ContainerPage);