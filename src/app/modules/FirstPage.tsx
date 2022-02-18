import React, { Component} from 'react';
import {connect} from 'react-redux';

type Props = {
    first:number,
    auth:any,
}

type State = {

}

class FirstPage extends Component<Props,State> {
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
                Authenticated: {String(this.props.auth.isAuthenticated)}
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
    auth: state.auth
});

export default connect(mapStateToProps,{})(FirstPage);