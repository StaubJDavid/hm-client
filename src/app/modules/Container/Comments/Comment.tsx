import React, { FC, useState} from 'react';
import {connect} from 'react-redux';
import timeFormat from '../../../helpers/timeFormat';
import classnames from 'classnames';
import {deleteComment} from '../../../actions/commentActions';
import TextArea from '../../../common/TextArea';

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
        <div className="container-fluid mb-4 border border-2 p-2 rounded-3 shadow">
            <div className="row">
                <div className="col-md-4">
                    <div className='text-center fw-bold fs-3 mb-2'>
                        {name}
                    </div>
                    <div className='text-center mb-2'>
                        {timeFormat(created_time)}
                    </div>
                    {auth.user.role==="admin"?
                        <div className='text-center'>
                            <button
                                className='btn btn-primary'
                                onClick={() => deleteComment(comment_id, container_id)}
                            >
                                Komment törlése
                            </button>
                        </div>:<></>}
                </div>
                <div className="col-md-8">
                    <TextArea
                        name="message" 
                        maxlength={2050}
                        value={message}
                        error={false} 
                        onChange={() => {}}  
                        placeholder=""
                        classNamesInherited={"text-area-no-resize"}
                    />
                </div>
            </div>
        </div>
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