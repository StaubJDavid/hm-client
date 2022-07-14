import React, { FC, useState, useEffect, useRef} from 'react';
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
import { Wrapper } from "@googlemaps/react-wrapper";

import {useDeepCompareMemoize} from 'use-deep-compare-effect';

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

interface Props extends google.maps.MapOptions{
    style: { [key: string]:string};
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onIdle?: (map: google.maps.Map) => void;
    children?: React.ReactNode;
};

function useDeepCompareEffectForMaps(
    callback: React.EffectCallback,
    dependencies: any[]
  ) {
    React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
  }

const OwnMap: FC<Props> = ({onClick,onIdle,children,style,...options}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();

    const [start, setStart] = useState("Herend, Hungary");
    const [end, setEnd] = useState("Budapest, Hungary");

    //Directions Service
    const [ownDS, setOwnDS] = useState<google.maps.DirectionsService>(new google.maps.DirectionsService());

    //Directions Renderer
    const [ownDR, setOwnDR] = useState<google.maps.DirectionsRenderer>(new google.maps.DirectionsRenderer());
    
    //Directions Result
    const [ownDResult, setOwnDResult] = useState<google.maps.DirectionsResult>();

    //Directions Status
    const [ownDStatus, setOwnDStatus] = useState<google.maps.DirectionsStatus>();

    function calcRoute(){
        var request = {
            origin: start,
            destination: end,
            travelMode: 'DRIVING'
        } as google.maps.DirectionsRequest
        console.log("called funct");
        ownDS.route(request, (result, status) => {
            if(status === 'OK'){
                console.log(result);
                ownDR.setDirections(result);
            }
        })
    }

    useEffect(() => {
        if (ref.current && !map) {
            console.log("what");
            setMap(new window.google.maps.Map(ref.current, {}));

            setOwnDS(new window.google.maps.DirectionsService());
            setOwnDR(new window.google.maps.DirectionsRenderer());
            ownDR.setMap(map!);

            setOwnDResult(undefined);
            setOwnDStatus(undefined);
            calcRoute();
          }
    },[ref, map]);

    useEffect(() =>{
        if(map){
            ["click","idle"].forEach((eventName) => google.maps.event.clearListeners(map, eventName));

            if(onClick){
                map.addListener("click", onClick);
            }

            if(onIdle){
                map.addListener("idle", () => onIdle(map));
            }
        }
    }, [map, onClick, onIdle]);

    useDeepCompareEffectForMaps(() => {
        if(map){
            map.setOptions(options);
        }
    },[map, options]);

    return (
        <>
            <div style={style} ref={ref} id="map"></div>
            {React.Children.map(children, (child) => {
                if(React.isValidElement(child)){
                    return React.cloneElement(child, {map});
                }
            })}
        </>
    )
};

const mapStateToProps = (state:any)=>({
});

export default connect(mapStateToProps, {})(OwnMap);

//{height:"100vh", width:"100vw", margin:"0", padding:"0"}