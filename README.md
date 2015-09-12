# babel-plugin-jss-autoprefix

The Babel plugin as a layer on top of postcss and autoprefixer that adds vendor prefixes to your jsx inline styles.

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

## Installation

Install plugin:
```
npm install --save-dev babel-plugin-jss-autoprefix
```

Add to your `.babelrc`:

```
{
  "stage": 0,
  "plugins": [
    "jss-autoprefix"
  ],
  "extra": {
    "jss-autoprefix": {
      // default: `autoprefix`
      "target": "customFunctionName",
      // default: see `autoprefixer.defaults`
      "browsers": ["> 1%", "last 2 versions", "ie >= 9"]
    }
  }
}
```

## License

MIT
