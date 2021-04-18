"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeDeepRight = mergeDeepRight;
exports.deepRenameKey = deepRenameKey;
exports.deepRenameKey_ = deepRenameKey_;

function isObject(item) {
  return item != null && typeof item === 'object' && !Array.isArray(item);
}

function mergeDeepRight(obj1, obj2) {
  if (isObject(obj1) && isObject(obj2)) {
    const result = {};

    for (const key2 in obj2) {
      const val1 = obj1[key2];
      const val2 = obj2[key2];
      result[key2] = mergeDeepRight(val1, val2);
    }

    for (const key1 in obj1) {
      if (!(key1 in result)) result[key1] = obj1[key1];
    }

    return result;
  }

  return obj2;
}

function deepRenameValue(oldKey, newKey, v) {
  if (Array.isArray(v)) return v.map(x => deepRenameValue(oldKey, newKey, x));
  if (typeof v === 'object' && v !== null) return deepRenameKey(oldKey, newKey, v);
  return v;
}
/** Immutable. Functions in the object are not supported */


function deepRenameKey(oldKey, newKey, obj) {
  const newObj = {};

  for (const [k, v] of Object.entries(obj)) newObj[k === oldKey ? newKey : k] = deepRenameValue(oldKey, newKey, v);

  return newObj;
}
/** Mutable (changes the `obj` object) */


function deepRenameKey_(oldKey, newKey, obj) {
  const stack = [];
  stack.push(obj);

  while (stack.length !== 0) {
    const obj = stack.pop();

    if (oldKey in obj && !Array.isArray(obj)) {
      obj[newKey] = obj[oldKey];
      delete obj[oldKey];
    }

    for (const v of Object.values(obj)) {
      if (typeof v === 'object' && v !== null) // `v` is read-only here, but we want to mutate it
        // $FlowIgnore[incompatible-call]
        stack.push(v);
    }
  }

  return obj;
}