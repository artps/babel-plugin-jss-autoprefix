const style = autoprefix({
  fontSize: '14px',
  borderWidth: '1px',
  userSelect: 'none',
  display: 'flex',
  ':hover': {
    display: 'block'
  }
});

const activeStyle = autoprefix({
  ...style,
  ...{
    ...style,
    ...{
      background: '#000'
    }
  }
});

<button style={[foo, autoprefix({ background: '' })]}>Button</button>;
