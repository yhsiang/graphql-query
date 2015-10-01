/* @flow */
export default function generator(obj: Object): string {
  const name = Object.keys(obj).reduce(acc => acc);
  if (Object.prototype.toString.call(obj[name]) === '[object Array]') {
    obj[name] = obj[name].reduce(acc => acc);
  }

  const fields = Object.keys(obj[name]);
  const output = fields.map( field => {
    if (typeof obj[name][field] === 'object') {
      let data = {};
      data[field] = obj[name][field];
      return generator(data)
        .split('\n')
        .map(it => '  ' + it)
        .join('\n');
    }
    return '  ' + field;
  }).join('\n');

  if (typeof obj[name] === 'object') {
    return `${name} {\n${output}\n}`;
  }

  return `{ ${name} }`;
}
