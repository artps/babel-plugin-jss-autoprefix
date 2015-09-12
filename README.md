# Proof of concept. WIP

## babel-plugin-jss-autoprefix

Babel plugin to add vendor prefixes to your jsx inline styles. Uses `autoprefixer`.

## Example

```javascript
const styles = autoprefix({
  userSelect: 'none'
});
```

Result:

```javascript
var styles = {
  userSelect: 'none',
  WebkitUserSelect: 'none',
  MozUserSelect: 'none',
  msUserSelect: 'none'
};
```

You can find more in `test` directory.

## TODO

Currently plugin adds prefixes only to, say, "basic keys". It will support values, media-queries, etc.
