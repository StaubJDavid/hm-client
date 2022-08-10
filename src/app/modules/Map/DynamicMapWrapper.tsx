import React, { FC, useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import { Wrapper } from "@googlemaps/react-wrapper";
import DynamicMap from './DynamicMap';
import {setStartPoint, setEndPoint, setWaypoints, setDirectionResult, addWaypoints, changeWaypoint} from '../../actions/googleMapsActions';
import Autocomplete from './Autocomplete';
import AutocompleteWaypointGroup from './AutocompleteWaypointGroup';

type Props = {
    maps:any;
    setStartPoint:any;
    setEndPoint:any;
    setWaypoints:any;
    setDirectionResult:any;
    addWaypoints:any;
    changeWaypoint:any;
};

const DynamicMapWrapper: FC<Props> = ({maps, setStartPoint, setEndPoint, setWaypoints, setDirectionResult, addWaypoints, changeWaypoint}) => {
    const [apiKey,setApiKey] = useState(process.env.REACT_APP_GOOGLE_API_KEY!);

    const {waypoints} = maps;

    const [zoom, setZoom] = React.useState(10); // initial zoom
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
      lat: 47.491853377245285,
      lng: 19.042819149443883,
    });

    const [calculateRoute, doCalculateRoute] = useState(0);

    return (
        <div>
            <Wrapper apiKey={apiKey} libraries={["places"]}>
              <div className="container">
                  <div className="row mb-4">
                      <div className="col-md-8 text-center">
                        <DynamicMap
                          style={{height:"80vh", width:"100%", margin:"0", padding:"0"}}
                          center={center}
                          zoom={zoom}
                          onClick={() => {}}
                          calculateRouteInMap={calculateRoute}
                        >
                        </DynamicMap>
                      </div>
                      <div className="col-md-4 text-center">
                        <div className='ms-3'>
                          <Autocomplete id={"startPoint"} name={"Kezdőpont"} value={maps.startPoint} onChange={setStartPoint} />
                          <br/>
                          <AutocompleteWaypointGroup />
                          <Autocomplete id={"endPoint"} name={"Végpont"} value={maps.endPoint} onChange={setEndPoint} />
                          
                          <div className='text-center mt-2'>
                            <button className='btn btn-primary shadow' onClick={(e:any) => {e.preventDefault();doCalculateRoute(prev => prev + 1);}}>Útvonal tervezése</button> 
                          </div>
                        </div>
                      </div>
                  </div>
              </div>
            </Wrapper>
        </div>
    )
};

const mapStateToProps = (state:any)=>({
    maps: state.maps
});
//MapGuide
export default connect(mapStateToProps, {setStartPoint, setEndPoint, setWaypoints, setDirectionResult, addWaypoints, changeWaypoint})(DynamicMapWrapper);