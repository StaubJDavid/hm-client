import React, {FC, Component,useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import {getInProgressContainers} from '../../actions/containerActions';
import AddImagesButton from '../Images/AddImagesButton';
import ShowImages from '../Images/ShowImages';
import Container from './Container';
import PageNavBar from '../../common/Pagination/PageNavBar';
import isEmpty from '../../helpers/isEmpty';

import {SET_INPROGRESS_CONTAINERS} from '../../actions/types';
import calculateMaxPage from '../../helpers/calculateMaxPage';

type Props = {
    inProgressContainers:any,
    getInProgressContainers:any
};

const InProgressContainers: FC<Props> = ({inProgressContainers,getInProgressContainers}) => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    //2 is the limit, change it
    useEffect(() => {
        getInProgressContainers((currentPage-1)*5,currentPage, 5);

        return () => {
            dispatch({
                type: SET_INPROGRESS_CONTAINERS,
                payload: {}
            })
        }
    },[])

    const handleSearch = (page:number) => {
        setCurrentPage(page);
    
        getInProgressContainers((page-1)*5,page, 5)
    }

    if(isEmpty(inProgressContainers)){
        return <div>Loading...</div>
    }else{
        if(inProgressContainers.total === 0){
            return <div>No result</div>
        }else{
            return (
                <>
                    {!isEmpty(inProgressContainers)?inProgressContainers.data.map((c:any) => {
                        return <Container container={c} />
                    }):<></>}
                    <PageNavBar passedFc={handleSearch} currentPage={currentPage} maxPage={calculateMaxPage(inProgressContainers.total,inProgressContainers.limit)} />
                </>
            )
        }
    }
};

const mapStateToProps = (state:any)=>({
    inProgressContainers: state.container.inProgressContainers
});

export default connect(mapStateToProps, {getInProgressContainers})(InProgressContainers);