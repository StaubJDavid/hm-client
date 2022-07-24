import React, { FC, useState} from 'react';
import {connect} from 'react-redux';
import timeFormat from '../../../helpers/timeFormat';
import classnames from 'classnames';
import {deleteComment} from '../../../actions/commentActions';

type Props = {
    data:any;
    auth:any;
    deleteComment:any;
}

const Comment: FC<Props> = ({data, auth, deleteComment}) => {    
    let commentContent = <></>;
    if(data){
        let {comment_id, creator_id, container_id, message, created_time, name} = data;
        commentContent = (
        <>
            <div className="container-fluid">
                <p>{comment_id}</p>
                <p>{creator_id}</p>
                <p>{container_id}</p>
                <h2>{name}</h2>
                <h3>{timeFormat(created_time)}</h3>
                <h6>{message}</h6> 
            </div>
            {auth.user.role==="admin"?<button onClick={() => deleteComment(comment_id, container_id)}>Delete</button>:<></>}
            <hr/>
        </>
        )
    }
    return (
    <>
        {commentContent}
    </>
    )
}

const mapStateToProps = (state:any)=>({
    errors: state.errors,
    auth: state.auth
});

export default connect(mapStateToProps,{deleteComment})(Comment);