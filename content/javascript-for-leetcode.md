---
date: 2025-11-23
title: 'JavaScript for LeetCode'
description: 'A reference of various functions, operations, and patterns common to LeetCode style interviews.'
---

# {{ $doc.title }}

{{ $doc.description }}

For better or worse, LeetCode style interviews are prevalant in today's hiring processes for software development. It is of course hotly contested and endlessly bikeshedded whether these types of interview problems genuinely reflect the realpolitik of the day-to-day skills required to be a successful code author.

While there are countless resources out there for solving and gaining intuition about Data Structures and Algorithms, this is meant to be a much simpler reference for common JavaScript tools you will use during these types of exercises. Hopefully you find this useful as a refresher, a cheatsheet, or even as prep material for an upcoming exam.

## Table of Contents

- [Strings](#strings)
- [Numbers](#numbers)
- [Arrays](#arrays)
- [Objects](#objects)
- [Sets](#sets)
- [Maps](#maps)
- [Math](#math)
- [Promises](#promises)
- [Fetch API](#fetch-api)
- [TypeScript Types](#typescript-types)

## Strings

### [String.prototype.split() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)

Splits string into array.

```ts
const sentence = 'hello world';
const words = sentence.split(' ');
// ['hello', 'world']

const chars = 'abc'.split('');
// ['a', 'b', 'c']
```

### [String.prototype.substring() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/substring)

Extracts characters between two indices.

```ts
const str = 'hello';
const sub = str.substring(1, 4);
// "ell"
```

### [String.prototype.slice() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/slice)

Extracts a section of string (supports negative indices).

```ts
const str = 'hello';
const end = str.slice(-2);
// "lo"

const middle = str.slice(1, 4);
// "ell"
```

### [String.prototype.charAt() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charAt)

Returns character at index.

```ts
const str = 'hello';
const char = str.charAt(1);
// "e"
```

### [String.prototype.charCodeAt() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/charCodeAt)

Returns Unicode value at index.

```ts
const str = 'abc';
const code = str.charCodeAt(0);
// 97
```

### [String.fromCharCode() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/fromCharCode)

Creates string from Unicode values.

```ts
const str = String.fromCharCode(97, 98, 99);
// "abc"
```

### [String.prototype.toLowerCase() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase)

Converts to lowercase.

```ts
const str = 'HELLO';
const lower = str.toLowerCase();
// "hello"
```

### [String.prototype.toUpperCase() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toUpperCase)

Converts to uppercase.

```ts
const str = 'hello';
const upper = str.toUpperCase();
// "HELLO"
```

### [String.prototype.trim() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)

Removes whitespace from both ends.

```ts
const str = '  hello  ';
const trimmed = str.trim();
// "hello"
```

### [String.prototype.padStart() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padStart)

Pads string at the start.

```ts
const num = '5';
const padded = num.padStart(3, '0');
// "005"
```

### [String.prototype.padEnd() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/padEnd)

Pads string at the end.

```ts
const num = '5';
const padded = num.padEnd(3, '0');
// "500"
```

### [String.prototype.repeat() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/repeat)

Repeats string n times.

```ts
const str = 'ab';
const repeated = str.repeat(3);
// "ababab"
```

### [String.prototype.replace() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replace)

Replaces first match.

```ts
const str = 'hello world';
const replaced = str.replace('world', 'there');
// "hello there"
```

### [String.prototype.replaceAll() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/replaceAll)

Replaces all matches.

```ts
const str = 'foo bar foo';
const replaced = str.replaceAll('foo', 'baz');
// "baz bar baz"
```

### [String.prototype.startsWith() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith)

Checks if string starts with substring.

```ts
const str = 'hello world';
const starts = str.startsWith('hello');
// true
```

### [String.prototype.endsWith() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith)

Checks if string ends with substring.

```ts
const str = 'hello world';
const ends = str.endsWith('world');
// true
```

### [String.prototype.includes() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)

Checks if string contains substring.

```ts
const str = 'hello world';
const has = str.includes('wo');
// true
```

### [String.prototype.indexOf() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf)

Returns index of first occurrence.

```ts
const str = 'hello';
const index = str.indexOf('l');
// 2
```

### [String.prototype.lastIndexOf() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/lastIndexOf)

Returns index of last occurrence.

```ts
const str = 'hello';
const lastIndex = str.lastIndexOf('l');
// 3
```

### [String.prototype.match() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match)

Matches against a regular expression.

```ts
const str = 'test123test456';
const matches = str.match(/\d+/g);
// ['123', '456']
```
## Numbers

### [parseInt() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt)

Parses string to integer.

```ts
const num = parseInt('42');
// 42

const hex = parseInt('ff', 16);
// 255

const partial = parseInt('42px');
// 42
```

### [parseFloat() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseFloat)

Parses string to float.

```ts
const num = parseFloat('3.14');
// 3.14

const partial = parseFloat('3.14px');
// 3.14
```

### [Number.isInteger() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isInteger)

Checks if value is an integer.

```ts
Number.isInteger(42);
// true

Number.isInteger(42.5);
// false
```

### [Number.isNaN() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isNaN)

Checks if value is NaN.

```ts
Number.isNaN(NaN);
// true

Number.isNaN(42);
// false
```

### [Number.prototype.toFixed() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)

Formats number to fixed decimal places.

```ts
const num = 3.14159;
const fixed = num.toFixed(2);
// "3.14"
```

### [Number.MAX_SAFE_INTEGER 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER)

Largest safe integer (2^53 - 1).

```ts
const max = Number.MAX_SAFE_INTEGER;
// 9007199254740991
```

### [Number.MIN_SAFE_INTEGER 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MIN_SAFE_INTEGER)

Smallest safe integer (-(2^53 - 1)).

```ts
const min = Number.MIN_SAFE_INTEGER;
// -9007199254740991
```

## Arrays

### [Array.prototype.map() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

Transforms each element and returns a new array.

```ts
const nums = [1, 2, 3];
const doubled = nums.map(n => n * 2);
// [2, 4, 6]
```

### [Array.prototype.filter() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

Creates a new array with elements that pass the test.

```ts
const nums = [1, 2, 3, 4, 5];
const evens = nums.filter(n => n % 2 === 0);
// [2, 4]
```

### [Array.prototype.reduce() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce)

Reduces array to a single value by applying a function.

```ts
const nums = [1, 2, 3, 4];
const sum = nums.reduce((acc, n) => acc + n, 0);
// 10

// Group by property
const items = [{ type: 'fruit', name: 'apple' }, { type: 'veg', name: 'carrot' }];
const grouped = items.reduce((acc, item) => {
  acc[item.type] = acc[item.type] || [];
  acc[item.type].push(item.name);
  return acc;
}, {});
// { fruit: ['apple'], veg: ['carrot'] }
```

### [Array.prototype.forEach() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)

Executes a function for each element (no return value).

```ts
const nums = [1, 2, 3];
nums.forEach(n => console.log(n * 2));
// Logs: 2, 4, 6
```

### [Array.prototype.find() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

Returns the first element that satisfies the condition.

```ts
const nums = [1, 2, 3, 4];
const firstEven = nums.find(n => n % 2 === 0);
// 2
```

### [Array.prototype.findIndex() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

Returns the index of the first element that satisfies the condition.

```ts
const nums = [1, 2, 3, 4];
const index = nums.findIndex(n => n > 2);
// 2
```

### [Array.prototype.some() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some)

Tests whether at least one element passes the test.

```ts
const nums = [1, 2, 3];
const hasEven = nums.some(n => n % 2 === 0);
// true
```

### [Array.prototype.every() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

Tests whether all elements pass the test.

```ts
const nums = [2, 4, 6];
const allEven = nums.every(n => n % 2 === 0);
// true
```

### [Array.prototype.sort() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)

Sorts array in place (mutates original).

```ts
const nums = [3, 1, 4, 2];
nums.sort((a, b) => a - b);
// [1, 2, 3, 4]

// Sort strings
const words = ['banana', 'apple', 'cherry'];
words.sort();
// ['apple', 'banana', 'cherry']

// Sort objects
const items = [{ age: 30 }, { age: 20 }, { age: 25 }];
items.sort((a, b) => a.age - b.age);
// [{ age: 20 }, { age: 25 }, { age: 30 }]
```

### [Array.prototype.reverse() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reverse)

Reverses array in place (mutates original).

```ts
const nums = [1, 2, 3];
nums.reverse();
// [3, 2, 1]
```

### [Array.prototype.slice() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)

Returns a shallow copy of a portion of an array.

```ts
const nums = [1, 2, 3, 4, 5];
const middle = nums.slice(1, 4);
// [2, 3, 4]

const lastTwo = nums.slice(-2);
// [4, 5]
```

### [Array.prototype.splice() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)

Changes contents by removing or replacing elements (mutates original).

```ts
const nums = [1, 2, 3, 4, 5];
nums.splice(2, 1); // Remove 1 element at index 2
// nums is now [1, 2, 4, 5]

const letters = ['a', 'b', 'c'];
letters.splice(1, 1, 'x', 'y'); // Replace 1 element with 2
// letters is now ['a', 'x', 'y', 'c']
```

### [Array.prototype.push() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

Adds elements to the end (mutates original).

```ts
const nums = [1, 2];
nums.push(3, 4);
// nums is now [1, 2, 3, 4]
```

### [Array.prototype.pop() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)

Removes and returns the last element (mutates original).

```ts
const nums = [1, 2, 3];
const last = nums.pop();
// last is 3, nums is now [1, 2]
```

### [Array.prototype.shift() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)

Removes and returns the first element (mutates original).

```ts
const nums = [1, 2, 3];
const first = nums.shift();
// first is 1, nums is now [2, 3]
```

### [Array.prototype.unshift() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)

Adds elements to the beginning (mutates original).

```ts
const nums = [2, 3];
nums.unshift(0, 1);
// nums is now [0, 1, 2, 3]
```

### [Array.prototype.concat() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)

Merges arrays into a new array.

```ts
const arr1 = [1, 2];
const arr2 = [3, 4];
const merged = arr1.concat(arr2);
// [1, 2, 3, 4]
```

### [Array.prototype.join() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)

Joins all elements into a string.

```ts
const words = ['Hello', 'World'];
const sentence = words.join(' ');
// "Hello World"

const nums = [1, 2, 3];
const csv = nums.join(',');
// "1,2,3"
```

### [Array.prototype.includes() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes)

Checks if array contains a value.

```ts
const nums = [1, 2, 3];
const hasTwo = nums.includes(2);
// true

const hasFive = nums.includes(5);
// false
```

### [Array.prototype.indexOf() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

Returns the first index of a value, or -1 if not found.

```ts
const nums = [1, 2, 3, 2];
const index = nums.indexOf(2);
// 1

const notFound = nums.indexOf(5);
// -1
```

### [Array.prototype.lastIndexOf() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/lastIndexOf)

Returns the last index of a value, or -1 if not found.

```ts
const nums = [1, 2, 3, 2];
const lastIndex = nums.lastIndexOf(2);
// 3
```

### [Array.prototype.flat() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flat)

Flattens nested arrays.

```ts
const nested = [1, [2, 3], [4, [5]]];
const flat = nested.flat();
// [1, 2, 3, 4, [5]]

const deepFlat = nested.flat(2);
// [1, 2, 3, 4, 5]

const fullyFlat = nested.flat(Infinity);
// [1, 2, 3, 4, 5]
```

### [Array.prototype.flatMap() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/flatMap)

Maps and flattens in one step.

```ts
const words = ['hello world', 'foo bar'];
const allWords = words.flatMap(s => s.split(' '));
// ['hello', 'world', 'foo', 'bar']
```

### [Array.from() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from)

Creates array from iterable or array-like object.

```ts
// From string
const chars = Array.from('abc');
// ['a', 'b', 'c']

// From Set
const nums = Array.from(new Set([1, 2, 2, 3]));
// [1, 2, 3]

// With mapping function
const doubled = Array.from([1, 2, 3], x => x * 2);
// [2, 4, 6]

// Create range
const range = Array.from({ length: 5 }, (_, i) => i);
// [0, 1, 2, 3, 4]
```

### [Array.isArray() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray)

Checks if value is an array.

```ts
Array.isArray([1, 2, 3]);
// true

Array.isArray('string');
// false
```

### [Spread Operator 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

Expands array elements.

```ts
const arr1 = [1, 2];
const arr2 = [3, 4];
const combined = [...arr1, ...arr2];
// [1, 2, 3, 4]

// Copy array
const original = [1, 2, 3];
const copy = [...original];
// [1, 2, 3]

// Use with Math
const nums = [1, 5, 3];
const max = Math.max(...nums);
// 5
```
## Objects

### [Object.keys() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)

Returns array of object's keys.

```ts
const obj = { a: 1, b: 2, c: 3 };
const keys = Object.keys(obj);
// ['a', 'b', 'c']
```

### [Object.values() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values)

Returns array of object's values.

```ts
const obj = { a: 1, b: 2, c: 3 };
const values = Object.values(obj);
// [1, 2, 3]
```

### [Object.entries() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries)

Returns array of [key, value] pairs.

```ts
const obj = { a: 1, b: 2 };
const entries = Object.entries(obj);
// [['a', 1], ['b', 2]]

// Common pattern: iterate over object
for (const [key, value] of Object.entries(obj)) {
  console.log(`${key}: ${value}`);
}
```

### [Object.fromEntries() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/fromEntries)

Creates object from entries.

```ts
const entries = [['a', 1], ['b', 2]];
const obj = Object.fromEntries(entries);
// { a: 1, b: 2 }

// Common pattern: transform object
const original = { a: 1, b: 2 };
const doubled = Object.fromEntries(
  Object.entries(original).map(([k, v]) => [k, v * 2])
);
// { a: 2, b: 4 }
```

### [Object.assign() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign)

Copies properties from source to target.

```ts
const target = { a: 1 };
const source = { b: 2, c: 3 };
Object.assign(target, source);
// target is now { a: 1, b: 2, c: 3 }

// Clone object (shallow)
const original = { a: 1, b: 2 };
const clone = Object.assign({}, original);
// { a: 1, b: 2 }
```

### [Object.hasOwn() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwn)

Checks if object has own property.

```ts
const obj = { a: 1 };
const has = Object.hasOwn(obj, 'a');
// true

const missing = Object.hasOwn(obj, 'b');
// false
```

### [Spread Operator 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

Copies object properties.

```ts
const obj1 = { a: 1, b: 2 };
const obj2 = { c: 3 };
const merged = { ...obj1, ...obj2 };
// { a: 1, b: 2, c: 3 }

// Override properties
const updated = { ...obj1, b: 99 };
// { a: 1, b: 99 }
```

### [Destructuring 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

Extracts object properties.

```ts
const obj = { a: 1, b: 2, c: 3 };
const { a, b } = obj;
// a is 1, b is 2

// With defaults
const { x = 10, y = 20 } = {};
// x is 10, y is 20

// Rename
const { a: alpha, b: beta } = obj;
// alpha is 1, beta is 2
```
## Sets

### [new Set() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/Set)

Creates a set of unique values.

```ts
const set = new Set([1, 2, 2, 3]);
// Set { 1, 2, 3 }

// Remove duplicates from array
const arr = [1, 2, 2, 3];
const unique = [...new Set(arr)];
// [1, 2, 3]
```

### [Set.prototype.add() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/add)

Adds value to set.

```ts
const set = new Set([1, 2]);
set.add(3);
// Set { 1, 2, 3 }

set.add(2); // No effect, already exists
// Set { 1, 2, 3 }
```

### [Set.prototype.has() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/has)

Checks if set contains value.

```ts
const set = new Set([1, 2, 3]);
const hasTwo = set.has(2);
// true

const hasFive = set.has(5);
// false
```

### [Set.prototype.delete() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/delete)

Removes value from set.

```ts
const set = new Set([1, 2, 3]);
set.delete(2);
// Set { 1, 3 }
```

### [Set.prototype.clear() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/clear)

Removes all values from set.

```ts
const set = new Set([1, 2, 3]);
set.clear();
// Set {}
```

### [Set.prototype.size 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/size)

Returns number of values in set.

```ts
const set = new Set([1, 2, 3]);
const size = set.size;
// 3
```

### [Set.prototype.forEach() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set/forEach)

Executes function for each value.

```ts
const set = new Set([1, 2, 3]);
set.forEach(value => console.log(value * 2));
// Logs: 2, 4, 6
```

### [Set Iteration 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)

Iterate over set values.

```ts
const set = new Set(['a', 'b', 'c']);

// for...of
for (const value of set) {
  console.log(value);
}
// Logs: 'a', 'b', 'c'

// Convert to array
const arr = [...set];
// ['a', 'b', 'c']
```

## Maps

### [new Map() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/Map)

Creates a map of key-value pairs.

```ts
const map = new Map([
  ['a', 1],
  ['b', 2]
]);
// Map { 'a' => 1, 'b' => 2 }
```

### [Map.prototype.set() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/set)

Adds or updates key-value pair.

```ts
const map = new Map();
map.set('a', 1);
map.set('b', 2);
// Map { 'a' => 1, 'b' => 2 }
```

### [Map.prototype.get() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/get)

Gets value for key.

```ts
const map = new Map([['a', 1], ['b', 2]]);
const value = map.get('a');
// 1

const missing = map.get('c');
// undefined
```

### [Map.prototype.has() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/has)

Checks if map has key.

```ts
const map = new Map([['a', 1]]);
const hasA = map.has('a');
// true

const hasB = map.has('b');
// false
```

### [Map.prototype.delete() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete)

Removes key-value pair.

```ts
const map = new Map([['a', 1], ['b', 2]]);
map.delete('a');
// Map { 'b' => 2 }
```

### [Map.prototype.clear() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear)

Removes all key-value pairs.

```ts
const map = new Map([['a', 1], ['b', 2]]);
map.clear();
// Map {}
```

### [Map.prototype.size 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/size)

Returns number of key-value pairs.

```ts
const map = new Map([['a', 1], ['b', 2]]);
const size = map.size;
// 2
```

### [Map.prototype.keys() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys)

Returns iterator of keys.

```ts
const map = new Map([['a', 1], ['b', 2]]);
const keys = [...map.keys()];
// ['a', 'b']
```

### [Map.prototype.values() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values)

Returns iterator of values.

```ts
const map = new Map([['a', 1], ['b', 2]]);
const values = [...map.values()];
// [1, 2]
```

### [Map.prototype.entries() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/entries)

Returns iterator of [key, value] pairs.

```ts
const map = new Map([['a', 1], ['b', 2]]);
const entries = [...map.entries()];
// [['a', 1], ['b', 2]]
```

### [Map Iteration 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)

Iterate over map entries.

```ts
const map = new Map([['a', 1], ['b', 2]]);

// for...of
for (const [key, value] of map) {
  console.log(`${key}: ${value}`);
}
// Logs: 'a: 1', 'b: 2'

// forEach
map.forEach((value, key) => {
  console.log(`${key}: ${value}`);
});
```
## Math

### [Math.max() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max)

Returns largest of numbers.

```ts
const max = Math.max(1, 5, 3);
// 5

// With array (use spread)
const nums = [1, 5, 3];
const maxNum = Math.max(...nums);
// 5
```

### [Math.min() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min)

Returns smallest of numbers.

```ts
const min = Math.min(1, 5, 3);
// 1

// With array (use spread)
const nums = [1, 5, 3];
const minNum = Math.min(...nums);
// 1
```

### [Math.abs() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs)

Returns absolute value.

```ts
const abs = Math.abs(-5);
// 5
```

### [Math.floor() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)

Rounds down to nearest integer.

```ts
const floored = Math.floor(4.7);
// 4

const negative = Math.floor(-4.3);
// -5
```

### [Math.ceil() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil)

Rounds up to nearest integer.

```ts
const ceiled = Math.ceil(4.3);
// 5

const negative = Math.ceil(-4.7);
// -4
```

### [Math.round() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round)

Rounds to nearest integer.

```ts
const rounded = Math.round(4.5);
// 5

const down = Math.round(4.4);
// 4
```

### [Math.pow() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/pow)

Returns base to exponent power.

```ts
const power = Math.pow(2, 3);
// 8

// Alternative: exponentiation operator
const same = 2 ** 3;
// 8
```

### [Math.sqrt() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt)

Returns square root.

```ts
const sqrt = Math.sqrt(16);
// 4
```

### [Math.random() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random)

Returns random number between 0 (inclusive) and 1 (exclusive).

```ts
const rand = Math.random();
// e.g., 0.7234

// Random integer between 0 and max (exclusive)
const randomInt = Math.floor(Math.random() * 10);
// e.g., 7 (between 0-9)

// Random integer between min and max (inclusive)
const min = 5;
const max = 10;
const randRange = Math.floor(Math.random() * (max - min + 1)) + min;
// e.g., 7 (between 5-10)
```

### [Math.sign() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign)

Returns sign of number (-1, 0, or 1).

```ts
Math.sign(5);    // 1
Math.sign(-5);   // -1
Math.sign(0);    // 0
```

### [Math.trunc() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc)

Returns integer part by removing decimals.

```ts
const truncated = Math.trunc(4.7);
// 4

const negative = Math.trunc(-4.7);
// -4
```

### [Modulus Operator 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder)

Returns remainder of division.

```ts
const remainder = 7 % 3;
// 1

// Check even/odd
const isEven = 4 % 2 === 0;
// true

// Cycle through indices
const cyclicIndex = (index + 1) % array.length;
```
## Promises

### [new Promise() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/Promise)

Creates a new promise.

```ts
const promise = new Promise<number>((resolve, reject) => {
  setTimeout(() => {
    resolve(42);
  }, 1000);
});

promise.then(value => console.log(value));
// After 1 second, logs: 42
```

### [Promise.prototype.then() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then)

Handles promise resolution.

```ts
const promise = Promise.resolve(5);

promise
  .then(x => x * 2)
  .then(x => x + 1)
  .then(result => console.log(result));
// Logs: 11
```

### [Promise.prototype.catch() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch)

Handles promise rejection.

```ts
const promise = Promise.reject(new Error('Failed'));

promise
  .then(value => console.log(value))
  .catch(error => console.error(error.message));
// Logs: "Failed"
```

### [Promise.prototype.finally() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/finally)

Runs regardless of promise outcome.

```ts
const promise = fetch('/api/data');

promise
  .then(response => response.json())
  .catch(error => console.error(error))
  .finally(() => console.log('Done'));
// Always logs: "Done"
```

### [Promise.all() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)

Waits for all promises to resolve.

```ts
const promises = [
  Promise.resolve(1),
  Promise.resolve(2),
  Promise.resolve(3)
];

const results = await Promise.all(promises);
// [1, 2, 3]

// If any reject, entire Promise.all rejects
const mixed = [
  Promise.resolve(1),
  Promise.reject(new Error('Failed')),
  Promise.resolve(3)
];

try {
  await Promise.all(mixed);
} catch (error) {
  console.error(error.message);
  // Logs: "Failed"
}
```

### [Promise.allSettled() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled)

Waits for all promises to settle (resolve or reject).

```ts
const promises = [
  Promise.resolve(1),
  Promise.reject(new Error('Failed')),
  Promise.resolve(3)
];

const results = await Promise.allSettled(promises);
// [
//   { status: 'fulfilled', value: 1 },
//   { status: 'rejected', reason: Error: Failed },
//   { status: 'fulfilled', value: 3 }
// ]
```

### [Promise.race() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/race)

Returns first promise to settle.

```ts
const slow = new Promise(resolve => setTimeout(() => resolve('slow'), 1000));
const fast = new Promise(resolve => setTimeout(() => resolve('fast'), 100));

const result = await Promise.race([slow, fast]);
// "fast"
```

### [Promise.any() 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any)

Returns first promise to fulfill.

```ts
const promises = [
  Promise.reject(new Error('Error 1')),
  Promise.resolve('Success'),
  Promise.reject(new Error('Error 2'))
];

const result = await Promise.any(promises);
// "Success"
```

### [async/await 🌐](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)

Syntactic sugar for promises.

```ts
async function fetchUser(id: number) {
  try {
    const response = await fetch(`/api/users/${id}`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw error;
  }
}

// Use it
const user = await fetchUser(123);
```

## Fetch API

### [fetch() 🌐](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

Makes HTTP requests.

```ts
// GET request
const response = await fetch('https://api.example.com/data');
const data = await response.json();
// { id: 1, name: 'Example' }

// Check status
if (!response.ok) {
  throw new Error(`HTTP error! status: ${response.status}`);
}
```

### [POST Request 🌐](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

Sends data to server.

```ts
const response = await fetch('https://api.example.com/users', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    name: 'John',
    email: 'john@example.com'
  })
});

const created = await response.json();
// { id: 42, name: 'John', email: 'john@example.com' }
```

### [Response Methods 🌐](https://developer.mozilla.org/en-US/docs/Web/API/Response)

Parse response body.

```ts
const response = await fetch('/api/data');

// JSON
const jsonData = await response.json();

// Text
const textData = await response.text();

// Blob (files, images)
const blobData = await response.blob();

// FormData
const formData = await response.formData();

// ArrayBuffer (binary data)
const buffer = await response.arrayBuffer();
```

### [Request Headers 🌐](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

Set custom headers.

```ts
const response = await fetch('https://api.example.com/protected', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer token123',
    'Accept': 'application/json',
    'X-Custom-Header': 'value'
  }
});
```

### [Abort Requests 🌐](https://developer.mozilla.org/en-US/docs/Web/API/AbortController)

Cancel ongoing requests.

```ts
const controller = new AbortController();
const signal = controller.signal;

// Start request
const promise = fetch('https://api.example.com/slow', { signal });

// Cancel after 5 seconds
setTimeout(() => controller.abort(), 5000);

try {
  const response = await promise;
} catch (error) {
  if (error.name === 'AbortError') {
    console.log('Request was cancelled');
  }
}
```

### [Error Handling 🌐](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

Handle network and HTTP errors.

```ts
async function fetchWithError(url: string) {
  try {
    const response = await fetch(url);

    // fetch only rejects on network errors
    // Check HTTP status manually
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      // Network error
      console.error('Network error:', error);
    } else {
      // HTTP error or other
      console.error('Error:', error);
    }
    throw error;
  }
}
```

## TypeScript Types

### [Array Types 🌐](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#arrays)

Define array types.

```ts
const nums: number[] = [1, 2, 3];
const strs: Array<string> = ['a', 'b', 'c'];

// Tuple (fixed length and types)
const tuple: [string, number] = ['age', 25];

// Read-only array
const readOnly: readonly number[] = [1, 2, 3];
// readOnly.push(4); // Error
```

### [Object Types 🌐](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#object-types)

Define object shapes.

```ts
interface User {
  id: number;
  name: string;
  email?: string; // Optional
  readonly created: Date; // Read-only
}

const user: User = {
  id: 1,
  name: 'John',
  created: new Date()
};

// Type alias
type Point = {
  x: number;
  y: number;
};
```

### [Union Types 🌐](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types)

Value can be one of several types.

```ts
type Status = 'pending' | 'approved' | 'rejected';

function setStatus(status: Status) {
  // ...
}

setStatus('pending'); // OK
// setStatus('invalid'); // Error

// Union of different types
type Result = number | string;
const value: Result = 42;
const text: Result = 'hello';
```

### [Type Guards 🌐](https://www.typescriptlang.org/docs/handbook/2/narrowing.html)

Narrow types at runtime.

```ts
function process(value: string | number) {
  if (typeof value === 'string') {
    return value.toUpperCase();
  } else {
    return value * 2;
  }
}

// Array type guard
if (Array.isArray(value)) {
  value.map(x => x * 2);
}
```

### [Generics 🌐](https://www.typescriptlang.org/docs/handbook/2/generics.html)

Create reusable type-safe components.

```ts
function identity<T>(arg: T): T {
  return arg;
}

const num = identity<number>(42);
const str = identity<string>('hello');

// Generic interface
interface Box<T> {
  value: T;
}

const numBox: Box<number> = { value: 42 };
const strBox: Box<string> = { value: 'hello' };
```

