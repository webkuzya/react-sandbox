import React from 'react';
import PropTypes from 'prop-types';
import cn from 'utils/utils'

function Input(props) {
    const id = `input-${Math.round(Math.random() * 1e9)}-id`

    return (
        <>
            {props.label &&
            <label htmlFor={id} className="form-label">{props.label}</label>}

            <input
                type={props.type || 'text'}
                value={props.value}
                id={id}
                className={cn({
                    'form-control': true,
                    'form-control-lg': props.size === 'lg',
                    'form-control-sm': props.size === 'sm'
                })}
                placeholder={props.placeholder}
                disabled={props.disabled}
                onChange={props.onChange}
            />

            {props.help &&
            <div className="form-text">{props.help}</div>}
        </>
    );
}

Input.propTypes = {
    label: PropTypes.string,
    type: PropTypes.oneOf(['text', 'password', 'email']).isRequired,
    placeholder: PropTypes.string,
    value: PropTypes.string,
    disabled: PropTypes.bool,
    size: PropTypes.oneOf(['sm', 'lg']),
    help: PropTypes.string,
    onChange: PropTypes.func.isRequired
}

export default Input;