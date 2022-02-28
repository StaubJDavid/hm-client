import React, { Component} from 'react';
import {connect} from 'react-redux';
import CreateContainer from './Container/CreateContainer';

type Props = {
    auth:any,
}

type State = {

}

class MainPage extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {

        }
        
    }

    componentDidMount(){
    }

    render() {
        return (
            <div>
                {this.props.auth.isAuthenticated?<CreateContainer />:<></>}
                Authenticated: {String(this.props.auth.isAuthenticated)}
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
    auth: state.auth
});

export default connect(mapStateToProps,{})(MainPage);