import React, { FC, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import isEmpty from '../helpers/isEmpty';
import { Wrapper } from "@googlemaps/react-wrapper";
import OwnMap from './OwnMap';
import OwnMarker from './OwnMarker';
import {setStartPoint, setEndPoint, setWaypoints, setDirectionResult, addWaypoints, changeWaypoint} from '../actions/googleMapsActions';
import OwnAutocomplete from './OwnAutocomplete';
import OwnAutocompleteWP from './OwnAutocompleteWP';

declare type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[];
const googleLibraries:Libraries = ["places"];

type Props = {
    waypoints:any;
    changeWaypoint:any;
};

const OACGroup: FC<Props> = ({waypoints, changeWaypoint}) => {
    const changeWpName = (wp:string,index:number) => {
      changeWaypoint(wp,index);
    }

    return (
      <>
        {waypoints.map((wp:string,index:number) => {
          return (
            <>
              <OwnAutocompleteWP key={"wp"+index} id={"wp" + index} name={index+1 + ". Útipont"} index={index} value={waypoints[index].location} onChange={changeWpName} />
              <br/>
            </>
          )
        })}
      </>
    )
};

const mapStateToProps = (state:any)=>({
  waypoints: state.maps.waypoints
});

export default connect(mapStateToProps, {changeWaypoint})(OACGroup);