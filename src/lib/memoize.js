export default function memoise(fn) {
  let cache;

  return function() {
    if (cache) {
      return cache;
    } else {
      cache = fn(...arguments);
      return cache;
    }
  }
}
