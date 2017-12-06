//ES6
function deepClone(obj, hash = new WeakMap()) {
    if (Object(obj) !== obj) return obj; // primitives
    if (hash.has(obj)) return hash.get(obj); // cyclic reference
    const result = obj instanceof Date ? new Date(obj)
                 : obj instanceof RegExp ? new RegExp(obj.source, obj.flags)
                 : obj.constructor ? new obj.constructor()
                 : Object.create(null);
    hash.set(obj, result);
    if (obj instanceof Map)
        Array.from(obj, ([key, val]) => result.set(key, deepClone(val, hash)) );
    return Object.assign(result, ...Object.keys(obj).map (
        key => ({ [key]: deepClone(obj[key], hash) }) ));
}

// Sample data
var p = {
  data: 1,
  children: [{
    data: 2,
    parent: null
  }]
};
p.children[0].parent = p;

var q = deepClone(p);

console.log(q.children[0].parent.data); // 1

//纯数据

var cloned = JSON.parse(JSON.stringify(objectToClone));
