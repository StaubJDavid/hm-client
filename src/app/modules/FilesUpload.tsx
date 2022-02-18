import React, { Component } from "react";
import axios from 'axios';
import {connect} from 'react-redux';
import {addImages, clearImages, deleteImage, uploadImages} from '../actions/uploadActions';
import isEmpty from '../helpers/isEmpty';

type Props = {
    upload:any,
    addImages:any,
    clearImages:any,
    deleteImage:any,
    uploadImages:any
}

type State = {
    name: string,
    price: string,
    selectedFile: string,
    filename: string,
    files:any
}

class FilesUpload extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {
            name: '',
            price: '',
            selectedFile: '',
            filename: '',
            files:{}
        }
        this.onChange = this.onChange.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
    }

    componentDidMount(){
        this.props.clearImages();
    }
    
    handleChange = (event:any) => {
        this.setState({
           name: "dsadsa",
           price: "321312sad"
        })
    }

    onChange(e:any){
        this.setState({[String(e.target.name)]: String(e.target.value)} as any);
    }
    
    fileSelectedHandler = (e:any) => {
        /*console.log(event.target.files[0]);
        console.log(event.target.value);
        this.setState({preview: URL.createObjectURL(event.target.files[0])})
        let file = event.target.files[0].name;
        this.setState({
            selectedFile: event.target.files[0],
            filename: file
        })
        console.log(file);*/
        /*this.setState({files:e.target.files});
        console.log(e.target.files);*/
        console.log(e.target.files);
        this.props.addImages(e.target.files, this.props.upload.images.length);
    }

    deleteImage = (e:any) => {
        /*console.log(event.target.files[0]);
        console.log(event.target.value);
        this.setState({preview: URL.createObjectURL(event.target.files[0])})
        let file = event.target.files[0].name;
        this.setState({
            selectedFile: event.target.files[0],
            filename: file
        })
        console.log(file);*/
        /*this.setState({files:e.target.files});
        console.log(e.target.files);*/
        console.log(e);
        this.props.deleteImage(e, this.props.upload.images);
    }
    
    fileUploadHandler = (event:any) => {
        event.preventDefault();        

        /*let formData = new FormData();
        
        Object.keys(this.state.files).map((key:any) => {
            return formData.append('photos', this.state.files[key]);
        })
        
        let container_id = 'salamon'
        axios.post(`/api/image/multiple/${container_id}`, formData)
        .then (res => {
            console.log(res.data);
            console.log(formData);
        })*/
        /*console.log("Submit Files");
        console.log(this.props.upload.images);*/
        this.props.uploadImages(this.props.upload.images, "target");
    }

    render () {
        return (
            <div>
                <form encType="multipart/form">
                    <input 
                        type="text" 
                        name="name" 
                        id="name" 
                        placeholder="Name of the product" 
                        onChange={this.onChange}
                    />
                    <br/>
                    <input 
                        type="text" 
                        name="price" 
                        id="price" 
                        placeholder="Price" 
                        onChange={this.onChange}
                    />
                    <br/>
                    <input 
                        type="file" 
                        name="files" 
                        id="files" 
                        multiple={true}
                        placeholder="Upload your files" 
                        onChange={this.fileSelectedHandler}
                    />
                    <br/>
                    <button 
                        type="submit" 
                        onClick={this.fileUploadHandler}
                    >Add Products</button>
                </form>
                
                <div>
                    {this.props.upload.images.map((i:any) => {
                        return <><img key={i.index} src={URL.createObjectURL(i.file)} width='100' height='100' alt='waa'/><button onClick={() => this.deleteImage(i.index)}>Delete</button></>
                    })}
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state:any)=>({
    upload: state.upload
});

export default connect(mapStateToProps,{addImages, clearImages, deleteImage, uploadImages})(FilesUpload);