import React, {FC, Component,useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import {getUpcomingContainers} from '../../actions/containerActions';
import AddImagesButton from '../Images/AddImagesButton';
import ShowImages from '../Images/ShowImages';
import Container from './Container';
import PageNavBar from '../../common/Pagination/PageNavBar';
import isEmpty from '../../helpers/isEmpty';
import calculateMaxPage from '../../helpers/calculateMaxPage';

import {SET_UPCOMING_CONTAINERS} from '../../actions/types';

type Props = {
    upcomingContainers:any,
    getUpcomingContainers:any
};

const UpcomingContainers: FC<Props> = ({upcomingContainers,getUpcomingContainers}) => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

    //2 is the limit, change it
    useEffect(() => {
        //console.log("UpcomingContainers")
        getUpcomingContainers((currentPage-1)*5,currentPage, 5);

        return () => {
            dispatch({
                type: SET_UPCOMING_CONTAINERS,
                payload: {}
            })
        }
    },[])

    const handleSearch = (page:number) => {
        setCurrentPage(page);
    
        getUpcomingContainers((page-1)*5,page, 5)
    }

    if(isEmpty(upcomingContainers)){
        return <div>Loading...</div>
    }else{
        if(upcomingContainers.total === 0){
            return <div>No result</div>
        }else{
            return (
                <>
                    {!isEmpty(upcomingContainers)?upcomingContainers.data.map((c:any) => {
                        return <Container container={c} />
                    }):<></>}
                    <PageNavBar passedFc={handleSearch} currentPage={currentPage} maxPage={calculateMaxPage(upcomingContainers.total,upcomingContainers.limit)} />
                </>
            )
        }
    }
};

const mapStateToProps = (state:any)=>({
    upcomingContainers: state.container.upcomingContainers
});

export default connect(mapStateToProps, {getUpcomingContainers})(UpcomingContainers);