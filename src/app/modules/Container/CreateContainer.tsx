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
    const [options, setOptions] = useState([{name: 'Túra', value:'tour'},
                                            {name: 'Album', value:'album'}]);

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

        /*
        endPoint
startPoint
        */
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
        <>
            <div className="container">
                <div className="row">
                    <div className="m-auto">
                        <p className="lead text-center">Create container</p>
                        <form onSubmit={(e:any) => onSubmit(e)}>
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
            </>
    )
};

const mapStateToProps = (state:any)=>({
    errors:state.errors,
    maps:state.maps
});

export default connect(mapStateToProps, {createContainer,clearContainer,clearMapsEverything})(CreateContainer);