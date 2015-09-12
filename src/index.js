import Browsers from 'autoprefixer/lib/browsers';
import Prefixes from 'autoprefixer/lib/prefixes';
import PrefixesData from 'autoprefixer/data/prefixes';

import hyphenateStyleName from 'react/lib/hyphenateStyleName';
import camelizeStyleName from 'react/lib/camelizeStyleName';

import { agents } from 'caniuse-db/data';

const options = { browsers: 'last 2 versions' };

const browsers = new Browsers(agents, options.browsers, {});
const prefixes = new Prefixes(PrefixesData, browsers, options);


export default function ({Plugin, types: t}) {
  function isProperty(prop) {
    return prop.type === 'Property';
  }

  function cloneWithName(prop, nextName) {
    return t.property(
      'init',
      t.identifier(nextName),
      t.literal(prop.value.value)
    );
  }

  function addPrefix(prop) {
    const hyphenatedName = hyphenateStyleName(prop.key.name);
    return (
      prefixes.add[hyphenatedName] || { prefixes: [] }
    ).prefixes
     .map((key) => camelizeStyleName(key + hyphenatedName))
     .filter((key) => !!key)
     .map((key) => cloneWithName(prop, key))
  }

  function process(props) {
    return props.reduce((acc, prop) => {
      acc.push(prop);
      if(isProperty(prop)) {
        acc.push(...addPrefix(prop));
      }
      return acc;
    }, []);
  }

  return new Plugin('jss-autoprefix', {
    visitor: {
      CallExpression: {
        exit(node) {
          if(node.callee.name !== 'autoprefix') {
            return;
          }

          var obj = node.arguments[0];

          return t.objectExpression(process(obj.properties));
        }
      }
    }
  });
}

