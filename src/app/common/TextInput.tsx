import {FC} from 'react'
import classnames from 'classnames'

type Props = {
    name:any;       
    value:any;       
    error:any;       
    type:any;
    onChange:any;
    classNamesInherited?:any;
    placeholder?:any;
    label?:any;
    disabled?:any;
    info?:any;
}

const TextInput: FC<Props> = ({
        name,       
        value,       
        error,       
        type,
        onChange,
        placeholder,
        label,
        disabled,
        info,
        classNamesInherited
    }) => (
        <div className="form-group mb-2">
            <input 
            type={type} 
            className={classnames(`form-control form-control-lg shadow ${classNamesInherited}`,{"is-invalid":error})} 
            placeholder={placeholder}
            value={value} 
            onChange={onChange}
            name={name} 
            disabled={disabled}/>
            {info && <small className='form-text text-muted'>{info}</small>}
            {error && (<div className='invalid-feedback'>{error}</div>)}
        </div>
)


export default TextInput;