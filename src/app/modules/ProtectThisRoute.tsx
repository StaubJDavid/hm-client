import React, { Component} from 'react';
import {connect} from 'react-redux';

type Props = {
}

type State = {

}

class ProtectThisRoute extends Component<Props,State> {
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
                This is a protected Route
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
});

export default connect(mapStateToProps,{})(ProtectThisRoute);