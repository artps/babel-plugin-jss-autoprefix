'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var style = {
  fontSize: '14px',
  borderWidth: '1px',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  userSelect: 'none',
  display: '-webkit-box',
  display: '-webkit-flex',
  display: '-ms-flexbox',
  display: 'flex'
};
var activeStyle = _extends({}, style, {
  background: '#000'
});

React.createElement(
  'button',
  { style: [foo, {
      background: ''
    }] },
  'Button'
);