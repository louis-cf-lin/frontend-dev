# TypeScript Handbook Notes

## Everyday Types

- Primitives: `string`, `number`, `boolean`
- Array types: `number[]`, `string[]`, etc.
- Type annotation on variables:

```typescript
  let myName: string = "Alice";
  // No type annotation needed -- 'myName' inferred as type 'string'
  let myName = "Alice";
```

### Functions

- Parameter type annotations:

```typescript
  // Parameter type annotation
  function greet(name: string) {
    console.log("Hello, " + name.toUpperCase() + "!!");
  }

  // Would be a runtime error if executed!
  greet(42)
```

- Return type annotations:

```typescript
  function getFavoriteNumber(): number {
    return 26;
  }
```

- Anonymous functions (and *context typing*):

```typescript
  // No type annotations here, but TypeScript can spot the bug
  const names = ["Alice", "Bob", "Eve"];

  // Contextual typing for function
  names.forEach(function (s) {
    console.log(s.toUppercase());
    // Error: Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
  });

  // Contextual typing also applies to arrow functions
  names.forEach((s) => {
    console.log(s.toUppercase());
    // Error: Property 'toUppercase' does not exist on type 'string'. Did you mean 'toUpperCase'?
  });
```

### Object types

```typescript
  // The parameter's type annotation is an object type
  function printCoord(pt: { x: number; y: number }) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
  }
  printCoord({ x: 3, y: 7 });
```

- Optional properties (`?`):

```typescript
  function printName(obj: { first: string; last?: string }) {
    // ...
  }
  // Both OK
  printName({ first: "Bob" });
  printName({ first: "Alice", last: "Alisson" });
```

- Checking for `undefined`:

```typescript
  function printName(obj: { first: string; last?: string }) {
    // Error - might crash if 'obj.last' wasn't provided!
    console.log(obj.last.toUpperCase());
    // Object is possibly 'undefined'.

    if (obj.last !== undefined) {
      // OK
      console.log(obj.last.toUpperCase());
    }

    // A safe alternative using modern JavaScript syntax:
    console.log(obj.last?.toUpperCase());
  }
```

### Union types

```typescript
  function printId(id: number | string) {
    console.log("Your ID is: " + id);
  }
  // OK
  printId(101);
  // OK
  printId("202");
  // Error
  printId({ myID: 22342 });
```

- Working with union types:

```typescript
  function printId(id: number | string) {
    console.log(id.toUpperCase());
    // Error: Property 'toUpperCase' does not exist on type 'string | number'.
    // Error: Property 'toUpperCase' does not exist on type 'number'.
  }
```

- Solution is to *narrow* the union:

```typescript
  function printId(id: number | string) {
    if (typeof id === "string") {
      // In this branch, id is of type 'string'
      console.log(id.toUpperCase());
    } else {
      // Here, id is of type 'number'
      console.log(id);
    }
  }
```

- A *narrowing* example for arrays:

```typescript
  function welcomePeople(x: string[] | string) {
    if (Array.isArray(x)) {
      // Here: 'x' is 'string[]'
      console.log("Hello, " + x.join(" and "));
    } else {
      // Here: 'x' is 'string'
      console.log("Welcome lone traveler " + x);
    }
  }
```

- If every member in a union has a property in common, you can use that property without narrowing
- > It might be confusing that a union of types appears to have the intersection of those types’ properties. This is not an accident - the name union comes from type theory. The union `number | string` is composed by taking the union of the values from each type. Notice that given two sets with corresponding facts about each set, only the intersection of those facts applies to the union of the sets themselves. For example, if we had a room of tall people wearing hats, and another room of Spanish speakers wearings hats, after combining those rooms, the only thing we know about every person is that they must be wearing a hat.

### Type aliases

- Key-type pairs
- Capitalise custom types

```typescript
  type Point = {
    x: number;
    y: number;
  };

  // Exactly the same as the earlier example
  function printCoord(pt: Point) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
  }
  printCoord({ x: 100, y: 100 });

  // This also works
  type ID = number | string;
```

### Interfaces

```typescript
  interface Point {
    x: number;
    y: number;
  }
  function printCoord(pt: Point) {
    console.log("The coordinate's x value is " + pt.x);
    console.log("The coordinate's y value is " + pt.y);
  }
  printCoord({ x: 100, y: 100 });
```

