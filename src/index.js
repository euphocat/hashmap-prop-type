import PropTypes from 'prop-types';

const ANONYMOUS = 'ANONYMOUS';

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName, componentName = ANONYMOUS) {
    if (!props[propName]) {
      if (isRequired) {
        return new Error(
          `Required \`${propName}\` was not specified in \`${componentName}\`.`,
        );
      }
      return null;
    }
    return validate(props, propName, componentName);
  }

  const chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

function hashmapProptype(shapeValidator) {
  if (!shapeValidator) {
    throw new Error('hashmapProptype must be called with a shape validator.');
  }

  function validator(props, propName, componentName = ANONYMOUS) {
    const value = props[propName];
    if (value) {
      if (typeof value !== 'object') {
        return new Error(`${propName} hashmap should be an object in ${componentName}`);
      }

      const hashmapValues = Object.values(value);

      const propTypes = {
        hashmapValues: PropTypes.arrayOf(shapeValidator),
      };
      const props = {
        hashmapValues,
      };


      PropTypes.checkPropTypes(propTypes, props, propName, componentName);
    }

    return null;
  }

  return createChainableTypeChecker(validator);
}

export default hashmapProptype;
