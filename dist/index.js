'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var ANONYMOUS = 'ANONYMOUS';

function createChainableTypeChecker(validate) {
  function checkType(isRequired, props, propName) {
    var componentName = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : ANONYMOUS;

    if (!props[propName]) {
      if (isRequired) {
        return new Error('Required `' + propName + '` was not specified in `' + componentName + '`.');
      }
      return null;
    }
    return validate(props, propName, componentName);
  }

  var chainedCheckType = checkType.bind(null, false);
  chainedCheckType.isRequired = checkType.bind(null, true);

  return chainedCheckType;
}

function hashmapProptype(shapeValidator) {
  if (!shapeValidator) {
    throw new Error('hashmapProptype must be called with a shape validator.');
  }

  function validator(props, propName) {
    var componentName = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : ANONYMOUS;

    var value = props[propName];
    if (value) {
      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) !== 'object') {
        return new Error(propName + ' hashmap should be an object in ' + componentName);
      }

      var hashmapValues = Object.values(value);

      var propTypes = {
        hashmapValues: _propTypes2.default.arrayOf(shapeValidator)
      };
      var _props = {
        hashmapValues: hashmapValues
      };

      _propTypes2.default.checkPropTypes(propTypes, _props, propName, componentName);
    }

    return null;
  }

  return createChainableTypeChecker(validator);
}

exports.default = hashmapProptype;