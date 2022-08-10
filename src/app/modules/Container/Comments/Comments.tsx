import { FC, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import Comment from './Comment';
import CommentInput from './CommentInput';
import {getComments} from '../../../actions/commentActions';
import { SET_COMMENTS } from '../../../actions/types';
import isEmpty from '../../../helpers/isEmpty';
import Spinner from '../../../common/Spinner';

type Props = {
    auth:any;
    comments:any;
    getComments:any;
    container_id:any;
}

const Comments: FC<Props> = ({auth,comments,getComments, container_id}) => {
    const dispatch = useDispatch();

    useEffect(() => {
        getComments(container_id);

        return () => {
            dispatch({
                type: SET_COMMENTS,
                payload: null
            })
        }
    },[])


    let commentsContent = <></>

    if(comments === null){
        commentsContent = <Spinner size={4}/>
    }else{
        if(isEmpty(comments)){
            commentsContent = <div></div>
        }else{
            commentsContent = <>
                {comments.map((c:any) => {
                    return <Comment data={c} />
                })}
            </>
            
        }
    }

    return (
        <>
            {auth.isAuthenticated?<div className='border-bottom border-2 pb-2'><CommentInput container_id={container_id} /></div>:<></>}
            <br/>
            <div>
                {commentsContent}
            </div>
        </>
    )
};

const mapStateToProps = (state:any)=>({
    comments: state.comments.comments,
    auth: state.auth
});

export default connect(mapStateToProps,{getComments})(Comments);