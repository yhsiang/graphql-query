/* @flow */
function parseCondition(name:string, query: Object): string {
  if (!query[name]) { return name; }
  const indicator = query[name];
  const fields = Object.keys(indicator);

  const result = fields.map( field => {
    const conditions = Object.keys(indicator[field]);
    return conditions.map( condition => {
      switch (condition) {
        case '$eq':
          return `${field}: ${indicator[field][condition]}`;
      }
    });
  }).reduce( (acc, cur) => acc.concat(cur), []);

  return `${name}(${result.join(',')})`;
}

export default function generator(obj: Object, query: Object): string {
  let name = Object.keys(obj).reduce(acc => acc);

  if (Object.prototype.toString.call(obj[name]) === '[object Array]') {
    obj[name] = obj[name].reduce(acc => acc);
  }

  const fields = Object.keys(obj[name]);
  const output = fields.map( field => {
    if (typeof obj[name][field] === 'object') {
      let data = {};
      data[field] = obj[name][field];
      return generator(data, query)
        .split('\n')
        .map(it => '  ' + it)
        .join('\n');
    }
    return '  ' + field;
  }).join('\n');

  if (typeof obj[name] === 'object') {
    if (query) {
      name = parseCondition(name, query);
    }
    return `${name} {\n${output}\n}`;
  }

  return `{ ${name} }`;
}
