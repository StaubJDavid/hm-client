import React, { Component} from 'react';
import {connect} from 'react-redux';
import { Navigate } from 'react-router-dom';
import {registerUser} from '../../actions/authActions';

type Props = {
    auth:any,
    registerUser:any
}

type State = {

}

class Register extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {

        }
        
        this.onRegisterClick = this.onRegisterClick.bind(this);
    }

    onRegisterClick(e:any){
        this.props.registerUser({
            email:"davidkah20@gmail.com",
            password:"staubkah20",
            password2:"staubkah20",
            name:"Staub József Dávid"
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.onRegisterClick}>Register</button>
                {this.props.auth.isAuthenticated?<Navigate to="/" />:<></>}
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
    auth:state.auth
});

export default connect(mapStateToProps,{registerUser})(Register);