import { useNavigate, useParams } from 'react-router-dom';
import ContainerPage from '../modules/Container/ContainerPage';

/*export const withRouter = (Component:any) => {
  const Wrapper = (props:any) => {
    const navigate = useNavigate();
    const params = useParams();
    
    return (
      <Container
        navigate={navigate}
        params={params}
        {...props}
        />
    );
  };
  
  return Wrapper;
};*/

/*export const WrappedContainer = (props:any) => {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <ContainerPage navigate={navigate} params={params} {...props} />
  );
}*/