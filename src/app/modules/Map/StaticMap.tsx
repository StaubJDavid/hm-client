import React, { FC, useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {setDirectionService, setDirectionRenderer} from '../../actions/googleMapsActions';
import {clearContainer} from '../../actions/containerActions';
import {useDeepCompareMemoize} from 'use-deep-compare-effect';

interface Props extends google.maps.MapOptions{
    style: { [key: string]:string};
    startPoint:any;
    endPoint:any;
    waypoints:any;
    onZoom:any;
    setDirectionService:any;
    setDirectionRenderer:any;
    clearContainer:any;
};

function useDeepCompareEffectForMaps(
    callback: React.EffectCallback,
    dependencies: any[]
  ) {
    React.useEffect(callback, dependencies.map(useDeepCompareMemoize));
  }

const StaticMap: FC<Props> = ({style,
    onZoom,
    startPoint,
    endPoint,
    waypoints,
    setDirectionRenderer,
    setDirectionService,
    clearContainer,
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

        /*console.log(startPoint);
        console.log(endPoint);*/

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
        
        //console.log("called funct");
        if(startPoint !== "" && endPoint !== ""){
            ownDS.route(request, (result:any, status:any) => {
                if(status === 'OK'){
                    //console.log(result);
                    //console.log("Im in???")
                    //console.log(result);
                    ownDR.setDirections(result);
                }
            })
        }
    }

    useEffect(() => {
        if (ref.current && !map) {
            console.log("Static Map is Set");

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

    useEffect(() => {

        return () => {
            clearContainer();
            console.log("OwnMapStatic Kill");
        }
    },[]);


    useDeepCompareEffectForMaps(() => {
        if(map){
            map.setOptions(options);
        }
    },[map, options]);

    return (
        <>
            <div className='shadow' style={style} ref={ref} id="map"></div>
        </>
    )
};

const mapStateToProps = (state:any)=>({
});

export default connect(mapStateToProps, {setDirectionRenderer, setDirectionService, clearContainer})(StaticMap);