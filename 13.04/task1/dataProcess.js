function toCamelCase(obj) {
  const newObj = {};

  for (let key in obj) {
    const camelKey = key.replace(/_([a-z])/g, (_, letter) =>
      letter.toUpperCase()
    );
    newObj[camelKey] = obj[key];
  }

  return newObj;
}

module.exports = toCamelCase;