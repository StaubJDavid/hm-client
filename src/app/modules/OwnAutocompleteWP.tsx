import React, { FC, useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import isEmpty from '../helpers/isEmpty';
import { Wrapper } from "@googlemaps/react-wrapper";
import OwnMap from './OwnMap';
import OwnMarker from './OwnMarker';
import {setStartPoint, setEndPoint, setWaypoints, setDirectionResult, addWaypoints,delWaypoint} from '../actions/googleMapsActions';

declare type Libraries = ("drawing" | "geometry" | "localContext" | "places" | "visualization")[];
const googleLibraries:Libraries = ["places"];

type Props = {
    id:any;
    waypoints:any;
    name:any;
    onChange:any;
    value:any;
    index:any;
    setStartPoint:any;
    setEndPoint:any;
    setWaypoints:any;
    setDirectionResult:any;
    addWaypoints:any;
    delWaypoint:any;
};

const OwnAutocompleteWP: FC<Props> = ({id, name, value, onChange, index, waypoints, setStartPoint, setEndPoint, setWaypoints, setDirectionResult, addWaypoints,delWaypoint}) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete>();
  let ref = useRef<HTMLInputElement>(null);
  const [compValue, setCompValue] = useState(value);

  const options:google.maps.places.AutocompleteOptions = {
    fields:["ALL"],
    strictBounds:false,
    componentRestrictions: { country: ["hu"] }
  };


  useEffect(() => {
      if(!autocomplete){
        setAutocomplete(new google.maps.places.Autocomplete(ref.current!, options));
      }

      setCompValue(value);

      autocomplete?.addListener("place_changed", fillInAddress);
  },[autocomplete]);

  function fillInAddress() {
    const place = autocomplete!.getPlace();
    let address1;
    
    if("formatted_address" in place){
      address1 = place.formatted_address!;
    }else{
      address1 = place.name;
    }
    /*console.log(place);
  
    console.log(address1);
    console.log("filladdress");*/
    setCompValue(address1);
    onChange(address1, index);
  }

    useEffect(() => {
      console.log("Value changed: " + value)
      setCompValue(value);
    }, [value])

    return (
      <>
        <div key={"wpoac"+id}>
          <label htmlFor={id}>{name}</label>
          <br/>
          <input
            ref={ref}
            type="text"
            id={id}
            name={id}
            value={compValue}
            onChange={(e) => setCompValue(e.target.value)}
          />
          <div className='text-center mt-2'>
            <button className='btn btn-primary shadow me-3' onClick={(e:any) => {e.preventDefault(); addWaypoints("",index+1)}}>Hozzáadás</button>
            <button className='btn btn-primary shadow'  onClick={(e:any) => {e.preventDefault(); delWaypoint(index);}}>Törlés</button>
          </div>
          </div>
      </>
    )
};

const mapStateToProps = (state:any)=>({
    waypoints: state.maps.waypoints
});

export default connect(mapStateToProps, {setStartPoint, setEndPoint, setWaypoints, setDirectionResult, addWaypoints,delWaypoint})(OwnAutocompleteWP);