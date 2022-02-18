import React, { Component} from 'react';
import {connect} from 'react-redux';
import { Navigate } from 'react-router-dom';
import {loginUser} from '../../actions/authActions';

type Props = {
    auth:any,
    loginUser:any
}

type State = {

}

class Login extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {

        }
        
        this.onLoginClick = this.onLoginClick.bind(this);
    }

    onLoginClick(e:any){
        this.props.loginUser({
            email:"davidkah20@gmail.com",
            password:"staubkah20"
        });
    }

    componentDidMount(){

    }

    render() {
        return (
            <div>
                <button onClick={this.onLoginClick}>Login</button>
                {this.props.auth.isAuthenticated?<Navigate to="/" />:<></>}
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
    auth:state.auth
});

export default connect(mapStateToProps,{loginUser})(Login);