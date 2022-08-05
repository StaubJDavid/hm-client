import React, { FC, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {createContainer, clearContainer} from '../../actions/containerActions';
import {clearMapsEverything} from '../../actions/googleMapsActions';
import { useNavigate } from 'react-router-dom';
import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';
import SelectList from '../../common/SelectList';
import "bootstrap/js/src/collapse.js";
import { Navigate } from 'react-router-dom';
import isEmpty from '../../helpers/isEmpty';
import MapGuide from '../MapGuide';

type Props = {
    errors:any;
    maps:any;
    createContainer:any;
    clearContainer:any;
    clearMapsEverything:any;
};

const CreateContainer: FC<Props> = ({errors,maps,createContainer,clearContainer,clearMapsEverything}) => {
    const navigate = useNavigate();

    const [role, setRole] = useState("tour");
    const [title, setTitle] = useState("");
    const [message, setMessage] = useState("");
    const [time_start, setTimeStart] = useState("");
    const [time_end, setTimeEnd] = useState("");
    const [options, setOptions] = useState([{name: 'Túra', value:'tour'}]);
                                            
    /*const [options, setOptions] = useState([{name: 'Túra', value:'tour'},
    {name: 'Album', value:'album'}]);*/

    useEffect(() => {
        clearMapsEverything();
    },[])

    
    const onSubmit = async (e:any) => {
        e.preventDefault();

        const container = {
            role: role,
            title: title,
            message: message,
            time_start: time_start,
            time_end: time_end,
            trip_start: maps.startPoint,
            trip_end: maps.endPoint,
            waypoints: maps.waypoints
        }

        clearContainer();
        const createSuccess = await createContainer(container);
        //console.log(createSuccess);
        console.log(createSuccess);
        if(createSuccess !== ""){
            clearMapsEverything();
            navigate(`/container/${createSuccess}`);
        }
    }

    return (
        <div className='container bg-white middle of-auto px-5'>
            <h1 className="display-4 text-center fw-bold mb-5">Túra tervezés</h1>
            <form onSubmit={(e:any) => onSubmit(e)}>

                <h2 className="fw-bold mb-2">Túra címe</h2>
                <TextInput
                    name="title" 
                    value={title}
                    error={errors.title} 
                    type="text"
                    onChange={(e:any) => setTitle(e.target.value)}  
                    placeholder="Túra címe"
                    classNamesInherited={"mb-4"}
                />

                <h2 className="fw-bold mb-2">Túra leírása</h2>
                <TextArea
                    name="message" 
                    maxlength={16384}
                    value={message}
                    error={errors.message} 
                    onChange={(e:any) => setMessage(e.target.value)}  
                    placeholder="Terv, tudnivalók stb..."
                    classNamesInherited={"mb-4"}
                />

                <h2 className="fw-bold mb-2">Túra fajta</h2>
                <SelectList
                    name="role" 
                    value={role}
                    error={errors.role} 
                    onChange={(e:any) => setRole(e.target.value)}  
                    options={options}
                    placeholder="Container Type"
                />

                {/* Időpont választás */}
                <h2 className="fw-bold mb-2 mt-4">Túra Időpontok</h2>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-md-6 text-center">
                            Kezdő időpont
                        </div>
                        <div className="col-md-6 text-center">
                            Tervezett végzési időpont
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-6 text-center">
                            <input onChange={(e:any) => setTimeStart(e.target.value)} type="datetime-local" name="time_start"></input>
                        </div>
                        <div className="col-md-6 text-center">
                            <input onChange={(e:any) => setTimeEnd(e.target.value)} type="datetime-local" name="time_end"></input>
                        </div>
                    </div>
                </div>

                <h2 className="fw-bold mb-2 mt-4">Túra útvonal</h2>
                <div>
                    <MapGuide />
                </div>
                

                <div className='text-center mb-4'>
                    <input type="submit" value="Túra létrehozása" className="btn btn-primary btn-block mt-4 fw-bolder fs-3 shadow" />
                </div>
            </form>
        </div>
    )
};

const mapStateToProps = (state:any)=>({
    errors:state.errors,
    maps:state.maps
});

export default connect(mapStateToProps, {createContainer,clearContainer,clearMapsEverything})(CreateContainer);

/*
<div className="container">
                        <div className="row of-auto">
                            <div className="m-auto">
                                <p className="lead text-center">Create container</p>
                                <form className="of-auto" onSubmit={(e:any) => onSubmit(e)}>
                                    <TextInput
                                        name="title" 
                                        value={title}
                                        error={errors.title} 
                                        type="text"
                                        onChange={(e:any) => setTitle(e.target.value)}  
                                        placeholder="Title"
                                    />
                                    <br/>
                                    <TextArea
                                        name="message" 
                                        maxlength={2048}
                                        value={message}
                                        error={errors.message} 
                                        onChange={(e:any) => setMessage(e.target.value)}  
                                        placeholder="Plan"
                                    />
                                    <br/>
                                    <SelectList
                                        name="role" 
                                        value={role}
                                        error={errors.role} 
                                        onChange={(e:any) => setRole(e.target.value)}  
                                        options={options}
                                        placeholder="Container Type"
                                    />
                                    <br/>
                                    <p>Start Time:</p>
                                    <input onChange={(e:any) => setTimeStart(e.target.value)} type="datetime-local" name="time_start"></input>
                                    
                                    <p>End Time:</p>
                                    <input onChange={(e:any) => setTimeEnd(e.target.value)} type="datetime-local" name="time_end"></input>
                                    <br/>
                                    <br/>
                                    <br/>
                                    <MapGuide />
                                    <input type="submit" className="btn btn-info btn-block mt-4" />
                                </form>
                            </div>
                        </div>
                    </div>
*/