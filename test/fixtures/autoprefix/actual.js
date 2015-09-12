const style = autoprefix({
  fontSize: 14,
  borderWidth: 1,
  userSelect: 'none'
});
const activeStyle = autoprefix({
  ...style,
  ...{ background: '' }
});

<button style={[foo, autoprefix({
  ...style,
  ...{ background: '' }
})]}>Button</button>;
