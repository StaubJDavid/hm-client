import React, {FC, Component,useState, useEffect} from 'react';
import {connect} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {getUnapprovedUsers} from '../../actions/adminActions';
import isEmpty from '../../helpers/isEmpty';
import UnapprovedUser from './UnapprovedUser';


type Props = {
    auth:any;
    unapprovedUsers:any;
    getUnapprovedUsers:any
};

const ApprovePage: FC<Props> = ({auth, unapprovedUsers, getUnapprovedUsers}) => {
    const navigate = useNavigate();

    useEffect(() => {
        if(!auth.isAuthenticated || auth.user.role !== "admin") navigate(`/`);
        getUnapprovedUsers();
    },[]);


    if(unapprovedUsers === null ){
        return <div>Loading...</div>
    }else if(isEmpty(unapprovedUsers)){
        return <div>No users waiting to be approved</div>
    }else {
        return (
            <>
                {!isEmpty(unapprovedUsers)?unapprovedUsers.map((u:any) => {
                    return <UnapprovedUser user={u} />
                }):<></>}
            </>
        )
    }
};

const mapStateToProps = (state:any)=>({
    unapprovedUsers: state.admin.unapprovedUsers,
    auth: state.auth,
});

export default connect(mapStateToProps, {getUnapprovedUsers})(ApprovePage);