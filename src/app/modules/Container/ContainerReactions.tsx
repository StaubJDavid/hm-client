import React, { FC, useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {postReaction} from '../../actions/containerActions';
import isEmpty from '../../helpers/isEmpty';
import classnames from 'classnames';

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

    const [goingPerson, setGoingPerson] = useState<any[]>([]);
    const [notGoingPerson, setNotGoingPerson] = useState<any[]>([]);
    const [notSurePerson, setNotSurePerson] = useState<any[]>([]);

    const onReactionClick = (reaction:any) => {
        postReaction(container.container_id, reaction, container.reaction_id, index);
    }

    useEffect(() => {
        container.reacted_users.forEach((user:any) => {
            switch(user.reaction){
                case "going":setGoingPerson((goingPerson:any[]) => [...goingPerson, user]);break;
                case "not_going":setNotGoingPerson((notGoingPerson:any[]) => [...notGoingPerson, user]);break;
                case "not_sure":setNotSurePerson((notSurePerson:any[]) => [...notSurePerson, user]);break;
            }
        });
    },[container])


    return (
        <div className='d-flex justify-content-center'>
            <button
            className={classnames("btn btn-primary",{"btn-success":container.own_reaction === "going"})}
            onClick={() => onReactionClick("going")}
            disabled={!auth.isAuthenticated || disabled}
            >
                Megy - {container.reactions.going}
            </button>

            <button
            className={classnames("btn btn-primary mx-5",{"btn-success":container.own_reaction === "not_going"})}
            onClick={() => onReactionClick("not_going")}
            disabled={!auth.isAuthenticated || disabled}
            >
                Nem megy - {container.reactions.not_going}
            </button>

            <button
            className={classnames("btn btn-primary",{"btn-success":container.own_reaction === "not_sure"})}
            onClick={() => onReactionClick("not_sure")}
            disabled={!auth.isAuthenticated || disabled}
            >
                Nem biztos - {container.reactions.not_sure}
            </button>
        </div>
    )
};

const mapStateToProps = (state:any)=>({
    auth:state.auth
});

export default connect(mapStateToProps, {postReaction})(CreateContainer);