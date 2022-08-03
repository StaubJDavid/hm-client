import {FC} from 'react'

type Props = {
    size?:number;
}

const Spinner: FC<Props> = ({size}) => {
    return (
        <div className="h-100 d-flex align-items-center justify-content-center">
            <div
                className="spinner-border"
                role="status"
                style={size?{"width":`${size}rem`,"height":`${size}rem`}:{}}
            >
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}
    


export default Spinner;