import Button from './Button';

const componentRegistry = {
  Button: {
    component: Button,
    name: 'Button',
    propTypes: Button.propTypes,
    defaultProps: Button.defaultProps,
  },
};

export default componentRegistry;
