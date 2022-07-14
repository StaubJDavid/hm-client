import React, { FC, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import CreateContainer from './Container/CreateContainer';
import PageNavBar from '../common/Pagination/PageNavBar';
import UpcomingContainers from './Container/UpcomingContainers';
import PastContainers from './Container/PastContainers';
import InProgressContainers from './Container/InProgressContainers';
import { GoogleMap, useJsApiLoader,Autocomplete, LoadScript, DirectionsService,DirectionsRenderer} from '@react-google-maps/api';
import isEmpty from '../helpers/isEmpty';
import AutocompleteCustom from './AutocompleteCustom';
import ACGroup from './ACGroup';
const containerStyle = {
    width: '400px',
    height: '400px'
  };
  

//import {getContainers} from '../actions/containerActions';
//import UpcomingContainers from './Container/UpcomingContainers';
//import Containers from './Container/Containers';

enum TravelMode {
    /**
     * Specifies a bicycling directions request.
     */
    BICYCLING = 'BICYCLING',
    /**
     * Specifies a driving directions request.
     */
    DRIVING = 'DRIVING',
    /**
     * Specifies a transit directions request.
     */
    TRANSIT = 'TRANSIT',
    /**
     * Specifies a walking directions request.
     */
    WALKING = 'WALKING',
  }

declare type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[];
const googleLibraries:Libraries = ["places"];

type Props = {
};

const MapTest: FC<Props> = () => {
    const center = {
        lat: 47.497913,
        lng: 19.040236
      };

    const [origin,setOrigin] = useState("");
    const [waypointCount,setWaypointCount] = useState(2);
    const [waypoints,setWaypoints] = useState<any>([null,null]);
    const [waypointsName,setWaypointsName] = useState(["",""]);
    const [reRender,setReRender] = useState(false);
    //const [waypoints,setWaypoints] = useState(["",""]);

    const [destination,setDestination] = useState("");
    const [timer,setTimer] = useState<any>(null);

    const [travel,setTravel] = useState("DRIVING");
    const [response,setResponse] = useState<any>(null);
    const [gotResponse,setGotResponse] = useState<any>(false);

    const [autocomp,setAutocomp] = useState<any>(null);
    const [originPlace,setOriginPlace] = useState<any>(null);
    const [destinationPlace,setDestinationPlace] = useState<any>(null);
    const [originText,setOriginText] = useState("");
    const [destinationText,setDestinationText] = useState("");

    function directionsCallback (response:any,status:any) {
        //console.log(response)
    
        if (response !== null && status === "OK") {
            console.log('responseOk: ', response)
            setResponse(response);
            setGotResponse(true);
        }
      }

    /*function onChangeInput(){
        
        clearTimeout(timer);

        const newTimer = setTimeout(() => {
            setTimer(null);
        }, 500)
        
        setTimer(newTimer);
    }

    function onLoad(autocomplete:any) {
        console.log('autocomplete: ', autocomplete)
    
        setAutocomp(autocomplete);
    }
    
    function onOriginChanged () {
        if (originPlace !== null) {
            console.log(originPlace.getPlace())
            if(originPlace.getPlace() !== undefined){
                setOrigin(originPlace.getPlace().formatted_address);
                //console.log(originPlace.getPlace().formatted_address);
            }
            
        } else {
            console.log('Autocomplete is not loaded yet!')
        }
    }
    function onDestinationChanged () {
        if (destinationPlace !== null) {
            console.log(destinationPlace.getPlace())
            if(originPlace.getPlace() !== undefined){
                setDestination(destinationPlace.getPlace().formatted_address);
                //console.log(destinationPlace.getPlace().formatted_address);
            }

        } else {
            console.log('Autocomplete is not loaded yet!')
        }
    }*/

    function setWaypoint (index:any,value:any) {
        let copyArray = waypoints;
        copyArray[index] = value;
        setWaypoints(copyArray);
        console.log(copyArray);
    }

    function setWaypointName (index:any) {
        
        if (waypoints[index] !== null) {
            console.log(waypoints[index].getPlace())
            if(waypoints[index].getPlace() !== undefined){
                let copyArray = [...waypointsName];
                copyArray[index] = waypoints[index].getPlace().formatted_address;
                setWaypointsName(copyArray);
                console.log(copyArray);
                //setDestination(waypoints[index].getPlace().formatted_address);
                //console.log(destinationPlace.getPlace().formatted_address);
            }

        } else {
            console.log('Autocomplete is not loaded yet!')
        }
    }

    function addWaypointAfterIndex(index:any) {
        console.log(index);
        if(index < (waypoints.length-1)){
            setWaypointsName([
                ...waypointsName.slice(0, index+1),
                "",
                ...waypointsName.slice(index+1)
            ]);

            setWaypoints([
                ...waypoints.slice(0, index+1),
                null,
                ...waypoints.slice(index+1)
            ]);

            setReRender(true);
            setTimeout(() => setReRender(false),1);
        }

    }

    function delWaypointAtIndex(index:any) {
        if(index !== 0 && index !== (waypoints.length-1)){
            let wpCopy = [...waypoints];
            let wpnCopy = [...waypointsName];

            wpCopy.splice(index,1);
            wpnCopy.splice(index,1);

            setWaypoints(wpCopy);
            setWaypointsName(wpnCopy);

            setReRender(true);
            setTimeout(() => setReRender(false),1);
        }
    }

    return (
        <div>
            <p>
                Origin
                {origin}
            </p>

            {/*<input type={"text"} onChange={(e:any) => {onChangeInput();setOrigin(e.target.value)}} value={origin} />*/}
            <p>
                Destination
                {destination}
            </p>
            {/*<input type={"text"} onChange={(e:any) => {onChangeInput();setDestination(e.target.value)}} value={destination} />*/}
            {waypointsName.map((value:any,index:any) => {
                    if(isEmpty(value)){
                        return <p key={"wn" + index}>Nothing</p>
                    }else{
                        return <p key={"wn" + index}>{value}</p>
                    }
                })}

            <LoadScript 
                googleMapsApiKey="AIzaSyARRtkSAG99I9zFX49zYBttg7tKaGFJExs"
                libraries={googleLibraries}
            >
                {reRender?<></>:<ACGroup 
                    waypoints={waypoints}
                    waypointsName={waypointsName}
                    setWaypoint={setWaypoint}
                    setWaypointName={setWaypointName}
                    addWaypointAfterIndex={addWaypointAfterIndex}
                    delWaypointAtIndex={delWaypointAtIndex}
                />}
                

                    <button>Search</button>
                <GoogleMap
                    id={"DirectionMap"}
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                    {destination !== "" && origin !== "" && timer === null && gotResponse === true?<DirectionsService
                        // required
                        options={{
                            destination: response.getPlace().geocoded_waypoints[1],
                            origin: response.getPlace().geocoded_waypoints[0],
                            travelMode: TravelMode.DRIVING
                        }}
                        // required
                        callback={(response:any,status:any) => directionsCallback(response,status)}
                    />:<></>}

                    {response !== null?<DirectionsRenderer
                        directions={response}
                        // optional
                        onLoad={directionsRenderer => {
                            console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                        }}

                        // optional
                        onUnmount={directionsRenderer => {
                            console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                        }}
                    />:<></>}
                </GoogleMap>
            </LoadScript>
            {/*originPlace !== null?console.log(originPlace.getPlace()):console.log("originPlace null")*/}
            {/*destinationPlace !== null?console.log(destinationPlace.getPlace()):console.log("destinationPlace null")*/}
        </div>
    )
};

const mapStateToProps = (state:any)=>({
});

export default connect(mapStateToProps, {})(MapTest);