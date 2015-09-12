import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

import hyphenateStyleName from 'react/lib/hyphenateStyleName';
import camelizeStyleName from 'react/lib/camelizeStyleName';


export default function ({Plugin, types: t}) {
  const processor = postcss([
    autoprefixer({ browsers: 'last 4 versions' })
  ])

  function isProperty({ type }) {
    return type === 'Property';
  }

  function isSpreadProperty({ type, argument }) {
    return (
      type === 'SpreadProperty' &&
      argument.type === 'ObjectExpression'
    );
  }

  function isTarget(node) {
    return node.callee.name === 'autoprefix';
  }

  function propToDecl({ key, value }) {
    return postcss.decl({
      prop: hyphenateStyleName(key.name),
      value: value.value
    });
  }

  function declToProp(decl) {
    return t.property(
      'init',
      t.identifier(camelizeStyleName(decl.prop)),
      t.literal(decl.value)
    );
  }

  function process(props) {
    return props
      .map((prop) => {
        if(isProperty(prop)) {
          return processor.process(propToDecl(prop)).sync().root.nodes.map(declToProp);
        }

        if(isSpreadProperty(prop)) {
          return process(prop.argument.properties);
        }

        return prop;
      })
      .reduce((acc, props) => (acc.concat(props)), []);
  }

  return new Plugin('jss-autoprefix', {
    visitor: {
      CallExpression: {
        exit(node) {
          if(!isTarget(node)) {
            return;
          }

          return t.objectExpression(process(node.arguments[0].properties));
        }
      }
    }
  });
}

