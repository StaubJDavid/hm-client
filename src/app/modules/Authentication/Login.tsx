import React, { Component} from 'react';
import {connect} from 'react-redux';
import { Navigate } from 'react-router-dom';
import {loginUser} from '../../actions/authActions';
import TextInput from '../../common/TextInput';

type Props = {
    auth:any,
    errors:any,
    loginUser:any
}

type State = {
    email: string,
    password: string,
    errors: any
}

class Login extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {
            email: '',
            password: '',
            errors: {}
        }
        
        //Remove
        this.onLoginClick = this.onLoginClick.bind(this);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    //Remove
    onLoginClick(e:any){
        this.props.loginUser({
            email:"davidkah20@gmail.com",
            password:"staubkah20"
        });
    }

    componentWillReceiveProps(nextProps:any){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors})
        }
    }

    onChange(e:any){
        this.setState({[String(e.target.name)]: String(e.target.value)} as any);
    }

    onSubmit(e:any){
        e.preventDefault();

        const User = {
            email: this.state.email,
            password: this.state.password,
        }

        this.props.loginUser(User);
    }

    render() {
        const {errors} = this.state; 
        return (
            <div className="login">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Log In</h1>
                            <p className="lead text-center">Sign in to your DevConnector account</p>
                            <form onSubmit={this.onSubmit}>
                                <TextInput
                                    name="email" 
                                    value={this.state.email}
                                    error={errors.email} 
                                    type="email"
                                    onChange={this.onChange}  
                                    placeholder="Email Address"
                                />
                                <TextInput 
                                    type="password"
                                    name="password"
                                    value={this.state.password} 
                                    onChange={this.onChange}
                                    error={errors.password}
                                    placeholder="Password"
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
                {this.props.auth.isAuthenticated?<Navigate to={"/"} />:<></>}
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
    auth:state.auth,
    errors:state.errors
});

export default connect(mapStateToProps,{loginUser})(Login);