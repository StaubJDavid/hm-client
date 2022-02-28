import React, { Component} from 'react';
import {connect} from 'react-redux';
import {getContainer} from '../../actions/containerActions';
import AddImagesButton from '../Images/AddImagesButton';
import ShowImages from '../Images/ShowImages';

type Props = {
    container:any,
    navigate:any,
    params:any,
    getContainer:any
}

type State = {

}

class ClassCompWithConnect extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {

        }
        
    }

    componentDidMount(){
        //console.log("Mount");
        let url = window.location.href;
        url = url.slice(url.lastIndexOf('/')+1,url.length);
        this.props.getContainer(url);
        //console.log(this.props)
    }

    componentDidUpdate(prevProps:any){
        if(this.props.params.c_id!== prevProps.params.c_id){
            let url = window.location.href;
            url = url.slice(url.lastIndexOf('/')+1,url.length);
            this.props.getContainer(url);
        }
    }

    render() {
        let {currentContainer} = this.props.container;

        let profileContent = <></>;

        if(currentContainer.creator_id){
            let {container_id,creator_id,role,title,message,created,time_start,time_end,name,images} = currentContainer;
            profileContent = (
                <>
                    <div>Container id: {container_id}</div>
                    <div>creator_id: {creator_id}</div>
                    <div>role: {role}</div>
                    <div>title: {title}</div>
                    <div>message: {message}</div>
                    <div>created: {created}</div>
                    <div>time_start: {time_start}</div>
                    <div>time_end: {time_end}</div>
                    <div>name: {name}</div>
                    <AddImagesButton container_id={container_id} />
                    <hr/>
                    {<ShowImages />}
                </>
            )
        }
        //console.log(currentContainer);
        return (
            <div>
                {profileContent}
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
    container: state.container
});

export default connect(mapStateToProps,{getContainer})(ClassCompWithConnect);