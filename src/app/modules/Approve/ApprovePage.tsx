import { FC, useEffect} from 'react';
import {connect} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {getUnapprovedUsers} from '../../actions/adminActions';
import Spinner from '../../common/Spinner';
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
        return <Spinner size={4}/>
    }else if(isEmpty(unapprovedUsers)){
        return <div className='container bg-white middle of-auto px-5'>
                    <h2 className="fw-bold my-2 text-center">Jóváhagyás</h2>
                </div>
    }else {
        return (
            <div className='container bg-white middle of-auto px-5'>
                <h2 className="fw-bold my-2 text-center">Jóváhagyás</h2>
                {!isEmpty(unapprovedUsers)?unapprovedUsers.map((u:any) => {
                    return <UnapprovedUser user={u} />
                }):<></>}
            </div>
        )
    }
};

const mapStateToProps = (state:any)=>({
    unapprovedUsers: state.admin.unapprovedUsers,
    auth: state.auth,
});

export default connect(mapStateToProps, {getUnapprovedUsers})(ApprovePage);