import React from 'react';
import PropTypes from 'prop-types';
import { Button as MuiButton } from '@mui/material';

const Button = ({ variant, color, children }) => {
  return (
    <MuiButton variant={variant} color={color}>
      {children}
    </MuiButton>
  );
};

Button.propTypes = {
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
  color: PropTypes.oneOf(['primary', 'secondary', 'success', 'error']),
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  variant: 'contained',
  color: 'primary',
};

export default Button;
