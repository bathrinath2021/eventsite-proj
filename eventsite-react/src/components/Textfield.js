import React from 'react';
import { useField } from 'formik';

export function TextData ({label, ...props}){
    const[field] = useField(props);
    return(
        <div className='mb-2'>
            <label htmlFor={field.name}>{label}</label>
            <input className={`form-control shadow-none`} autoComplete='off' {...field} {...props} />
            {/* <ErrorMessage component='div' name={field.name} className='error' /> */}
        </div>
    )
}