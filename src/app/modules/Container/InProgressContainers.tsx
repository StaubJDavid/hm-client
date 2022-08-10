import React, {FC, useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import {getInProgressContainers} from '../../actions/containerActions';
import Container from './Container';
import PageNavBar from '../../common/Pagination/PageNavBar';
import isEmpty from '../../helpers/isEmpty';

import {SET_INPROGRESS_CONTAINERS} from '../../actions/types';
import calculateMaxPage from '../../helpers/calculateMaxPage';
import NoTourResult from './NoTourResult';
import Spinner from '../../common/Spinner';

type Props = {
    inProgressContainers:any,
    getInProgressContainers:any
};

const InProgressContainers: FC<Props> = ({inProgressContainers,getInProgressContainers}) => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

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
        return <Spinner size={4}/>
    }else{
        if(inProgressContainers.total === 0){
            return <NoTourResult />
        }else{
            return (
                <div className="d-flex flex-column h-100">
                    <div className='align-self-stretch p-2 overflow-auto'>
                        {!isEmpty(inProgressContainers)?inProgressContainers.data.map((c:any, index:any) => {
                            return (
                                <>
                                    <Container container={c} index={index} disabled={true}  />
                                    
                                </>
                            )
                        }):<></>}
                    </div>
                    <div className='mt-auto p-2'>
                        <PageNavBar passedFc={handleSearch} currentPage={currentPage} maxPage={calculateMaxPage(inProgressContainers.total,inProgressContainers.limit)} />
                    </div>
                </div>
            )
        }
    }
};

const mapStateToProps = (state:any)=>({
    inProgressContainers: state.container.inProgressContainers
});

export default connect(mapStateToProps, {getInProgressContainers})(InProgressContainers);