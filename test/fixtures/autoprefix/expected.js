'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var style = {
  fontSize: 14,
  borderWidth: 1,
  userSelect: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none'
};
var activeStyle = _extends({}, style, { background: '' });

React.createElement(
  'button',
  { style: [foo, _extends({}, style, { background: '' })] },
  'Button'
);