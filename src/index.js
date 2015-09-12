import Browsers from 'autoprefixer/lib/browsers';
import Prefixes from 'autoprefixer/lib/prefixes';
import PrefixesData from 'autoprefixer/data/prefixes';

import hyphenateStyleName from 'react/lib/hyphenateStyleName';
import camelizeStyleName from 'react/lib/camelizeStyleName';

import { agents } from 'caniuse-db/data';

const options = { browsers: 'last 2 versions' };

const browsers = new Browsers(agents, options.browsers, {});
const prefixes = new Prefixes(PrefixesData, browsers, options);


function process(key) {
  const newKey = hyphenateStyleName(key);
  const foo = prefixes.add[newKey] || { prefixes: []};

  return foo.prefixes.map((prefixKey) => (
    camelizeStyleName(prefixKey + newKey)
  )).filter((key) => !!key);
}

export default function ({Plugin, types: t}) {
  return new Plugin('jss-autoprefix', {
    visitor: {
      CallExpression: {
        exit(node, parent, scope) {
          if(node.callee.name !== 'autoprefix') {
            return;
          }

          var obj = node.arguments[0];
          var props = obj.properties;

          props.forEach((prop) => {
            if(prop.type === 'Property') {
              process(prop.key.name).forEach((newName) => {
                props.push(t.property(
                  'init',
                  t.identifier(newName),
                  t.literal(prop.value.value)
                ));
              });
            }
          });

          return t.objectExpression(props);
        }
      }
    }
  });
}

