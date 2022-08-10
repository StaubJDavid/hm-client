import { FC, useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import {setStartPoint, setEndPoint, setWaypoints, setDirectionResult, addWaypoints} from '../../actions/googleMapsActions';

type Props = {
    id:any;
    name:any;
    onChange:any;
    value:any;
    maps:any;
    setStartPoint:any;
    setEndPoint:any;
    setWaypoints:any;
    setDirectionResult:any;
    addWaypoints:any;
};

const Autocomplete: FC<Props> = ({id, name, value, onChange, maps, setStartPoint, setEndPoint, setWaypoints, setDirectionResult,addWaypoints}) => {
  const [autocomplete, setAutocomplete] = useState<google.maps.places.Autocomplete>();
  const ref = useRef<HTMLInputElement>(null);
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

      autocomplete?.addListener("place_changed", fillInAddress)

  },[autocomplete]);

  function fillInAddress() {
    // Get the place details from the autocomplete object.
    const place = autocomplete!.getPlace();
    let address1;
    
    if("formatted_address" in place){
      address1 = place.formatted_address!;
    }else{
      address1 = place.name;
    }
    console.log(place);
  
    console.log(address1);

    setCompValue(address1);
    onChange(address1);
  }

  const addWaypointTest = () => {
    addWaypoints("",0).then(
      () => {
      }
    )
  }

    return (
      <>
        <div>
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
          {id==="startPoint"?
          <div className='text-center mt-2'>
            <button className='btn btn-primary shadow' onClick={(e:any) => {e.preventDefault(); addWaypointTest()}}>Útipont Hozzáadása</button>
          </div>
          :<></>}
        </div>
      </>
    )
};

const mapStateToProps = (state:any)=>({
    maps: state.maps
});
//OwnAutocomplete
export default connect(mapStateToProps, {setStartPoint, setEndPoint, setWaypoints, setDirectionResult,addWaypoints})(Autocomplete);