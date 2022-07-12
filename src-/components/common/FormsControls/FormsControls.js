import React from 'react';
import styles from './FormsControls.module.css'
import {Field} from "react-final-form";
// import {required} from "../../../utils/validate/validator";

const FormControl = ({input, meta: {touched,error}, elType, ...props}) => {
    let hasError = touched && error;
    // console.log(props)
    return (
        <div className={styles.formControls + " " + (hasError && styles.error)}>

            <div>
                {React.createElement(elType, {/*type:'file', */...input, ...props})}
            </div>
            {hasError && <span> {error}</span>}
        </div>
    )
}

/*

React.createElement(
    "input", {
        className: "rating-input", type: "radio", name: "rate", value: "1", ref: "rating", onChange: this.handleChange
    }
),
*/


export const Textarea = (props) => { // деструктуризація, REST-оператор
    return <FormControl {...props} elType='textarea' />
}
export const CheckBox = (props) => { // деструктуризація, REST-оператор
    return <FormControl {...props} elType='input' type='CheckBox' />
}
export const Radio = (props) => { // деструктуризація, REST-оператор
    return <FormControl {...props} elType='input' type='radio'/>
}
/*
export const Textarea = (props) => { // деструктуризація, REST-оператор
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}>
        <textarea {...input} {...restProps}/>
    </FormControl>
}*/
/*
export const Input = (props) => { // деструктуризація, REST-оператор
    const {input, meta, ...restProps} = props;
    return <FormControl {...props}>
        <input {...input} {...restProps}/>
    </FormControl>
}*/

export const Input = (props) => { // деструктуризація, REST-оператор
    //const {input, meta, ...restProps} = props;
    return <FormControl {...props} elType='input'/>
}
export const Hidden = (props) => { // деструктуризація, REST-оператор
    //const {input, meta, ...restProps} = props;
    return <FormControl {...props} elType='input' type='hidden' />
}
export const FileUpload = (props) => { // деструктуризація, REST-оператор
    //const {input, meta, ...restProps} = props;
    return <FormControl {...props} elType='input' type='file'/>
}


export const createMyField = (placeholder,component,name, props = {}, text = '',before = 0) =>
    (
        <div>
            <label>
                {before === 1 && text}
            <Field
                placeholder={placeholder}
                component={component}
                name={name}
                // validate={validators}
                {...props}
            /> {before === 0 && text}
            </label>
        </div>
    )