- Interfaces vs type aliases
  - Extending an interface vs extending a type via intersections:

  ```typescript
    interface Animal {
      name: string
    }
    interface Bear extends Animal {
      honey: boolean
    }
    const bear = getBear() 
    bear.name
    bear.honey
  ```

  ```typescript
    type Animal = {
      name: string
    }
    type Bear = Animal & { 
      honey: Boolean 
    }
    const bear = getBear();
    bear.name;
    bear.honey;
  ```

  - Adding new fields to an existing interface. A type cannot be changed after being created:

  ```typescript
    interface Window {
      title: string
    }
    interface Window {
      ts: TypeScriptAPI
    }
    const src = 'const a = "Hello World"';
    window.ts.transpileModule(src, {});
  ```

  ```typescript
    type Window = {
      title: string
    }
    type Window = {
      ts: TypeScriptAPI
    }
    // Error: Duplicate identifier 'Window'.
  ```

### Type assertions (`as`)

- Explicitly set the type of a value and tell the compiler not to infer it (perhaps because we know more than TypeScript)
- Example:

```typescript
  const myCanvas = document.getElementById("main_canvas") as HTMLCanvasElement;
  // Also works
  const myCanvas = <HTMLCanvasElement> document.getElementById("main_canvas");
```

- TypeScript only allows type assertions which convert to a *more specific* or *less specific* version of a type. This rule prevents “impossible” coercions like:

```typescript
  const x = "hello" as number; // Error
```

- Sometimes this rule can be too conservative and will disallow more complex coercions that might be valid. If this happens, you can use two assertions, first to any (or unknown, which we’ll introduce later), then to the desired type:

```typescript
  const a = (expr as any) as T;
```

- Another example:

```typescript
  let employee = { };
  employee.name = "John"; // Error: Property 'name' does not exist on type '{}'
  employee.code = 123; // Error: Property 'code' does not exist on type '{}'

  interface Employee { 
    name: string; 
    code: number; 
  }
  let employee = <Employee> { }; 
  employee.name = "John"; // OK
  employee.code = 123; // OK
```

### Literal types (`const`)

```typescript
  let changingString = "Hello World";   // let changingString: string
  const constantString = "Hello World";   // const constantString: "Hello World"

  let x: "hello" = "hello";

  x = "hello"; // OK
  x = "howdy"; // Error: Type '"howdy"' is not assignable to type '"hello"'.
```

- Functions that accept a certain set of known values:

```typescript
  function printText(s: string, alignment: "left" | "right" | "center") {
    // ...
  }
  printText("Hello, world", "left");

  // Combining non-literal types
  interface Options {
    width: number;
  }
  function configure(x: Options | "auto") {
    // ...
  }
```

- Functions that return known values (this time with numbers):

```typescript
  function compare(a: string, b: string): -1 | 0 | 1 {
    return a === b ? 0 : a > b ? 1 : -1;
  }
```

- When you initialize a variable with an object, TypeScript assumes that the properties of that object might change values later:

```typescript
  const obj = { counter: 0 };
  if (someCondition) {
    obj.counter = 1; // OK
  }

  const req = { url: "https://example.com", method: "GET" };
  handleRequest(req.url, req.method);
  // Error: Argument of type 'string' is not assignable to parameter of type '"GET" | "POST"'.
  // i.e. req.method is inferred to have type 'string' but the second argument of handleRequest() only takes type '"GET" | "POST"'

  // Solution 1:
  const req = { url: "https://example.com", method: "GET" as "GET" }; // req.method is always "GET"
  // Solution 2:
  handleRequest(req.url, req.method as "GET"); // req.method must be "GET"
  // Solution 3:
  const req = { url: "https://example.com", method: "GET" } as const; // All properties are literal types
```

### `null` and `undefined`

- `strictNullCheck` - if on, need to test `null` and `undefined` before using methods or properties. Use *narrowing* to check for values that might be `null`:

```typescript
  function doSomething(x: string | undefined) {
    if (x === undefined) {
      // do nothing
    } else {
      console.log("Hello, " + x.toUpperCase());
    }
  }
```

- Non-null assertion operator (postfix !) - special syntax for removing `null` and `undefined` from a type without doing any explicit checking. Writing `!` after any expression is effectively a type assertion that the value isn’t `null` or `undefined`. Important to only use `!` when you know that the value can’t be `null` or `undefined`:

```typescript
  function liveDangerously(x?: number | undefined) {
    // No error
    console.log(x!.toFixed());
  }
```

## Narrowing

### `typeof` type guards

- Checking against the value returned by `typeof` is a **type guard**
- `typeof null` = `object`, raising an error:

```typescript
  function printAll(strs: string | string[] | null) {
    if (typeof strs === "object") {
      for (const s of strs) {
        // Error: Object is possibly 'null'.
        // 'strs' only narrowed down to 'string[] | null' instead of just 'string[]'
        console.log(s);
      }
    } else if (typeof strs === "string") {
      console.log(strs);
    } else {
      // do nothing
    }
  }
```

