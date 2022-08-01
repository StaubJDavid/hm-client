import {FC, useState} from 'react';
import TextArea from '../../../common/TextArea';
import {connect, useDispatch} from 'react-redux';
import {postComment} from '../../../actions/commentActions';

type Props = {
    postComment:any,
    container_id:any
}

const CommentInput: FC<Props> = ({container_id, postComment}) => {
    //const dispatch = useDispatch();
    const [text, setText] = useState("");

    return (
        <div>
            <TextArea
                name="text" 
                maxlength={255}
                value={text}
                error={null} 
                onChange={(e:any) => setText(e.target.value)}  
                placeholder="Üzenet..."
            />
            <br />
            <button onClick={(e:any) => {postComment(container_id,text);setText("")}} >Komment küldése</button>
        </div>
    )

  
}

const mapStateToProps = (state:any)=>({
});

export default connect(mapStateToProps,{postComment})(CommentInput);