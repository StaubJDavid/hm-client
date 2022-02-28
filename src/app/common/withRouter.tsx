import { useNavigate, useParams } from 'react-router-dom';
import Container from '../modules/Container/Container';

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

export const WrappedContainer = (props:any) => {
  const navigate = useNavigate();
  const params = useParams();

  return (
    <Container navigate={navigate} params={params} {...props} />
  );
}