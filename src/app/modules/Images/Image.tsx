import React from "react";
import Modal from 'react-bootstrap/Modal';

type ModalProps = {
    show:any;
    onHide:any;
    imageData:any;
}

type ImageProps = {
    imageData:any;
}


const ImageModal: React.FC<ModalProps> = ({show,onHide,imageData}) => {
    
    return (
        <Modal
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show}
            onHide={onHide}
            dialogClassName={"modal-size"}
        >
            <img
                key={`${imageData.key}Modal`}
                src={imageData.src}
                className={"rounded-3"}
                alt='waa'
            />
        </Modal>
    )      
}

const Image:React.FC<ImageProps> = ({imageData}) => {
    const [modalShow, setModalShow] = React.useState(false);

    return (
        <>
            <img
                key={imageData.key}
                src={imageData.src}
                className={"rounded-3 pointer-cursor"}
                width='128'
                height='100'
                alt='waa'
                onClick={() => setModalShow(true)}
            />
            <ImageModal
                show={modalShow}
                onHide={() => setModalShow(false)} 
                imageData={imageData}
            />
        </>
        
    ) 
}



export default Image;