const save = (key, value, state) => {
  try {
    if (state[key] !== value) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (err) {
    throw new Error();
  }
};
const get = (key) => {
  try {
    const items = localStorage.getItem(key);
    return items ? JSON.parse(items) : null;
  } catch (err) {
    throw new Error();
  }
};
export default {
  save,
  get,
};
