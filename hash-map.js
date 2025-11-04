class HashMap {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.actualLoad = 0;
    this.buckets = [];

    for (let i = 0; i < capacity; i++) {
      this.buckets.push([]);
    }
  }

  hash(key) {
    let bucket = 0;
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      bucket = hashCode % this.capacity;
    }
    return { hashCode, bucket };
  }

  set(key, value) {
    const position = this.hash(key).bucket;
    if (position < 0 || position >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }
    const bucket = this.buckets[position];
    // Check for coincidences
    const coincidence = bucket.find((pair) => pair[0] === key);
    if (coincidence) {
      coincidence[1] = value;
      return;
    } else {
      bucket.push([key, value]);
      this.updateLoadLevels();
      this.expandBuckets();
    }
  }

  get(key) {
    let value = null;
    this.buckets.forEach((bucket) => {
      const pair = bucket.find((pair) => pair[0] === key);
      if (pair) {
        value = pair[1];
      }
    });
    return value;
  }

  has(key) {
    const bucketWithKey = this.buckets.find((bucket) =>
      bucket.find((pair) => pair[0] === key)
    );
    if (bucketWithKey) {
      return true;
    } else {
      return false;
    }
  }

  remove(key) {
    if (!this.has(key)) {
      return;
    }
    const bucket = this.buckets.find((bucket) =>
      bucket.find((pair) => pair[0] === key)
    );
    const index = bucket.findIndex((pair) => pair[0] === key);
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

  keys() {
    const keys = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((pair) => {
        keys.push(pair[0]);
      });
    });
    return keys;
  }

  values() {
    const values = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((pair) => {
        values.push(pair[1]);
      });
    });
    return values;
  }

  entries() {
    const entries = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((pair) => {
        entries.push(pair);
      });
    });
    return entries;
  }

  updateLoadLevels() {
    this.actualLoad = this.length() / this.capacity;
  }

  expandBuckets() {
    if (this.actualLoad > this.loadFactor) {
      this.capacity *= 2;
      const oldEntries = this.entries();
      this.buckets = Array.from({ length: this.capacity }, () => []);
      oldEntries.forEach(([key, value]) => this.set(key, value));
      this.updateLoadLevels();
    }
  }
}

const test = new HashMap();
test.set("apple", "red");
test.set("banana", "yellow");
test.set("carrot", "orange");
test.set("dog", "brown");
test.set("elephant", "gray");
test.set("frog", "green");
test.set("grape", "purple");
test.set("hat", "black");
test.set("ice cream", "white");
test.set("jacket", "blue");
test.set("kite", "pink");
test.set("lion", "golden");
test.set("moon", "silver");
test.set("moon", "gold");
test.remove("elephant");

console.log(test.buckets);

class HashSet {
  constructor(capacity = 16, loadFactor = 0.75) {
    this.loadFactor = loadFactor;
    this.capacity = capacity;
    this.actualLoad = 0;
    this.buckets = [];

    for (let i = 0; i < capacity; i++) {
      this.buckets.push([]);
    }
  }

  hash(key) {
    let bucket = 0;
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
      bucket = hashCode % this.capacity;
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
    const coincidence = bucket.find((keyInBucket) => keyInBucket === key);
    if (coincidence) {
      coincidence = key;
      return;
    } else {
      bucket.push(key);
      this.updateLoadLevels();
      this.expandBuckets();
    }
  }

  get(key) {
    let returnedKey = null;
    this.buckets.forEach((bucket) => {
      const keyInBucket = bucket.find((keyInBucket) => keyInBucket === key);
      if (keyInBucket) {
        returnedKey = keyInBucket;
      }
    });
    return returnedKey;
  }

  has(key) {
    const bucketWithKey = this.buckets.find((bucket) =>
      bucket.find((keyInBucket) => keyInBucket === key)
    );
    if (bucketWithKey) {
      return true;
    } else {
      return false;
    }
  }

  remove(key) {
    if (!this.has(key)) {
      return;
    }
    const bucket = this.buckets.find((bucket) =>
      bucket.find((keyInBucket) => keyInBucket === key)
    );
    const index = bucket.indexOf((keyInBucket) => keyInBucket === 1);
    bucket.splice(index, 1);
    this.updateLoadLevels();
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
    const entries = [];
    this.buckets.forEach((bucket) => {
      bucket.forEach((keyInBucket) => {
        entries.push(keyInBucket);
      });
    });
    return entries;
  }

  updateLoadLevels() {
    this.actualLoad = this.length() / this.capacity;
  }

  expandBuckets() {
    if (this.actualLoad > this.loadFactor) {
      this.capacity = this.capacity * 2;
      const bucketsNumber = this.buckets.length;
      for (let i = 0; i < this.capacity - bucketsNumber; i++) {
        this.buckets.push([]);
      }
      this.updateLoadLevels();
    } else return;
  }
}
