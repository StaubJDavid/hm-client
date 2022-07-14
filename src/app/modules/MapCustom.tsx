import React, { FC, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import CreateContainer from './Container/CreateContainer';
import PageNavBar from '../common/Pagination/PageNavBar';
import UpcomingContainers from './Container/UpcomingContainers';
import PastContainers from './Container/PastContainers';
import InProgressContainers from './Container/InProgressContainers';
import { GoogleMap, useJsApiLoader,Autocomplete, LoadScript, DirectionsService,DirectionsRenderer} from '@react-google-maps/api';
import isEmpty from '../helpers/isEmpty';
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

type Props = {
};

const MapTest: FC<Props> = () => {
    const center = {
        lat: 47.497913,
        lng: 19.040236
      };

    const [origin,setOrigin] = useState("");
    const [destination,setDestination] = useState("");
    const [timer,setTimer] = useState<any>(null);

    const [travel,setTravel] = useState("DRIVING");
    const [response,setResponse] = useState();

    let count = 0;
    function directionsCallback (response:any,status:any) {
        //console.log(response)
    
        /*if()
        if (response !== null && status === "OK") {
            console.log('responseOk: ', response)
            setResponse(response);
        }*/
        if (response !== null && count < 1) {
            if (status === 'OK') {
                count += 1;
                setResponse(response);
            } else {
                count = 0;
                console.log('res: ', response);
            }
        }
      }

    function onChangeInput(){
        
        clearTimeout(timer);

        const newTimer = setTimeout(() => {
            setTimer(null);
        }, 500)
        
        setTimer(newTimer);
    }

    let ServiceContent = <></>
    if(destination !== '' && origin !== ''){
        ServiceContent = (
            <DirectionsService
                // required
                options={{
                    destination: destination,
                    origin: origin,
                    travelMode: TravelMode.DRIVING
                }}
                // required
                callback={(response:any,status:any) => directionsCallback(response,status)}

                // optional
                onLoad={directionsService => {
                    console.log('DirectionsService onLoad directionsService: ', directionsService)
                }}
                // optional
                onUnmount={directionsService => {
                    console.log('DirectionsService onUnmount directionsService: ', directionsService)
                }}
            />
        );
    }

    let RenderContent = <></>
    if(response !== null){
        RenderContent = (
            <DirectionsRenderer
                directions={response}
                // optional
                onLoad={directionsRenderer => {
                    console.log('DirectionsRenderer onLoad directionsRenderer: ', directionsRenderer)
                }}

                // optional
                onUnmount={directionsRenderer => {
                    console.log('DirectionsRenderer onUnmount directionsRenderer: ', directionsRenderer)
                }}
            />
        );
    }

    return (
        <div>
            {/*<div>
                <iframe
                    width="100%"
                    height="400px"
                    frameBorder={0}
                    style={{"border":0}}
                    referrerPolicy="no-referrer-when-downgrade"
                    src={`https://www.google.com/maps/embed/v1/${"directions"}?key=${"AIzaSyARRtkSAG99I9zFX49zYBttg7tKaGFJExs"}&origin=Herend+Hungary&destination=Veszprém+Hungary`}
                    allowFullScreen >
                </iframe>
            </div>*/}
            <p>Origin</p>
            <input type={"text"} onChange={(e:any) => {onChangeInput();setOrigin(e.target.value)}} value={origin} />
            <p>Destination</p>
            <input type={"text"} onChange={(e:any) => {onChangeInput();setDestination(e.target.value)}} value={destination} />
            <LoadScript 
                googleMapsApiKey="AIzaSyARRtkSAG99I9zFX49zYBttg7tKaGFJExs"
            >
                <GoogleMap
                    id={"DirectionMap"}
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={10}
                >
                    {ServiceContent}
                    {RenderContent}
                </GoogleMap>
            </LoadScript>
        </div>
    )
};

const mapStateToProps = (state:any)=>({
});

export default connect(mapStateToProps, {})(MapTest);