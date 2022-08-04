import React, {FC} from 'react'
import classnames from 'classnames'

type Props = {
    name:any,   
    maxlength:any,    
    value:any,       
    error:any,
    onChange:any,
    classNamesInherited?:any;
    placeholder?:any,
    info?:any
}

const TextArea: FC<Props> = ({
        name,
        maxlength,       
        value,       
        error,
        onChange,
        placeholder,
        info,
        classNamesInherited
    }) => (
        <div className="form-group mb-2">
            <textarea 
            rows={5}
            maxLength={maxlength}
            className={classnames(`form-control form-control-lg shadow ${classNamesInherited}`,{"is-invalid":error})} 
            placeholder={placeholder}
            value={value} 
            onChange={onChange}
            name={name} />
            {info && <small className='form-text text-muted'>{info}</small>}
            {error && (<div className='invalid-feedback'>{error}</div>)}
        </div>
)


export default TextArea;