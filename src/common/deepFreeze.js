// -----------------------------------------------------------------------------
// deepFreeze -- deeply (includes nested) freezes objects, Maps and Sets.
// -----------------------------------------------------------------------------

function deepFreeze(obj) {
  if (obj instanceof Map) {
    obj.clear = obj.delete = obj.set = function () {
      throw new Error('map is read-only');
    };
  } else if (obj instanceof Set) {
    obj.add = obj.clear = obj.delete = function () {
      throw new Error('set is read-only');
    };
  }

  // Freeze self
  Object.freeze(obj);

  Reflect.ownKeys(obj).forEach((propName) => {
    const prop = obj[propName];

    // Freeze prop if it is an object
    if (typeof prop === 'object' && !Object.isFrozen(prop)) {
      deepFreeze(prop);
    }
  });

  return obj;
}

export default deepFreeze;
