import React, {FC, Component,useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import {getPastContainers} from '../../actions/containerActions';
import AddImagesButton from '../Images/AddImagesButton';
import ShowImages from '../Images/ShowImages';
import Container from './Container';
import PageNavBar from '../../common/Pagination/PageNavBar';
import isEmpty from '../../helpers/isEmpty';

import {SET_PAST_CONTAINERS} from '../../actions/types';

type Props = {
    pastContainers:any,
    getPastContainers:any
};

const PastContainers: FC<Props> = ({pastContainers,getPastContainers}) => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    //2 is the limit, change it
    useEffect(() => {
        getPastContainers((currentPage-1)*5,currentPage, 5);

        return () => {
            dispatch({
                type: SET_PAST_CONTAINERS,
                payload: {}
            })
        }
    },[])

    const handleSearch = (page:number) => {
        setCurrentPage(page);
    
        getPastContainers((page-1)*5,page, 5)
    }

    if(isEmpty(pastContainers)){
        return <div>Loading...</div>
    }else{
        if(pastContainers.total === 0){
            return <div>No result</div>
        }else{
            return (
                <>
                    {!isEmpty(pastContainers)?pastContainers.data.map((c:any) => {
                        return <Container container={c} />
                    }):<></>}
                    <PageNavBar passedFc={handleSearch} currentPage={currentPage} maxPage={Math.trunc(pastContainers.total/pastContainers.limit) + 1} />
                </>
            )
        }
    }
};

const mapStateToProps = (state:any)=>({
    pastContainers: state.container.pastContainers
});

export default connect(mapStateToProps, {getPastContainers})(PastContainers);