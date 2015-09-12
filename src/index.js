import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

import hyphenateStyleName from 'react/lib/hyphenateStyleName';
import camelizeStyleName from 'react/lib/camelizeStyleName';


function isProperty({ type }) {
  return type === 'Property';
}

function isSpreadProperty({ type, argument }) {
  return (
    type === 'SpreadProperty' &&
    argument.type === 'ObjectExpression'
  );
}

function propToDecl({ key, value }) {
  return postcss.decl({
    prop: hyphenateStyleName(key.name),
    value: value.value
  });
}

function declToProp(types, { prop, value }) {
  return types.property(
    'init',
    types.identifier(camelizeStyleName(prop)),
    types.literal(value)
  );
}

function process(processor, types, props) {
  return props
    .map((prop) => {
      if(isProperty(prop)) {
        return processor.process(propToDecl(prop))
                        .sync().root.nodes
                        .map((prop) => declToProp(types, prop));
      }

      if(isSpreadProperty(prop)) {
        return process(processor, types, prop.argument.properties);
      }

      return prop;
    })
    .reduce((acc, props) => (acc.concat(props)), []);
}


export default function ({ Plugin, types }) {
  return new Plugin('jss-autoprefix', {
    visitor: {
      CallExpression: {
        exit(node, parent, scope, file) {
          const opts = file.opts.extra['jss-autoprefix'] || {};

          const target = opts.target || 'autoprefix';
          const browsers = opts.browsers || autoprefixer.defaults;

          if(node.callee.name !== target) {
            return;
          }

          const props = node.arguments[0].properties;
          const processor = postcss([
            autoprefixer({ browsers })
          ]);

          return types.objectExpression(process(processor, types, props));
        }
      }
    }
  });
}

