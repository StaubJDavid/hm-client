import React, { FC, useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {setMap, setDirectionService, setDirectionRenderer, setStartPoint, setEndPoint, setWaypoints, setDirectionResult, removeEmptyEntries} from '../actions/googleMapsActions';
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
    startPoint:any;
    endPoint:any;
    waypoints:any;
    onZoom:any;
    /*maps:any;
    setMap:any;
    setDirectionService:any;
    setDirectionRenderer:any;
    setStartPoint:any;
    setEndPoint:any;
    setWaypoints:any;
    setDirectionResult:any;
    removeEmptyEntries:any;*/
};

function useDeepCompareEffectForMaps(
    callback: React.EffectCallback,
    dependencies: any[]
  ) {
    React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
  }

const OwnMap: FC<Props> = ({style,
    onZoom,
    startPoint,
    endPoint,
    waypoints,
    ...options}) => {
    const ref = useRef<HTMLDivElement>(null);

    const [map, setMap] = useState<google.maps.Map>();

    //Directions Service
    const [ownDS, setOwnDS] = useState<google.maps.DirectionsService>(new google.maps.DirectionsService());

    //Directions Renderer
    const [ownDR, setOwnDR] = useState<google.maps.DirectionsRenderer>(new google.maps.DirectionsRenderer());

    function calcRoute(){
        ownDR.setMap(map!);

        //console.log(maps.waypoints);

        let request;
        if(waypoints.length === 0){
            request = {
                origin: startPoint,
                destination: endPoint,
                provideRouteAlternatives: true,
                travelMode: 'DRIVING'
            } as google.maps.DirectionsRequest

        }else{
            request = {
                origin: startPoint,
                waypoints: waypoints,
                destination: endPoint,
                provideRouteAlternatives: true,
                travelMode: 'DRIVING'
            } as google.maps.DirectionsRequest
        }
        
        console.log("called funct");
        if(startPoint !== "" && endPoint !== ""){
            ownDS.route(request, (result:any, status:any) => {
                if(status === 'OK'){
                    //console.log(result);
                    console.log("Im in???")
                    ownDR.setDirections(result);
                }
            })
        }
    }

    useEffect(() => {
        if (ref.current && !map) {
            console.log("what");

            setMap(new window.google.maps.Map(ref.current, {}));

            setOwnDS(new window.google.maps.DirectionsService());
            setOwnDR(new window.google.maps.DirectionsRenderer());
          }
    },[ref, map]);

    useEffect(() =>{
        if(map){
            calcRoute();
        }
    }, [map]);


    useDeepCompareEffectForMaps(() => {
        if(map){
            map.setOptions(options);
        }
    },[map, options]);

    return (
        <>
            <div style={style} ref={ref} id="map"></div>
        </>
    )
};

const mapStateToProps = (state:any)=>({
});

export default connect(mapStateToProps, {})(OwnMap);

//{height:"100vh", width:"100vw", margin:"0", padding:"0"}