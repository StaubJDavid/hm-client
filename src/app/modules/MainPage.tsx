import React, { FC, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CreateContainer from './Container/CreateContainer';
import PageNavBar from '../common/Pagination/PageNavBar';
import UpcomingContainers from './Container/UpcomingContainers';
import PastContainers from './Container/PastContainers';
import InProgressContainers from './Container/InProgressContainers';
import isEmpty from '../helpers/isEmpty';
import MapTest from './MapTest';
import calculateMaxPage from '../helpers/calculateMaxPage';


var classNames = require('classnames');

type Props = {
    auth:any,
};

const MainPage: FC<Props> = ({auth}) => {
    const [tourContainers, setTourContainers] = useState(<></>);
    const navigate = useNavigate();
    const [currentContainerSelection, setCurrentContainerSelection] = useState("");

    useEffect(() => {
        setTourContainers(<UpcomingContainers />);
        setCurrentContainerSelection("upcoming")
    },[])
//"d-flex pt-4 justify-content-center border-bottom pb-4 border-dark border-3"
// style={{height: "calc(100% - 65px)"}}
    return (

        <div className={"container bg-white"} style={{height: "calc(100vh - 56px)"}}>
            <div className={"d-flex justify-content-center border-bottom border-dark border-3 py-3"}>
                <div className="container text-center">
                    <div className="row">
                        <div className="col">
                            <button
                                className={classNames("btn mx-2",{"btn-primary":currentContainerSelection === "upcoming", "btn-secondary":currentContainerSelection !== "upcoming"})}
                                onClick={() => {setTourContainers(<UpcomingContainers />); setCurrentContainerSelection("upcoming")} } 
                            >
                                Következő túrák
                            </button>
                        </div>
                        <div className="col">
                            <button
                                className={classNames("btn mx-2",{"btn-primary":currentContainerSelection === "inprogress", "btn-secondary":currentContainerSelection !== "inprogress"})}
                                onClick={() => {setTourContainers(<InProgressContainers />); setCurrentContainerSelection("inprogress")} } 
                            >
                                Folyamatban lévő túrák
                            </button>
                        </div>
                        <div className="col">
                            <button
                                className={classNames("btn mx-2",{"btn-primary":currentContainerSelection === "past", "btn-secondary":currentContainerSelection !== "past"})}
                                onClick={() => {setTourContainers(<PastContainers />); setCurrentContainerSelection("past") }} 
                            >
                                Régi túrák
                            </button>
                        </div>
                        {auth.isAuthenticated?<div className="col">
                            <button className='btn btn-success' onClick={() => navigate(`/createcontainer`)}>Túra kiírása</button>
                        </div>:<></>}
                    </div>
                </div>
            </div>
            <div className='pt-4 box-my remaining'>
                {tourContainers}
            </div>
        </div>
    )
};

const mapStateToProps = (state:any)=>({
    auth: state.auth
});

export default connect(mapStateToProps, {})(MainPage);