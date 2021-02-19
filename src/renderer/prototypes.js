export default function initPrototype() {
  Array.prototype.removeOnce = function (value) {
    let index = this.indexOf(value);
    if (index > -1) {
      this.splice(index, 1);
    }
    return this;
  };

  Array.prototype.pushAndReturn = function (value) {
    this.push(value);
    return this;
  };

  Storage.prototype.setObject = function (key, value) {
    this.setItem(key, JSON.stringify(value));
  };

  Storage.prototype.getObject = function (key, validator = null) {
    let value = this.getItem(key);
    let parsedObject = JSON.parse(value);
    if (typeof validator === "function") return validator(parsedObject);
    return parsedObject;
  };
}
