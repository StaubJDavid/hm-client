import React, { FC, useEffect} from 'react';
import {connect} from 'react-redux';
import {refuseUser, approveUser} from '../../actions/adminActions';
import TextArea from '../../common/TextArea';
import timeFormat from '../../helpers/timeFormat';

type Props = {
    user:any;
    refuseUser:any;
    approveUser:any;
};

const UnapprovedUser: FC<Props> = ({user, refuseUser, approveUser}) => {

    let {email, user_id, name, message, registered, role} = user;

    return (
        <div className="container-fluid mb-5 border-rounded border px-3 pb-3 shadow-sm">
            <div className="row mb-2">
                <div className="col-md-6 text-center fw-bold fs-3">
                    {email}
                </div>
                <div className="col-md-6 text-center fw-bold fs-3">
                    {name}
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <TextArea
                        name="message" 
                        maxlength={255}
                        value={message}
                        error={false} 
                        onChange={() => {}}  
                        placeholder="Helló, én vagyok az tudod onnan abból a cuccosból én vagyok az"
                        classNamesInherited={"text-area-no-resize mb-2"}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-md-6 text-center">
                    <button
                        className='btn btn-success fw-bold fs-5 shadow'
                        onClick={() => approveUser(user_id)}
                    >
                        Jóváhagyás
                    </button>
                </div>
                <div className="col-md-6 text-center">
                    <button
                        className='btn btn-danger fw-bold fs-5 shadow'
                        onClick={() => refuseUser(user_id)}
                    >
                        Elutasítás
                    </button>
                </div>
            </div>
        </div>
    )
};

const mapStateToProps = (state:any)=>({
});

export default connect(mapStateToProps, {approveUser, refuseUser})(UnapprovedUser);