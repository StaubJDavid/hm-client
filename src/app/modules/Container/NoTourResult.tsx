import {FC} from 'react';
import {connect} from 'react-redux';

const NoTourResult: FC = () => {


    return (
        <div className={"card"} >
            <div className={"card-body"} >
                <h1 className='text-center'>Nincs túra</h1>
            </div>
        </div>
    )
};

const mapStateToProps = (state:any)=>({
});

export default connect(mapStateToProps, {})(NoTourResult);