const style = autoprefix({
  fontSize: '14px',
  borderWidth: '1px',
  userSelect: 'none'
});
const activeStyle = autoprefix({
  ...style,
  ...{
    background: '#000'
  }
});

<button style={[foo, autoprefix({ background: '' })]}>Button</button>;
