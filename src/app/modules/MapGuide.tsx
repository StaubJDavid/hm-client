import React, { FC, useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import isEmpty from '../helpers/isEmpty';
import { Wrapper } from "@googlemaps/react-wrapper";
import OwnMap from './OwnMap';
import OwnMarker from './OwnMarker';
import {setStartPoint, setEndPoint, setWaypoints, setDirectionResult, addWaypoints, changeWaypoint} from '../actions/googleMapsActions';
import OwnAutocomplete from './OwnAutocomplete';
import OwnAutocompleteWP from './OwnAutocompleteWP';
import OACGroup from './OACGroup';

declare type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[];
const googleLibraries:Libraries = ["places"];

type Props = {
    maps:any;
    setStartPoint:any;
    setEndPoint:any;
    setWaypoints:any;
    setDirectionResult:any;
    addWaypoints:any;
    changeWaypoint:any;
};

const MapGuide: FC<Props> = ({maps, setStartPoint, setEndPoint, setWaypoints, setDirectionResult, addWaypoints, changeWaypoint}) => {
    const [apiKey,setApiKey] = useState("AIzaSyARRtkSAG99I9zFX49zYBttg7tKaGFJExs");
    const [clicks, setClicks] = React.useState<google.maps.LatLng[]>([]);

    const {waypoints} = maps;

    const [zoom, setZoom] = React.useState(10); // initial zoom
    const [center, setCenter] = React.useState<google.maps.LatLngLiteral>({
      lat: 47.491853377245285,
      lng: 19.042819149443883,
    });


    const onClick = (e: google.maps.MapMouseEvent) => {
        // avoid directly mutating state
        setClicks([...clicks, e.latLng!]);
    };

    const [num, setNum] = React.useState(0);

    const addWaypointTest = () => {
      console.log(maps.waypoints);
      addWaypoints("",num).then(
        () => {
          setNum(num + 1);
          console.log(maps.waypoints);
        }
      )
    }

    const form = (
        <div
          style={{
            padding: "1rem",
            flexBasis: "250px",
            height: "100%",
            overflow: "auto",
          }}
        >
          <label htmlFor="zoom">Zoom</label>
          <input
            type="number"
            id="zoom"
            name="zoom"
            value={zoom}
            onChange={(event) => setZoom(Number(event.target.value))}
          />
          <br />
          <label htmlFor="lat">Latitude</label>
          <input
            type="number"
            id="lat"
            name="lat"
            value={center.lat}
            onChange={(event) =>
              setCenter({ ...center, lat: Number(event.target.value) })
            }
          />
          <br />
          <label htmlFor="lng">Longitude</label>
          <input
            type="number"
            id="lng"
            name="lng"
            value={center.lng}
            onChange={(event) =>
              setCenter({ ...center, lng: Number(event.target.value) })
            }
          />

          <br />
          <label htmlFor="start">Start</label>
          <input
            type="number"
            id="lng"
            name="lng"
            value={center.lng}
            onChange={(event) =>
              setCenter({ ...center, lng: Number(event.target.value) })
            }
          />

          <br />
          <label htmlFor="end">End</label>
          <input
            type="number"
            id="lng"
            name="lng"
            value={center.lng}
            onChange={(event) =>
              setCenter({ ...center, lng: Number(event.target.value) })
            }
          />

          <h3>{clicks.length === 0 ? "Click on map to add markers" : "Clicks"}</h3>
          {clicks.map((latLng, i) => (
            <pre key={i}>{JSON.stringify(latLng.toJSON(), null, 2)}</pre>
          ))}
          <button onClick={() => setClicks([])}>Clear</button>
          <button onClick={() => addWaypointTest()}>Click</button>
          <button onClick={() => console.log(waypoints)}>Log</button>
        </div>
      );

    /*const handleCalcClick = () => {
      calculateRoute.current();
    }*/
    const [calculateRoute, doCalculateRoute] = useState(0);

    return (
        <div>
            <Wrapper apiKey={apiKey} libraries={["places"]}>
              <div className="container">
                  <div className="row mb-4">
                      <div className="col-md-8 text-center">
                        <OwnMap
                          style={{height:"80vh", width:"100%", margin:"0", padding:"0"}}
                          center={center}
                          zoom={zoom}
                          onClick={onClick}
                          calculateRouteInMap={calculateRoute}
                        >
                          {clicks.map((latLng, i) => (
                              <OwnMarker key={i} position={latLng} />
                          ))}
                        </OwnMap>
                      </div>
                      <div className="col-md-4 text-center">
                        <div className='ms-3'>
                          <OwnAutocomplete id={"startPoint"} name={"Kezdőpont"} value={maps.startPoint} onChange={setStartPoint} />
                          <br/>
                          <OACGroup />
                          <OwnAutocomplete id={"endPoint"} name={"Végpont"} value={maps.endPoint} onChange={setEndPoint} />
                          
                          <div className='text-center mt-2'>
                            <button className='btn btn-primary shadow' onClick={(e:any) => {e.preventDefault();doCalculateRoute(prev => prev + 1);}}>Útvonal tervezése</button> 
                          </div>
                        </div>
                      </div>
                  </div>
              </div>
            </Wrapper>
            {/*form*/}
        </div>
    )
};

const mapStateToProps = (state:any)=>({
    maps: state.maps
});

export default connect(mapStateToProps, {setStartPoint, setEndPoint, setWaypoints, setDirectionResult, addWaypoints, changeWaypoint})(MapGuide);