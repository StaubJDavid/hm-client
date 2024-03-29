import axios from 'axios';
import {GET_ERRORS,
        ADD_IMAGES,
        CLEAR_IMAGES,
        DELETE_IMAGE,
        GET_CONTAINER
    } from './types';
import {getContainer} from './containerActions';

export const addImages = (files:any,images_length:number) => (dispatch:any) => {

    let files_array:Array<any> = [];

    Object.keys(files).map((key:any) => {
        let f:any = {};
        f['index'] = images_length;
        f['message'] = images_length+"xddd";
        images_length++
        f['file'] = files[key];
        // console.log(files[key]);
        // console.log(f);
        return files_array.push(f);
    })

    console.log(files_array);

    dispatch({
        type: ADD_IMAGES,
        payload: files_array
    })
};

export const clearImages = () => (dispatch:any) => {
    dispatch({
        type: CLEAR_IMAGES
    })
};

export const deleteImage = (index:number,files:any) => (dispatch:any) => {
    //console.log("Inside DeleteImage: ",index);
    //console.log(files);
    files.splice(index, 1);
    files.forEach(function(part:any, index:number, theArray:any) {
        theArray[index].index = index;
    });
    //console.log(files);

    dispatch({
        type: DELETE_IMAGE,
        payload: files
    })
};

export const uploadImages = (files:any,container_id:string) => (dispatch:any) => {

    let formData = new FormData();
    files.map((f:any,i:number) => {
        f.file.createdIndex = i;
        console.log(f.file);
        formData.append('data',f.message);
        return formData.append('photos',f.file);
    })

    axios.post(`/api/image/multiple/${container_id}`, formData)
    .then (res => {
        dispatch(clearImages());
        dispatch(getContainer(container_id));
    }).catch(
        err => {
            /*dispatch({
                type: GET_ERRORS,
                payload: err.response.data
            });*/
            console.log(err);
        }
    )
};