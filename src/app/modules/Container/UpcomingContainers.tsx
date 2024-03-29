import {FC, useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import {getUpcomingContainers} from '../../actions/containerActions';
import Container from './Container';
import PageNavBar from '../../common/Pagination/PageNavBar';
import isEmpty from '../../helpers/isEmpty';
import calculateMaxPage from '../../helpers/calculateMaxPage';

import {SET_UPCOMING_CONTAINERS} from '../../actions/types';
import NoTourResult from './NoTourResult';
import Spinner from '../../common/Spinner';

type Props = {
    upcomingContainers:any,
    getUpcomingContainers:any
};

const UpcomingContainers: FC<Props> = ({upcomingContainers,getUpcomingContainers}) => {
    const dispatch = useDispatch();
    const [currentPage, setCurrentPage] = useState(1);

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
        return <Spinner size={4}/>
    }else{
        if(upcomingContainers.total === 0){
            return <NoTourResult />
        }else{
            return (
                <div className="d-flex flex-column h-100">
                    <div className='align-self-stretch p-2 overflow-auto'>
                        {!isEmpty(upcomingContainers)?upcomingContainers.data.map((c:any, index:any) => {
                            return (
                                <div>
                                    <Container container={c} index={index} disabled={false} />                                    
                                </div>
                            )
                        }):<></>}
                    </div>
                    <div className='mt-auto p-2'>
                        <PageNavBar passedFc={handleSearch} currentPage={currentPage} maxPage={calculateMaxPage(upcomingContainers.total,upcomingContainers.limit)} />
                    </div>
                </div>
            )
        }
    }
};

const mapStateToProps = (state:any)=>({
    upcomingContainers: state.container.upcomingContainers
});

export default connect(mapStateToProps, {getUpcomingContainers})(UpcomingContainers);