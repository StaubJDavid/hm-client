import React, { Component } from "react";
import axios from 'axios';
import isEmpty from '../helpers/isEmpty';

type Props = {
}

type State = {
    name: string,
    price: string,
    selectedFile: string,
    filename: string,
    preview:any
}

class FileUpload extends Component<Props,State> {
    constructor(props:any){
        super(props);

        this.state = {
            name: '',
            price: '',
            selectedFile: '',
            filename: '',
            preview:{}
        }
        this.onChange = this.onChange.bind(this);
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
    
    fileSelectedHandler = (event:any) => {
        console.log(event.target.files[0]);
        console.log(event.target.value);
        this.setState({preview: URL.createObjectURL(event.target.files[0])})
        let file = event.target.files[0].name;
        this.setState({
            selectedFile: event.target.files[0],
            filename: file
        })
        console.log(file);
    }
    
    fileUploadHandler = (event:any) => {
        event.preventDefault();
        let formData = new FormData();
        formData.append('name', this.state.name);
        formData.append('price', this.state.price);
        formData.append('filename', this.state.filename);
        formData.append('file', this.state.selectedFile);
      
        /*const config = {     
            headers: { 'content-type': 'multipart/form-data' }
        }*/
        
        axios.post(`/api/image`, formData)
            .then (res => {
                console.log(res.data);
                console.log(this.state.filename);
                console.log(formData);
            })
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
                        name="file" 
                        id="file" 
                        placeholder="Upload your file" 
                        onChange={this.fileSelectedHandler}
                    />
                    <br/>
                    <button 
                        type="submit" 
                        onClick={this.fileUploadHandler}
                    >Add Products</button>
                </form>
                {isEmpty(this.state.preview)?<></>:<img src={this.state.preview} width='100' height='100' alt='waa'/>}
            </div>
        )
    }
}

export default FileUpload;