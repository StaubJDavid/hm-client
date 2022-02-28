import React, { Component} from 'react';
import {connect} from 'react-redux';
import {createContainer} from '../../actions/containerActions';
import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';
import SelectList from '../../common/SelectList';
import "bootstrap/js/src/collapse.js";
import { Navigate } from 'react-router-dom';

type Props = {
    errors:any,
    container:any,
    createContainer:any
}

type State = {
    role:any,
    title:any,
    message:any,
    time_start:any,
    time_end:any,
    errors: any
}

class CreateContainer extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {
            role:'tour',
            title:'',
            message:'',
            time_start:'',
            time_end:'',
            errors:{}
        }
     
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange(e:any){
        this.setState({[String(e.target.name)]: String(e.target.value)} as any);
    }

    onSubmit(e:any){
        e.preventDefault();

        const container = {
            role: this.state.role,
            title: this.state.title,
            message: this.state.message,
            time_start: this.state.time_start,
            time_end: this.state.time_end
        }

        this.props.createContainer(container);
    }

    render() {
        const {errors} = this.state;

        const options = [
            {name: 'Túra', value:'tour'},
            {name: 'Album', value:'album'},
        ]

        return (
            <>
            <button className="btn btn-primary" data-bs-toggle="collapse" data-bs-target="#collapseContainerCreate" aria-expanded="false" aria-controls="collapseContainerCreate">Create Container</button>
                <div> 
                    <div className="collapse" id="collapseContainerCreate">
                        <div className="container">
                            <div className="row">
                                <div className="col-md-8 m-auto">
                                    <p className="lead text-center">Create container</p>
                                    <form onSubmit={this.onSubmit}>
                                        <TextInput
                                            name="title" 
                                            value={this.state.title}
                                            error={errors.title} 
                                            type="text"
                                            onChange={this.onChange}  
                                            placeholder="Title"
                                        />
                                        <TextArea
                                            name="message" 
                                            maxlength={2048}
                                            value={this.state.message}
                                            error={errors.message} 
                                            onChange={this.onChange}  
                                            placeholder="Plan"
                                        />
                                        <SelectList
                                            name="role" 
                                            value={this.state.role}
                                            error={errors.role} 
                                            onChange={this.onChange}  
                                            options={options}
                                            placeholder="Container Type"
                                        />
                                        <p>Start Time:</p>
                                        <input onChange={this.onChange} type="datetime-local" name="time_start"></input>
                                        
                                        <p>End Time:</p>
                                        <input onChange={this.onChange} type="datetime-local" name="time_end"></input>
                                        
                                        <input type="submit" className="btn btn-info btn-block mt-4" />
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {this.props.container.currentContainer.container_id?<Navigate to={`/container/${this.props.container.currentContainer.container_id}`} />:<></>}
            </>
        )
    }
}

const mapStateToProps = (state:any)=>({
    errors:state.errors,
    container: state.container
});

export default connect(mapStateToProps,{createContainer})(CreateContainer);