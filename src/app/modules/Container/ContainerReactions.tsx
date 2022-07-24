import React, { FC, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {postReaction} from '../../actions/containerActions';
import isEmpty from '../../helpers/isEmpty';

type Props = {
    auth:any;
    container:any;
    index:any;
    disabled:any;
    postReaction:any;
};

const CreateContainer: FC<Props> = ({auth, container, index, disabled, postReaction}) => {
    const [going, setGoing] = useState(false);
    const [notGoing, setNotGoing] = useState(false);
    const [notSure, setNotSure] = useState(false);


    const onReactionClick = (reaction:any) => {
        postReaction(container.container_id, reaction, container.reaction_id, index);
    }

    return (
        <div>
            <button onClick={() => onReactionClick("going")} disabled={!auth.isAuthenticated || disabled}>
                Going - {container.reactions.going}
            </button>

            <button onClick={() => onReactionClick("not_going")} disabled={!auth.isAuthenticated || disabled}>
                Not Going - {container.reactions.not_going}
            </button>

            <button onClick={() => onReactionClick("not_sure")} disabled={!auth.isAuthenticated || disabled}>
                Not Sure - {container.reactions.not_sure}
            </button>
        </div>
    )
};

const mapStateToProps = (state:any)=>({
    auth:state.auth
});

export default connect(mapStateToProps, {postReaction})(CreateContainer);