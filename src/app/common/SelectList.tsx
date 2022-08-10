import {FC} from 'react'
import classnames from 'classnames'

type Props = {
    name:any,       
    value:any,       
    error:any,
    onChange:any,
    options:any,
    placeholder?:any,
    info?:any
}

const SelectList: FC<Props> = ({
        name,       
        value,       
        error,
        onChange,
        options,
        placeholder,
        info
    }) => {
    const selectOptions = options.map((option:any) => (
        <option key={option.name} value={option.value} >
            {option.name}
        </option>
    ));
    return (
        <div className="form-group">
            <select 
            className={classnames("form-control form-control-lg",{"is-invalid":error})} 
            value={value} 
            onChange={onChange}
            name={name} >
                {selectOptions}
            </select>
            {info && <small className='form-text text-muted'>{info}</small>}
            {error && (<div className='invalid-feedback'>{error}</div>)}
        </div>
    )
}


export default SelectList;