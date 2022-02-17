import React, { Component} from 'react';
import {connect} from 'react-redux';

type Props = {
    first:number
}

type State = {

}

class FirstPage extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {

        }
        
    }

    render() {
        return (
            <div>
                {this.props.first}
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({

});

export default connect(mapStateToProps,{})(FirstPage);