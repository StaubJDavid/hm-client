import React, { FC, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import CreateContainer from './Container/CreateContainer';
import PageNavBar from '../common/Pagination/PageNavBar';
import UpcomingContainers from './Container/UpcomingContainers';
import PastContainers from './Container/PastContainers';
import InProgressContainers from './Container/InProgressContainers';
//import {getContainers} from '../actions/containerActions';
import isEmpty from '../helpers/isEmpty';
//import UpcomingContainers from './Container/UpcomingContainers';
//import Containers from './Container/Containers';

type Props = {
    auth:any,
};

const MainPage: FC<Props> = ({auth}) => {
    const [tourContainers, setTourContainers] = useState(<></>);

    useEffect(() => {
        setTourContainers(<UpcomingContainers />);
    },[])

    return (
        <div>
            {auth.isAuthenticated?<CreateContainer />:<></>}
            Authenticated: {String(auth.isAuthenticated)}
            {auth.isAuthenticated?<>
                <button onClick={() => setTourContainers(<UpcomingContainers />)}>Upcoming Tours</button>
                <button onClick={() => setTourContainers(<InProgressContainers />)}>In Progress Tours</button>
                <button onClick={() => setTourContainers(<PastContainers />)}>Past Tours</button>
            </>:<></>}
            <br />
            {tourContainers}
            {/*!isEmpty(containers)?<Containers />:<></>*/}
            {/*!isEmpty(containers)?<PageNavBar passedFc={handleSearch} currentPage={currentPage} maxPage={Math.trunc(containers.total/containers.limit) + 1} />:<></>*/}
        </div>
    )
};

const mapStateToProps = (state:any)=>({
    auth: state.auth
});

export default connect(mapStateToProps, {})(MainPage);