### Truthiness narrowing

- Values that coerce to false: `0`, `NaN`, `""`, `0n`, `null`, `undefined`
- TypeScript also uses `switch` statements and equality checks to narrow types:

```typescript
  function example(x: string | number, y: string | boolean) {
    if (x === y) {
    // We can now call any 'string' method on 'x' or 'y'.
      x.toUpperCase();
      // ^ = (method) String.toUpperCase(): string
      y.toLowerCase();
      // ^ = (method) String.toLowerCase(): string
    } else {
      console.log(x);
      // ^ = (parameter) x: string | number
      console.log(y);
      // ^ = (parameter) y: string | boolean
    }
  }
```

- `== null` checks for both `null` and `undefined`, and so does `== undefined`

### `instanceof` narrowing

- `instanceof` - a type guard; `x instanceof Foo` checks whether the *prototype chain* of `x` contains `Foo.prototype`

### Assignments

- TypeScript looks at the right side of the assignment and narrows the left side appropriately

```typescript
  let x = Math.random() < 0.5 ? 10 : "hello world!";
  // ^ = let x: string | number
```

### Type predicates

- User-defined type guards
- Define a function whose return type is a type predicate:

```typescript
function isFish(pet: Fish | Bird): pet is Fish {
  return (pet as Fish).swim !== undefined;
  // If pet.swim is not undefined, then pet is a Fish
  // Otherwise, it's a Bird
}
```

- If `isFish()` returns true, then `pet` is a `Fish` type, else `pet` is a `Bird`
- In general the function takes a single argument and returns a boolean which informs the type predicate

### Discriminated unions

```typescript
  interface Shape {
    kind: "circle" | "square";
    radius?: number; // ? - optional
    sideLength?: number;
  }

  function getArea(shape: Shape) {
    return Math.PI * shape.radius ** 2;
    // Error: Object is possibly 'undefined'.

    if (shape.kind === "circle") {
      return Math.PI * shape.radius ** 2;
      // Error: Object is possibly 'undefined'.
    }

    if (shape.kind === "circle") {
      return Math.PI * shape.radius! ** 2;
      // Works but not ideal
    }
  }
```

- Solution: use `kind` as a common property (the **discriminatory** property of `Shape`) to avoid using optional parameters:

```typescript
  interface Circle {
    kind: "circle";
    radius: number;
  }
  interface Square {
    kind: "square";
    sideLength: number;
  }
  type Shape = Circle | Square;

  function getArea(shape: Shape) {
    if (shape.kind === "circle") {
      return Math.PI * shape.radius ** 2;
    }
  }
  // or
  function getArea(shape: Shape) {
    switch (shape.kind) {
      case "circle":
        return Math.PI * shape.radius ** 2;
      case "square":
        return shape.sideLength ** 2;
    }
  }
```

### `never`

- `never` type - used for return states that will never occur, i.e. does not return or always throws and exception. Different from `void` for functions that do return but return nothing:

```typescript
  // Never returns
  function throwError(errorMsg: string): never { 
    throw new Error(errorMsg); 
  }

  // Returns with nothing
  function sayHi(): void { 
    console.log('Hi!')
  }
```

### Exhaustive checking

- Exhaustiveness checking using `never` (`never` type is assignable to every type, but no type is assignable to `never` except for `never` itself):

```typescript
  type Shape = Circle | Square;

  function getArea(shape: Shape) {
    switch (shape.kind) {
      case "circle":
        return Math.PI * shape.radius ** 2;
      case "square":
        return shape.sideLength ** 2;
      default:
        const _exhaustiveCheck: never = shape; // only OK if never = never
        return _exhaustiveCheck;
    }
  }

  interface Triangle {
    kind: "triangle";
    sideLength: number;
  }

  type Shape = Circle | Square | Triangle;

  function getArea(shape: Shape) {
    switch (shape.kind) {
      case "circle":
        return Math.PI * shape.radius ** 2;
      case "square":
        return shape.sideLength ** 2;
      default:
        const _exhaustiveCheck: never = shape;
        // Error: Type 'Triangle' is not assignable to type 'never'.
        // never = Triangle - not OK
        return _exhaustiveCheck;
    }
  }  
```

## More on Functions

### Function type expressions

```typescript
  function greeter(fn: (a: string) => void) {
    fn("Hello, World");
  }

  // Type alias for naming a function
  type GreetFunction = (a: string) => void;

  function greeter(fn: GreetFunction) {
    // ...
  }
```

