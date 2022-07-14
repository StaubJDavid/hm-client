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

import {useDeepCompareEffectNoCheck} from 'use-deep-compare-effect';

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
    options: google.maps.MarkerOptions;
};

const OwnMarker: FC<google.maps.MarkerOptions> = (options) => {
    const [marker, setMarker] = useState<google.maps.Marker>();

    useEffect(() => {
        if(!marker){
            setMarker(new google.maps.Marker());
        }

        return () => {
            if(marker){
                marker.setMap(null);
            }
        }
    },[marker]);

    useEffect(() => {
        if(marker){
            marker.setOptions(options);
        }
    },[marker, options]);

    return (
        null
    )
};

const mapStateToProps = (state:any)=>({
});

export default connect(mapStateToProps, {})(OwnMarker);