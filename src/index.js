import postcss from 'postcss';
import autoprefixer from 'autoprefixer';

import hyphenateStyleName from 'react/lib/hyphenateStyleName';
import camelizeStyleName from 'react/lib/camelizeStyleName';


function isProperty({ type }) {
  return type === 'Property';
}

function isLiteral({ value }) {
  return value.type === 'Literal';
}

function isObjectExpression({ value }) {
  return value.type === 'ObjectExpression';
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
  let result = [];

  for(let key in props) {
    let prop = props[key];

    if(isProperty(prop) && isObjectExpression(prop)) {
      const nextProp = {...prop};
      nextProp.value.properties = process(processor, types, nextProp.value.properties);
      result.push(nextProp);

      continue;
    }

    if(isProperty(prop) && isLiteral(prop)) {
      let prefixed = processor.process(propToDecl(prop))
        .sync().root.nodes.map((prop) => {
          return declToProp(types, prop)
        }).reduce((acc, prop) => {
          acc[prop.key.name] = acc[prop.key.name]
                             ? acc[prop.key.name].concat(prop) : [prop];
          return acc;
        }, {});

      result = result.concat(...Object.keys(prefixed).reduce((acc, key) => {
        return acc.concat(declToProp(types, {
          prop: key,
          value: prefixed[key].map((prop) => prop.value.value)
                              .join(`;${prop.key.name}:`)
        }));
      }, []));

      continue;
    }

    if(isSpreadProperty(prop)) {
      result = result.concat(...process(processor, types, prop.argument.properties));
      continue;
    }

    result.push(prop);
  }

  return result;
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

