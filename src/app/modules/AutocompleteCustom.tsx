import React, {FC, useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {Autocomplete} from '@react-google-maps/api';

type Props = {
    waypoints:any,
    waypointsName:any,
    setWaypoint:any,
    setWaypointName:any,
    index:any,
    addWaypointAfterIndex:any,
    delWaypointAtIndex:any
};

const AutocompleteCustom: FC<Props> = ({waypoints,waypointsName,setWaypoint,setWaypointName,index,addWaypointAfterIndex,delWaypointAtIndex}) => {
    const [inputValue, setInputValue] = useState(waypointsName[index]);

    /*useEffect(() => {
        setInputValue("");
    },[waypoints])*/


    return (<>
        <Autocomplete
            key={"ac"+index}
            onLoad={(e:any) => setWaypoint(index,e)}
            onPlaceChanged={() => setWaypointName(index)}
            onUnmount={() => {setInputValue("")}}
        >
            <input
                key={"acinput"+index}
                type="text"
                defaultValue={inputValue}
                placeholder={index}
                /*style={{
                    boxSizing: `border-box`,
                    border: `1px solid transparent`,
                    width: `240px`,
                    height: `32px`,
                    padding: `0 12px`,
                    borderRadius: `3px`,
                    boxShadow: `0 2px 6px rgba(0, 0, 0, 0.3)`,
                    fontSize: `14px`,
                    outline: `none`,
                    textOverflow: `ellipses`,
                    position: "absolute",
                    left: "50%",
                    marginLeft: "-120px"
                }}*/
            />
        </Autocomplete>
        <p>XD: {waypointsName[index]}</p>
        <button onClick={() => addWaypointAfterIndex(index)}>Add {index}</button>
        <button onClick={() => delWaypointAtIndex(index)}>Delete {index}</button>
        <br />
        <br />
    </>
    )
};

const mapStateToProps = (state:any)=>({
});

export default connect(mapStateToProps, {})(AutocompleteCustom);