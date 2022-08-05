import React, { FC, useState, useEffect, useRef, Ref} from 'react';
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

declare type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[];
const googleLibraries:Libraries = ["places"];

interface Props extends google.maps.MapOptions{
    style: { [key: string]:string};
    onClick?: (e: google.maps.MapMouseEvent) => void;
    onIdle?: (map: google.maps.Map) => void;
    children?: React.ReactNode;
    maps:any;
    calculateRouteInMap:any;
    setMap:any;
    setDirectionService:any;
    setDirectionRenderer:any;
    setStartPoint:any;
    setEndPoint:any;
    setWaypoints:any;
    setDirectionResult:any;
    removeEmptyEntries:any;
};

function useDeepCompareEffectForMaps(
    callback: React.EffectCallback,
    dependencies: any[]
  ) {
    React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
  }

const OwnMap: FC<Props> = ({onClick,onIdle,children,style,maps,setMap,
    calculateRouteInMap,
    setDirectionService,
    setDirectionRenderer,
    setStartPoint,
    setEndPoint,
    setWaypoints,
    setDirectionResult,
    removeEmptyEntries,
    ...options}) => {
    const ref = useRef<HTMLDivElement>(null);

    const {map, ownDirectionService,ownDirectionRenderer} = maps;

    //const [map, setInMap] = useState<google.maps.Map>();

    /*const [start, setStart] = useState("Herend, Hungary");
    const [end, setEnd] = useState("Budapest, Hungary");*/

    //Directions Service
    const [ownDS, setOwnDS] = useState<google.maps.DirectionsService>(new google.maps.DirectionsService());

    //Directions Renderer
    const [ownDR, setOwnDR] = useState<google.maps.DirectionsRenderer>(new google.maps.DirectionsRenderer());
    
    //Directions Result
    const [ownDResult, setOwnDResult] = useState<google.maps.DirectionsResult>();

    //Directions Status
    const [ownDStatus, setOwnDStatus] = useState<google.maps.DirectionsStatus>();

    function calcRoute(){
        //ownDR.setMap(maps.map!);
        let clearedWaypoints = removeEmptyEntries();
        console.log(maps.waypoints);

        let request;
        if(clearedWaypoints.length === 0){
            request = {
                origin: maps.startPoint,
                destination: maps.endPoint,
                provideRouteAlternatives: true,
                travelMode: 'DRIVING'
            } as google.maps.DirectionsRequest

        }else{
            request = {
                origin: maps.startPoint,
                waypoints: clearedWaypoints,
                destination: maps.endPoint,
                provideRouteAlternatives: true,
                travelMode: 'DRIVING'
            } as google.maps.DirectionsRequest
        }

        console.log("called funct");
        console.log(maps.startPoint);
        console.log(maps.endPoint);

        

        if(maps.startPoint !== "" && maps.endPoint !== ""){
            console.log("Calculating route with api");
            //console.log(request);
            ownDirectionService.route(request, (result:any, status:any) => {
                if(status === 'OK'){
                    console.log(result);
                    ownDirectionRenderer.setDirections(result);
                }
            })
        }
    }

    useEffect(() => {
        if(calculateRouteInMap !== 0) calcRoute();
    }, [calculateRouteInMap])

    useEffect(() => {
        if (ref.current && !map) {
            console.log("what");
            //setInMap(new window.google.maps.Map(ref.current, {}));

            setMap(new window.google.maps.Map(ref.current, {}));

            /*setOwnDS(new window.google.maps.DirectionsService());
            setOwnDR(new window.google.maps.DirectionsRenderer());*/
            setDirectionService(new window.google.maps.DirectionsService());
            setDirectionRenderer(new window.google.maps.DirectionsRenderer());
            setEndPoint("");
            setStartPoint("");

            setOwnDResult(undefined);
            setOwnDStatus(undefined);
          }
    },[ref, map]);

    useEffect(() =>{
        if(map){
            ["click","idle"].forEach((eventName) => google.maps.event.clearListeners(map, eventName));

            /*if(onClick){
                map.addListener("click", onClick);
            }*/

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
            <div className='shadow' style={style} ref={ref} id="map"></div>
            {React.Children.map(children, (child) => {
                if(React.isValidElement(child)){
                    return React.cloneElement(child, {map});
                }
            })}
        </>
    )
};

const mapStateToProps = (state:any)=>({
    maps: state.maps
});

export default connect(mapStateToProps, {setMap,setDirectionService,setDirectionRenderer,setStartPoint,setEndPoint,setWaypoints,setDirectionResult,removeEmptyEntries})(OwnMap);

//{height:"100vh", width:"100vw", margin:"0", padding:"0"}