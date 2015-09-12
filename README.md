# Proof of concept. WIP

## babel-plugin-jss-autoprefix

Babel plugin to add vendor prefixes to your jsx inline styles. Uses `autoprefixer`.

## Example

```javascript
const styles = autoprefix({
  userSelect: 'none',
  display: 'flex'
});
```

Result:

```javascript
var styles = {
  userSelect: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none',
  display: '-webkit-box',
  display: '-webkit-flex',
  display: '-ms-flexbox',
  display: 'flex'
};
```

You can find more in `test` directory.
