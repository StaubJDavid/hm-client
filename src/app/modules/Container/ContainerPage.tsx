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
import TextArea from '../../common/TextArea';
import Spinner from '../../common/Spinner';
import ContainerReactions from './ContainerReactions'
import compareCurrentDate from '../../helpers/compareCurrentDate';

type Props = {
    auth:any;
    errors:any;
    currentContainer:any;
    getContainer:any;
    clearMapsEverything:any;
};

const ContainerPage: FC<Props> = ({auth,errors,currentContainer,getContainer,clearMapsEverything}) => {
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

    let content = <Spinner size={4}/>;

    if(!isEmpty(currentContainer)){
        console.log(currentContainer);
        content = <>
            <h2 className="fw-bold my-2 text-center">{currentContainer.title}</h2>
            <div className="container-fluid">
                <div className="row mb-4">
                    <div className="col-md-3 text-center">
                        <div className={"fw-bold"}>Létrehozta</div>
                        <div>{currentContainer.name}</div>
                    </div>
                    <div className="col-md-3 text-center">
                        <div className={"fw-bold"}>Mikor Kezdődik</div>
                        <div>{currentContainer.time_start}</div>
                    </div>
                    <div className="col-md-3 text-center">
                        <div className={"fw-bold"}>Tervezett végpont</div>
                        <div>{currentContainer.time_end}</div>
                    </div>
                    <div className="col-md-3 text-center">
                        <div className={"fw-bold"}>Kiírva</div>
                        <div>{currentContainer.created}</div>
                    </div>
                </div>
            </div>
            <div className='mb-3'>
                <ContainerReactions
                    container={currentContainer}
                    index={0}
                    disabled={!compareCurrentDate(currentContainer.time_start)}
                    containerPage={true}
                />
            </div>
            <TextArea
                name="message" 
                maxlength={16384}
                value={currentContainer.message}
                error={false} 
                onChange={() => {}}  
                placeholder="Terv, tudnivalók stb..."
                classNamesInherited={"mb-4 text-area-no-resize description"}
            />
            
            <Wrapper apiKey={apiKey} libraries={["places"]}>
                <OwnMapStatic
                    style={{height:"75vh", width:"100%", margin:"0", padding:"0"}}
                    center={center}
                    zoom={zoom}
                    onZoom={setZoom}
                    startPoint={currentContainer.start_point}
                    endPoint={currentContainer.end_point}
                    waypoints={currentContainer.waypoints}
                />
            </Wrapper>
            <div>
                {auth.isAuthenticated?<AddImagesButton container_id={currentContainer.container_id} />:<></>}
            </div>
            <div className='mb-2 border-bottom'>
                {auth.isAuthenticated?<ShowImages />:<></>}
            </div>
            <div className='mt-2'>
                <Comments container_id={currentContainer.container_id} />
            </div>
        </>
    }
    
    return (
        <div className='container bg-white middle of-auto px-5'>
            {content}
        </div>
    )
};

const mapStateToProps = (state:any)=>({
    currentContainer: state.container.currentContainer,
    errors: state.errors,
    auth: state.auth,
});

export default connect(mapStateToProps, {getContainer,clearMapsEverything})(ContainerPage);