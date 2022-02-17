import {FC} from 'react';

type Props = {
    something:any
}

const FuncComp: FC<Props> = ({something}) => {
    return (
    <>
        {something}
    </>
    )
}


export default FuncComp;