### Call signatures

```typescript
  // Describe something callable with properties
  type DescribableFunction = {
    description: string;
    (arg1: number, arg2: number): boolean; // takes 2 numbers and returns a boolean
  };

  function doSomething(fn: DescribableFunction) {
    console.log(fn.description + " returned " + fn(6, 6));
  }
```

### Construct signatures

```typescript
  type SomeConstructor = {
    new (s: string): SomeObject;
  };
  function fn(ctor: SomeConstructor) {
    return new ctor("hello");
  }
```

### Generic functions

- Describe a correspondence between two values
- Create a link between the input and output

```typescript
  function firstElement<Type>(arr: Type[]): Type {
    return arr[0];
  }

  // s is of type 'string'
  const s = firstElement(["a", "b", "c"]);
  // n is of type 'number'
  const n = firstElement([1, 2, 3]);
```

- Multiple type parameters work too

```typescript
  function map<Input, Output>(arr: Input[], func: (arg: Input) => Output): Output[] {
    return arr.map(func);
  }

  // Parameter 'n' is of type 'string'
  // 'parsed' is of type 'number[]'
  const parsed = map(["1", "2", "3"], (n) => parseInt(n));
```

- **Constrain** a type parameter with an `extends` clause

```typescript
  function longest<Type extends { length: number }>(a: Type, b: Type) {
    if (a.length >= b.length) {
      return a;
    } else {
      return b;
    }
    // No error here because `a` and `b` must both have a `length` property
  }

  const longerArray = longest([1, 2], [1, 2, 3]); // OK
  const longerString = longest("alice", "bob"); // OK
  const notOK = longest(10, 100); // NOT OK
  // Error: Argument of type 'number' is not assignable to parameter of type '{ length: number; }'. 
```

- Specifying type arguments also works

```typescript
  function combine<Type>(arr1: Type[], arr2: Type[]): Type[] {
    return arr1.concat(arr2);
  }

  const arr = combine<string | number>([1, 2, 3], ["hello"]);
  // This allows different types to be passed in
```

- Guidelines for writing good generic functions

  - Push type parameters down - when possible, use the type parameter itself rather than constraining it

  ```typescript
    // This is better
    function firstElement1<Type>(arr: Type[]) {
      return arr[0];
    }

    function firstElement2<Type extends any[]>(arr: Type) {
      return arr[0];
    }
  ```

  - Use fewer type parameters

  ```typescript
    function filter1<Type>(arr: Type[], func: (arg: Type) => boolean): Type[] {
      return arr.filter(func);
    }

    // Not good, don't need `Func`
    function filter2<Type, Func extends (arg: Type) => boolean>(arr: Type[], func: Func
    ): Type[] {
      return arr.filter(func);
    }
  ```

  - Type parameters should appear twice - type parameters are for relating the types of multiple values. If a type parameter is only used once in the function signature, it’s not relating anything.

  ```typescript
    // Generic function not necessary (only used once here)
    function greet<Str extends string>(s: Str) {
      console.log("Hello, " + s);
    }

    function greet(s: string) {
      console.log("Hello, " + s);
    }
  ```

### Optional parameters

```typescript
  function f(x?: number) {
    // ...
  }
  f(); // OK
  f(10); // OK

  // Default value 10
  function f(x = 10) {
    // ...
  }

  declare function f(x?: number): void;
  f(undefined); // OK
```

- When writing a function type for a callback, never write an optional parameter unless you intend to call the function without passing that argument

### Function overloads

- Specify a function that can be called in different ways
- The implementation signature is not visible from the outside
- When writing an overloaded function, always have two or more signatures above the implementation
- Implementation signature must also be *compatible* with the overload signatures

```typescript
  function makeDate(timestamp: number): Date; // overload signature
  function makeDate(m: number, d: number, y: number): Date; // overload signature
  function makeDate(mOrTimestamp: number, d?: number, y?: number): Date { // implementation signature - CAN'T BE CALLED
    if (d !== undefined && y !== undefined) {
      return new Date(y, mOrTimestamp, d);
    } else {
      return new Date(mOrTimestamp);
    }
  }
  const d1 = makeDate(12345678); // OK
  const d2 = makeDate(5, 5, 5); // OK
  const d3 = makeDate(1, 3); // NOT OK
  // Error: No overload expects 2 arguments, but overloads do exist that expect either 1 or 3 arguments.
```

