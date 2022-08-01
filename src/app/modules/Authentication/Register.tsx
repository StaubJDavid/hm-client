import React, { Component} from 'react';
import {connect} from 'react-redux';
import { Navigate } from 'react-router-dom';
import {registerUser, scuffed} from '../../actions/authActions';
import TextInput from '../../common/TextInput';
import TextArea from '../../common/TextArea';
import { useNavigate } from 'react-router-dom';

type Props = {
    registerUser:any,
    auth:any,
    errors:any,
    scuffed:any
}

type State = {
    nickname: string,
    email: string,
    password: string,
    password2: string,
    message: string,
    errors: any
}

class Register extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {
            nickname: '',
            email: '',
            password: '',
            password2: '',
            message: '',
            errors: {}
        }

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentWillReceiveProps(nextProps:any){
        if(nextProps.errors){
            this.setState({errors: nextProps.errors});
        }
    }

    onChange(e:any){
        this.setState({[String(e.target.name)]: String(e.target.value)} as any);
        /*console.log(e.target.name);
        console.log(e.target.value);*/
    }

    onSubmit(e:any){
        e.preventDefault();

        const newUser = {
            name: this.state.nickname,
            email: this.state.email,
            password: this.state.password,
            password2: this.state.password2,
            message: this.state.message
        }

        /**/
        this.props.registerUser(newUser);
    }

    render() {
        const {errors} = this.state;
        return (
        /*<div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">Create your DevConnector account</p>
                            <form onSubmit={this.onSubmit}>
                                <TextInput
                                    name="nickname" 
                                    value={this.state.nickname}
                                    error={errors.nickname} 
                                    type="text"
                                    onChange={this.onChange}  
                                    placeholder="Nickname"
                                />
                                <TextInput
                                    name="email" 
                                    value={this.state.email}
                                    error={errors.email} 
                                    type="email"
                                    onChange={this.onChange}  
                                    placeholder="Email Address"
                                />
                                <TextArea
                                    name="message" 
                                    maxlength={255}
                                    value={this.state.message}
                                    error={errors.message} 
                                    onChange={this.onChange}  
                                    placeholder="Introduction"
                                />
                                <TextInput
                                    name="password" 
                                    value={this.state.password}
                                    error={errors.password} 
                                    type="password"
                                    onChange={this.onChange}  
                                    placeholder="Password"
                                />
                                <TextInput
                                    name="password2" 
                                    value={this.state.password2}
                                    error={errors.password2} 
                                    type="password"
                                    onChange={this.onChange}  
                                    placeholder="Repeat password"
                                />
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
                </div>*/

            <div className='container bg-white middle'>
                <div className="d-flex flex-column align-items-center justify-content-center" >
                    <div>
                        <h1 className="display-4 text-center fw-bold mb-5">Regisztráció</h1>
                    </div>
                    <form className='fmw-50 mh-75' onSubmit={this.onSubmit}>
                        <h2 className="fw-bold mb-2">Teljes név</h2>
                        <TextInput
                            name="nickname" 
                            value={this.state.nickname}
                            error={errors.nickname} 
                            type="text"
                            onChange={this.onChange}  
                            placeholder="Kitalált Pista"
                            classNamesInherited={"mb-2"}
                        />
                        <h2 className="fw-bold mb-2">E-mail cím</h2>
                        <TextInput
                            name="email" 
                            value={this.state.email}
                            error={errors.email} 
                            type="email"
                            onChange={this.onChange}  
                            placeholder="valamicim@gmail.com"
                            classNamesInherited={"mb-2"}
                        />
                        <h2 className="fw-bold mb-2">Bemutatkozás</h2>
                        <TextArea
                            name="message" 
                            maxlength={255}
                            value={this.state.message}
                            error={errors.message} 
                            onChange={this.onChange}  
                            placeholder="Helló, én vagyok az tudod onnan abból a cuccosból én vagyok az"
                            classNamesInherited={"text-area-no-resize mb-2"}
                        />
                        <h2 className="fw-bold mb-2">Jelszó</h2>
                        <TextInput
                            name="password" 
                            value={this.state.password}
                            error={errors.password} 
                            type="password"
                            onChange={this.onChange}  
                            placeholder="Jelszó"
                            classNamesInherited={"mb-2"}
                        />
                        <h2 className="fw-bold mb-2">Jelszó megismétlése</h2>
                        <TextInput
                            name="password2" 
                            value={this.state.password2}
                            error={errors.password2} 
                            type="password"
                            onChange={this.onChange}  
                            placeholder="Jelszó ismétlés"
                            classNamesInherited={"mb-2"}
                        />
                        <div className='text-center'>
                            <input type="submit" value={"Regisztrálás"} className="btn btn-info btn-block mt-4 fw-bolder fs-3" />
                        </div>
                    </form>
                </div>
                {this.props.auth.isAuthenticated?<Navigate to="/" />:<></>}
                {this.props.errors.register?<><Navigate to="/" />{this.props.scuffed()}</>:<></>}
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
    auth:state.auth,
    errors: state.errors
});

export default connect(mapStateToProps,{registerUser, scuffed})(Register);