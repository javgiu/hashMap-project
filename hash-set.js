class HashSet {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.actualLoad = 0;
    this.buckets = Array.from({ length: capacity }, () => []);
  }

  hash(key) {
    let bucket = 0;
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      bucket = Math.abs(hashCode) % this.capacity;
    }
    return { hashCode, bucket };
  }

  set(key) {
    const position = this.hash(key).bucket;
    if (position < 0 || position >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    const bucket = this.buckets[position];
    // Check for coincidences
    if (!bucket.includes(key)) {
      bucket.push(key);
      this.updateLoadLevels();
      this.expandBuckets();
    }
  }

  has(key) {
    const position = this.hash(key).bucket;
    return this.buckets[position].includes(key);
  }

  remove(key) {
    const position = this.hash(key).bucket;
    const bucket = this.buckets[position];
    const index = bucket.indexOf(key);
    if (index !== -1) {
      bucket.splice(index, 1);
      this.updateLoadLevels();
    }
  }

  length() {
    let count = 0;
    this.buckets.forEach((bucket) => {
      count += bucket.length;
    });
    return count;
  }

  clear() {
    this.buckets.forEach((bucket) => (bucket.length = 0));
    this.updateLoadLevels();
  }

  entries() {
    return this.buckets.flat();
  }

  updateLoadLevels() {
    this.actualLoad = this.length() / this.capacity;
  }

  expandBuckets() {
    if (this.actualLoad > this.loadFactor) {
      this.capacity *= 2;
      const oldEntries = this.entries();
      this.buckets = Array.from({ length: this.capacity }, () => []);
      oldEntries.forEach((key) => this.set(key));
      this.updateLoadLevels();
    }
  }
}

const mySet = new HashSet();

mySet.set("apple");
mySet.set("banana");
mySet.set("orange");

console.log(mySet.has("banana")); // true
console.log(mySet.has("grape")); // false

mySet.remove("banana");
console.log(mySet.has("banana")); // false

console.log(mySet.entries()); // ["apple", "orange"]
console.log(mySet.length()); // 2
console.log(mySet.buckets);