- Writing good overloads
  - Always prefer parameters with union types instead of overloads when possible

  ```typescript
    function len(s: string): number;
    function len(arr: any[]): number;
    function len(x: any) {
      return x.length;
    }

    len(""); // OK
    len([0]); // OK
    len(Math.random() > 0.5 ? "hello" : [0]); // NOT OK
    // ERROR: TypeScript can only resolve a function call to a single overload

    // Just use
    function len(x: any[] | string) {
      return x.length;
    }
  ```

  - Declaring `this` in a function

  ```typescript
    interface DB {
      filterUsers(filter: (this: User) => boolean): User[];
    }

    const db = getDB();
    const admins = db.filterUsers(function () {
      return this.isAdmin;
    });
  ```

### Other types to know about

- `void`
  - `void` type when a function does not have a `return` statement
  - `undefined` type when a function has a `return` statement but returns nothing
  - Returning nothing and not having a `return` is the same thing in JavaScript but TypeScript makes a distinction
  - `void` is the standard and usually inferred
- `unknown`
  - `unknown` is like `any`, but is safer because it’s not legal to do anything with an unknown value
  - If you're not sure what a value might be but you know what you want to do with it eventually
- `never`
  - Values which are never observed
  - Function throws an exception or terminates execution of the programme
  - Also when TypeScript determines there's nothing left in a union

### Rest parameters and arguments

- Functions that take an *unbounded* number of arguments using *rest parameters*
  - Implicitly `any[]`

  ```typescript
    function multiply(n: number, ...m: number[]) {
      return m.map((x) => n * x);
    }
  ```

- *Provide* a variable number of arguments from an array using the *spread* syntax

  ```typescript
    const arr1 = [1, 2, 3];
    const arr2 = [4, 5, 6];
    arr1.push(...arr2);
  ```

  - Note that in general, TypeScript does not assume that arrays are immutable
  - This can lead to some problems, but the straightforward solution is:

  ```typescript
    // Inferred as 2-length tuple
    const args = [8, 5] as const;
    // OK
    const angle = Math.atan2(...args);
  ```

### Parameter destructuring

- Conveniently unpack objects provided as an argument into one or more local variables in the function body

```typescript
  function sum({ a, b, c }: { a: number; b: number; c: number }) {
    console.log(a + b + c);
  }

  sum({ a: 10, b: 3, c: 9 });
```

- Less verbose alternative using named types:

```typescript
  // Same as prior example
  type ABC = { a: number; b: number; c: number };
  function sum({ a, b, c }: ABC) {
    console.log(a + b + c);
  }
```

### Assignability of functions

