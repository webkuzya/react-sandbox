import React from 'react';
import cn from "utils/utils";
import PropTypes from 'prop-types'

const Button = props => {
    return (
        <button className={cn({btn: true, ['btn-'+props.variant]: props.variant})} onClick={props.onClick}>
            {props.children}
        </button>
    );
}

Button.propTypes = {
    variant: PropTypes.oneOf(['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark', 'link']),
    onClick: PropTypes.func,
}

export default Button;
