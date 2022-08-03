import React, {FC, Component,useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import {getPastContainers} from '../../actions/containerActions';
import AddImagesButton from '../Images/AddImagesButton';
import ShowImages from '../Images/ShowImages';
import Container from './Container';
import PageNavBar from '../../common/Pagination/PageNavBar';
import isEmpty from '../../helpers/isEmpty';

import {SET_PAST_CONTAINERS} from '../../actions/types';
import calculateMaxPage from '../../helpers/calculateMaxPage';
import ContainerReactions from './ContainerReactions';
import NoTourResult from './NoTourResult';
import Spinner from '../../common/Spinner';

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
        return <Spinner size={4}/>
    }else{
        if(pastContainers.total === 0){
            return <NoTourResult />
        }else{
            return (
                <div className="d-flex flex-column h-100">
                    <div className='align-self-stretch p-2 overflow-auto'>
                        {!isEmpty(pastContainers)?pastContainers.data.map((c:any, index:any) => {
                            return (
                                <>
                                    <Container container={c}  index={index} disabled={true} />
                                </>
                            )
                        }):<></>}
                    </div>
                    <div className='mt-auto p-2'>
                        <PageNavBar passedFc={handleSearch} currentPage={currentPage} maxPage={calculateMaxPage(pastContainers.total,pastContainers.limit)} />
                    </div>
                </div>
            )
        }
    }
};

const mapStateToProps = (state:any)=>({
    pastContainers: state.container.pastContainers
});

export default connect(mapStateToProps, {getPastContainers})(PastContainers);