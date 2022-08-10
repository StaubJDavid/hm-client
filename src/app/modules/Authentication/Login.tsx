import { Component} from 'react';
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

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
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
            <div className='container bg-white middle'>
                <div className="d-flex flex-column align-items-center justify-content-center auto-center" >
                    <div>
                        <h1 className="display-4 text-center fw-bold mb-5">Bejelentkezés</h1>
                    </div>
                    <form className='fmw-50' onSubmit={this.onSubmit}>
                        <h2 className="fw-bold mb-2">E-mail cím</h2>
                        <TextInput
                            name="email" 
                            value={this.state.email}
                            error={errors.email} 
                            type="email"
                            onChange={this.onChange}  
                            placeholder="E-mail cím"
                        />
                        <div className='mb-5' />
                        <h2 className="fw-bold mb-2">Jelszó</h2>
                        <TextInput 
                            type="password"
                            name="password"
                            value={this.state.password} 
                            onChange={this.onChange}
                            error={errors.password}
                            placeholder="Jelszó"
                        />
                        <div className='text-center'>
                            <input type="submit" value={"Bejelentkezés"} className="btn btn-primary btn-block mt-4 fw-bolder fs-3 shadow" />
                        </div>
                    </form>
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