import { FC} from 'react';
import {connect} from 'react-redux';
import {changeWaypoint} from '../../actions/googleMapsActions';
import AutocompleteWaypoint from './AutocompleteWaypoint';

type Props = {
    waypoints:any;
    changeWaypoint:any;
};

const AutocompleteWaypointGroup: FC<Props> = ({waypoints, changeWaypoint}) => {
    const changeWpName = (wp:string,index:number) => {
      changeWaypoint(wp,index);
    }

    return (
      <>
        {waypoints.map((wp:string,index:number) => {
          return (
            <>
              <AutocompleteWaypoint key={"wp"+index} id={"wp" + index} name={index+1 + ". Útipont"} index={index} value={waypoints[index].location} onChange={changeWpName} />
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
//OACGroup
export default connect(mapStateToProps, {changeWaypoint})(AutocompleteWaypointGroup);