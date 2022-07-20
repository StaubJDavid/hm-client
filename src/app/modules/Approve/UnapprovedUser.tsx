import React, { FC, useEffect} from 'react';
import {connect} from 'react-redux';
import {refuseUser, approveUser} from '../../actions/adminActions';
import timeFormat from '../../helpers/timeFormat';

type Props = {
    user:any;
    refuseUser:any;
    approveUser:any;
};

const UnapprovedUser: FC<Props> = ({user, refuseUser, approveUser}) => {

    let {email, user_id, name, message, registered, role} = user;

    return (
        <div className="mb-5">
            <div>Email: {email}</div>
            <div>Name: {name}</div>
            <div>Role: {role}</div>
            <div>message: {message}</div>
            <div>registered: {timeFormat(registered)}</div>
            <button onClick={() => approveUser(user_id)}>Approve</button>
            <button onClick={() => refuseUser(user_id)}>Refuse</button>
        </div>
    )
};

const mapStateToProps = (state:any)=>({
});

export default connect(mapStateToProps, {approveUser, refuseUser})(UnapprovedUser);