- The parameter output can be `void` despite the passed function having an output (it just won't be used)

```typescript
  type voidFunc = () => void; // OK

  const f1: voidFunc = () => {
    return true; // OK
  };

  const v1 = f1(); // v1 is void (no value)
```

- One special case: when a literal function definition has a `void` return type, that function must **not** return anything

```typescript
  function f2(): void {
    // @ts-expect-error
    return true;
  }

  const f3 = function (): void {
    // @ts-expect-error
    return true;
  };
```

## Object Types

```typescript
  // Anonymous
  function greet(person: { name: string; age: number }) {
    return "Hello " + person.age;
  }

  // Interface
  interface Person {
    name: string;
    age: number;
  }

  function greet(person: Person) {
    return "Hello " + person.age;
  }

  // Type alias
  type Person = {
    name: string;
    age: number;
  };

  function greet(person: Person) {
    return "Hello " + person.age;
  }
```

### Property modifiers

- Optional properties

```typescript
  interface PaintOptions {
    shape: Shape;
    xPos?: number;
    yPos?: number;
  }

  // Avoid `strictNullChecks` error, set a default value on optional parameters (or use narrowing)
  function paintShape({ shape, xPos = 0, yPos = 0 }: PaintOptions) {
    console.log("x coordinate at", xPos);
    console.log("y coordinate at", yPos);
  }
```

- `readonly` properties
  - Property cannot be written to during type-checking
  - But it's not totally immutable - the property just can be re-written to

  ```typescript
    interface Home {
      readonly resident: { name: string; age: number };
    }

    function visitForBirthday(home: Home) {
      // We can read and update properties from 'home.resident'.
      console.log(`Happy birthday ${home.resident.name}!`);
      home.resident.age++;
    }

    function evict(home: Home) {
      // But we can't write to the 'resident' property itself on a 'Home'.
      home.resident = {
      // ERROR: Cannot assign to 'resident' because it is a read-only property.
        name: "Victor the Evictor",
        age: 42,
      };
    }
  ```

  - Note that `readonly` properties can also change during aliasing (merging two `interface` declarations)

### Extending types

```typescript
  interface BasicAddress {
    name?: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;
  }

  interface AddressWithUnit extends BasicAddress {
    unit: string;
  }
```

- Extend from multiple types

```typescript
  interface Colorful {
    color: string;
  }

  interface Circle {
    radius: number;
  }

  interface ColorfulCircle extends Colorful, Circle {}

  const cc: ColorfulCircle = {
    color: "red",
    radius: 42,
  };
```

### Intersection types

```typescript
  interface Colorful {
    color: string;
  }
  interface Circle {
    radius: number;
  }

  type ColorfulCircle = Colorful & Circle;
```

### Generic object types

- Declare a *type parameter* (like a variable, but for a type)

```typescript
  interface Box<Type> {
    contents: Type;
  }
  interface StringBox {
    contents: string;
  }

  let boxA: Box<string> = { contents: "hello" }; // set `Type` as `string`
  let boxB: StringBox = { contents: "world" };
  // boxA and boxB are identical
```

- Also possible with type aliases

```typescript
  type Box<Type> = {
    contents: Type;
  };

  type OrNull<Type> = Type | null;

  type OneOrMany<Type> = Type | Type[];
```

### Tuple types

- 'Tuple' are **fixed-length**, **fixed-type** arrays
- Offers stricter structure than array

```typescript
  type StringNumberPair = [string, number];

  function doSomething(pair: [string, number]) {
    const a = pair[0];
    const b = pair[1];
  }

  doSomething(["hello", 42]);
```

- Can **destructure** tuples using JavaScript's destructuring

```typescript
  function doSomething(stringHash: [string, number]) {
    const [inputString, hash] = stringHash;

    console.log(inputString);
    console.log(hash);
  }
```

- Can have optional properties (using `?`) but must come at the end; this also affects the type of `length`

```typescript
  type Either2dOr3d = [number, number, number?];

  function setCoordinate(coord: Either2dOr3d) {
    const [x, y, z] = coord;
    // z: number | undefined

    console.log(`Provided coordinates had ${coord.length} dimensions`);
    // length: 2 | 3
  }
```

- Tuples can have rest elements, which have to an array/tuple type

```typescript
  type StringNumberBooleans = [string, number, ...boolean[]];
  type StringBooleansNumber = [string, ...boolean[], number];
  type BooleansStringNumber = [...boolean[], string, number];
```

- Can be used in rest parameters and arguments, useful for taking a variable number of arguments but with a minimum

```typescript
  function readButtonInput(...args: [string, number, ...boolean[]]) {
    const [name, version, ...input] = args;
    // ...
  }

  // Identical
  function readButtonInput(...args: [string, number, ...boolean[]]) {
    const [name, version, ...input] = args;
    // ...
  }
```

## Type Manipulation

- Express a new type in terms of existing types or values

### Generics

- Generic types

```typescript
  function identity<Type>(arg: Type): Type {
    return arg;
  }

  let myIdentity: <Input>(arg: Input) => Input = identity;
  // myIdentity is the `identity` function that takes an argument `arg` of type `Input` and returns an output of type `Input`
```

- Generic interface

```typescript
  interface GenericIdentityFn {
    <Type>(arg: Type): Type;
  }

  function identity<Type>(arg: Type): Type {
    return arg;
  }

  let myIdentity: GenericIdentityFn = identity;
  // This is same as above but with an interface
```

- Generic classes

```typescript
  class GenericNumber<NumType> { // similar to generic interface but with <>
    zeroValue: NumType;
    add: (x: NumType, y: NumType) => NumType;
  }

  let myGenericNumber = new GenericNumber<number>(); // could be anything in <>
  myGenericNumber.zeroValue = 0;
  myGenericNumber.add = function (x, y) {
    return x + y;
  };
```

- Generic constraints

```typescript
  interface Lengthwise {
    length: number;
  }

  function loggingIdentity<Type extends Lengthwise>(arg: Type): Type {
    console.log(arg.length); // Now we know it has a .length property, so no more error
    return arg;
  }

  loggingIdentity({ length: 10, value: 3 }); // OK
```

- Using type parameters in generic constraints

```typescript
  function getProperty<Type, Key extends keyof Type>(obj: Type, key: Key) {
    return obj[key];
  }

  let x = { a: 1, b: 2, c: 3, d: 4 };

  getProperty(x, "a"); // OK
  getProperty(x, "m");
  // ERROR: Argument of type '"m"' is not assignable to parameter of type '"a" | "b" | "c" | "d"'.
```

### `keyof` type operator

- `keyof` operator takes an object type and produces a string or nuermical union of its keys

```typescript
  type Point = { x: number; y: number };
  type P = keyof Point; // "x" | "y"
```

### `typeof` type operator

- JavaScript already has a `typeof` operator you can use in an expression context
- TypeScript adds a `typeof` operator you can use in a type context to refer to the type of a variable or property

```typescript
  let s = "hello";
  let n: typeof s;
  //  ^ = let n: string
```

- Most useful when combined with other type operators
  - E.g. `ReturnType<T>` takes a function type and produces its return type

  ```typescript
    function f() {
      return { x: 10, y: 3 };
    }
    type P = ReturnType<typeof f>;
    //   ^ = type P = {
    //       x: number;
    //       y: number;
    //   }
  ```

### Indexed access type

```typescript
  type Person = { age: number; name: string; alive: boolean };

  type Age = Person["age"];
  //   ^ = type Age = number
  type I1 = Person["age" | "name"];
  //   ^ = type I1 = string | number
  type I2 = Person[keyof Person];
  //   ^ = type I2 = string | number | boolean
  type AliveOrName = "alive" | "name";
  type I3 = Person[AliveOrName];
  //   ^ = type I3 = string | boolean
```

- Can only use types when indexing

```typescript
  const key = "age";
  type Age = Person[key]; // ERROR

  type Age = Person[typeof key] // OK

  // Or
  type key = "age";
  type Age = Person[key]; // OK
```

### Conditional types

```typescript
  interface Animal {
    live(): void;
  }
  interface Dog extends Animal {
    woof(): void;
  }

  type Example1 = Dog extends Animal ? number : string;
  //   ^ = type Example1 = number
```

- Simplify overloads
  - Overload:

  ```typescript
    interface IdLabel {
      id: number;
    }
    interface NameLabel {
      name: string;
    }

    function createLabel(id: number): IdLabel;
    function createLabel(name: string): NameLabel;
    function createLabel(nameOrId: string | number): IdLabel | NameLabel;
    function createLabel(nameOrId: string | number): IdLabel | NameLabel {
      throw "unimplemented";
    }
  ```

  - Simplified:

  ```typescript
    type NameOrId<T extends number | string> = T extends number ? IdLabel : NameLabel;

    function createLabel<T extends number | string>(idOrName: T): NameOrId<T> {
      throw "unimplemented";
    }

    let a = createLabel("typescript");
    //  ^ = let a: NameLabel

    let b = createLabel(2.8);
    //  ^ = let b: IdLabel

    let c = createLabel(Math.random() ? "hello" : 42);
    //  ^ = let c: NameLabel | IdLabel
  ```

- Conditional type constraints

```typescript
  type MessageOf<T extends { message: unknown }> = T["message"]; // `T` will always have `message` property

  type MessageOf<T> = T extends { message: unknown } ? T["message"] : never; // `never` type assigned if `message` not available

  // Another example
  type Flatten<T> = T extends any[] ? T[number] : T;
```

- Inferring within conditional types (`infer`)

```typescript
  // Achieves the same as above
  type Flatten<Type> = Type extends Array<infer Item> ? Item : Type;

  // Output is the return type of a function
  type GetReturnType<Type> = Type extends (...args: never[]) => infer Return ? Return : never;
```

### Mapped types

- Generic type which uses a union created via a keyof to iterate through the keys of one type to create another

```typescript
  type OptionsFlags<Type> = {
    [Property in keyof Type]: boolean;
  };

  type FeatureFlags = {
    darkMode: () => void;
    newUserProfile: () => void;
  };

  type FeatureOptions = OptionsFlags<FeatureFlags>;
  //   ^ = type FeatureOptions = {
  //       darkMode: boolean;
  //       newUserProfile: boolean;
  //   }
```

- Mapping modifiers
  - `readonly` and `?`
  - Prefix with `+` and `-`; assumes `+` if unspecified

  ```typescript
    type CreateMutable<Type> = {
      -readonly [Property in keyof Type]: Type[Property]; // removes `readonly`
    };

    type LockedAccount = {
      readonly id: string;
      readonly name: string;
    };

    type UnlockedAccount = CreateMutable<LockedAccount>;
    //   ^ = type UnlockedAccount = {
    //       id: string;
    //       name: string;
    //   }

    // Removes 'optional' attributes from a type's properties
    type Concrete<Type> = {
      [Property in keyof Type]-?: Type[Property]; // removes `?`
    };
  ```

- Key remapping via `as`

```typescript
  type MappedTypeWithNewProperties<Type> = {
    [Properties in keyof Type as NewKeyType]: Type[Properties]
  }
```

- Using template literals

```typescript
  // Using template literal types
  type Getters<Type> = {
    [Property in keyof Type as `get${Capitalize<string & Property>}`]: () => Type[Property]
  };

  interface Person {
    name: string;
    age: number;
    location: string;
  }

  type LazyPerson = Getters<Person>;
  //   ^ = type LazyPerson = {
  //       getName: () => string;
  //       getAge: () => number;
  //       getLocation: () => string;
  //   }
  ```

- Filtering keys

```typescript
  // Remove the 'kind' property
  type RemoveKindField<Type> = {
    [Property in keyof Type as Exclude<Property, "kind">]: Type[Property]
  };
```

- Conditional mapping

```typescript
  type ExtractPII<Type> = {
    [Property in keyof Type]: Type[Property] extends { pii: true } ? true : false;
  };

  type DBFields = {
    id: { format: "incrementing" };
    name: { type: string; pii: true };
  };

  type ObjectsNeedingGDPRDeletion = ExtractPII<DBFields>;
  //   ^ = type ObjectsNeedingGDPRDeletion = {
  //       id: false;
  //       name: true;
  //   }
```

### Template literal types

```typescript
  type EmailLocaleIDs = "welcome_email" | "email_heading";
  type FooterLocaleIDs = "footer_title" | "footer_sendoff";

  type AllLocaleIDs = `${EmailLocaleIDs | FooterLocaleIDs}_id`; // every possible union
  //   ^ = type AllLocaleIDs = "welcome_email_id" | "email_heading_id" | "footer_title_id" | "footer_sendoff_id"

  type Lang = "en" | "ja" | "pt";
  type LocaleMessageIDs = `${Lang}_${AllLocaleIDs}`; // cross-multiplied
  //   ^ = type LocaleMessageIDs = "en_welcome_email_id" | "en_email_heading_id" | "en_footer_title_id" | "en_footer_sendoff_id" | "ja_welcome_email_id" | "ja_email_heading_id" | "ja_footer_title_id" | "ja_footer_sendoff_id" | "pt_welcome_email_id" | "pt_email_heading_id" | "pt_footer_title_id" | "pt_footer_sendoff_id"
```

- String union in types

  ```typescript
    type PropEventSource<Type> = {
      on(eventName: `${string & keyof Type}Changed`, callback: (newValue: any) => void): void;
    };

    declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;

    const person = makeWatchedObject({
      firstName: "Saoirse",
      lastName: "Ronan",
      age: 26
    });
    
    person.on("firstNameChanged", () => {}); // OK
    person.on("lastNameChanged", () => {}); // OK
    person.on("ageChanged", () => {}); // OK
  ```

  - The example above used `any` in the callback
  - Template literals types can infer from substitution positions

  ```typescript
    type PropEventSource<Type> = {
      on<Key extends string & keyof Type> (eventName: `${Key}Changed`, callback: (newValue: Type[Key]) => void ): void;
    };

    declare function makeWatchedObject<Type>(obj: Type): Type & PropEventSource<Type>;

    const person = makeWatchedObject({
      firstName: "Saoirse",
      lastName: "Ronan",
      age: 26
    });

    person.on("firstNameChanged", newName => { // (parameter) newName: string
      console.log(`new name is ${newName.toUpperCase()}`); // fine with strings
    });

    person.on("ageChanged", newAge => { // (parameter) newAge: number
      if (newAge < 0) {
        console.warn("warning! negative age"); // fine with numbers
      }
    })
  ```

- Intrinsic string manipulation types
  - `Uppercase<StringType>` - converts each character in the string to the uppercase version
  - `Lowercase<StringType>` - converts each character in the string to the lowercase equivalent
  - `Capitalize<StringType>` - converts the first character in the string to an uppercase equivalent
  - `Uncapitalize<StringType>` - converts the first character in the string to a lowercase equivalent

## Classes

TODO

## Modules

TODO

## Other Notes

- Best not to add annotations when the type would be inferred
- `tsc --noEmitOnError` - does not transpile file if there are any errors
- `strict` toggles all strict type-checking options
- `noImplicitAny` - will issue an error on any variables whose type is implicitly inferred as `any`
- `strictNullChecks` - `null` and `undefined` are **not** in the domain of every type and are only assignable to themselves and `any`
- `+` is the unary operator. Fastest and best way to convert a string to a number
- Default `lib` items:
  - `dom`
  - `es6`
  - `dom.iterable`
  - `scripthost`
- `node_modules` is automatically excluded
- `tsc -w` enters watch mode for all .tsc files


- 'Enum' - automatically enumerated global constant identifiers
  - Use when wanting human-readable identifiers with mapped values
  - Assigns labels to values
  - Values can be anything, but increment automatically if not specified
