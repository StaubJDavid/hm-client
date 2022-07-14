import React, {FC, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Autocomplete} from '@react-google-maps/api';
import AutocompleteCustom from './AutocompleteCustom';

type Props = {
    waypoints:any,
    waypointsName:any,
    setWaypoint:any,
    setWaypointName:any,
    addWaypointAfterIndex:any,
    delWaypointAtIndex:any
};

const ACGroup: FC<Props> = ({waypoints,waypointsName,setWaypoint,setWaypointName,addWaypointAfterIndex,delWaypointAtIndex}) => {

    return (<>{waypoints.map((value:any,index:any) => {
        return (
            <AutocompleteCustom
                key={"acthing"+index} 
                waypoints={waypoints}
                waypointsName={waypointsName}
                setWaypoint={setWaypoint}
                setWaypointName={setWaypointName}
                addWaypointAfterIndex={addWaypointAfterIndex}
                delWaypointAtIndex={delWaypointAtIndex}
                index={index}
            />
        )
    })}</>)
};

const mapStateToProps = (state:any)=>({
});

export default connect(mapStateToProps, {})(ACGroup);