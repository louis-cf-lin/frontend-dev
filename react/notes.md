# Notes

## Section 1: Getting Started

| Single Page Applications                                               | Multi Page Applications                                        |
| ---------------------------------------------------------------------- | -------------------------------------------------------------- |
| One HTML page, content is (re)rendered on client                       | Multiple HTML pages, content is rendered on server             |
| All React components controlled by an overarching root React component | Standard HTML, CSS, JS with isolated React "widgets" scattered |
| Typically one ReactDOM.render() call                                   | One ReactDOM.render() call per widget                          |
| Fetch once initially and never reload                                  | Reload and fetch for every HTML page                           |

## Section 2: JavaScript Refresher

- Use `let` and `const` over `var`
- Arrow functions:

  ```javascript
    const myFunc = () => {
      ...
    }

    // If only one argument
    const myFunc = arg => {
      console.log(arg);
    }

    // Function one-liners
    const myFunc = (num) => num * 2;
  ```

- Exports and imports

  - `export default` just means the export can be named anything when imported
  - Named exports (just `export`) can still be assigned another name:

    ```javascript
    import { smth as Smth } from "file.js";
    ```

  - Import all becomes properties

    ```javascript
    import * as bundled from "file.js";

    console.log(bundled.item);
    ```

- Classes

  - ES6:

    ```javascript
    class Human {
      constructor() {
        this.gender = "Male"; // Property
      }
      call() {
        // Method
        console.log(this.gender);
      }
    }

    class Person extends Human {
      constructor() {
        // Default method for initiating properties
        super(); // Required for inheritance
        this.name = "Max";
      }
    }

    const myPerson = new Person();
    myPerson.call();
    ```

  - ES7:

    ```javascript
    class Human {
      gender = "Male";
      call = () => console.log(this.gender);
    }

    class Person extends Human {
      name = "Max";
    }
    ```

- Spread and rest operators

  - Spread - used to split up array elements OR object properties:

    ```javascript
    const numbers = [1, 2, 3];
    const newNumbers = [...numbers, 4]; // [1, 2, 3, 4]

    const person = {
      name: "Max",
    };

    const newPerson = {
      ...person, // name: "Max"
      age: 28,
    };
    ```

  - Rest - used to merge a list of function arguments into an array:

    ```javascript
    const filter = (...args) => {
      return args.filter((el) => el === 1);
      // Merges all arguments into one array then keeps only values of 1
    };

    filter(1, 2, 3); // [1]
    ```

- Destructuring

  - Easily extract array elements or object properties and store them in variables
  - Array destructuring:

    ```javascript
    [a, , c] = ["Hello", "there", "Max"]; // Leave one out
    ```

  - Object destructuring:

    ```javascript
      { name } = { name: 'Max', age: 28 };
      console.log(age) // undefined
    ```

- Primitive types are real-copies; objects and array are reference types

  - To produce a real copy:

    ```javascript
    const secondPerson = {
      ...person,
    };
    ```

- Array functions (execute function on each element):

  ```javascript
  const numbers = [1, 2, 3];
  const doubleNumArray = numbers.map((num) => {
    return num * 2;
  });
  // Note: .map() creates a real copy
  ```

## Section 3: React Basics & Working with Components

- `index.js` is first to be executed
- One file per component
- A component in React is just a JavaScript function that returns HTML code
- Use `className` in JSX
- Avoid too much syntax in curly braces (string literal) - instead, do the processing first
- Can use self-enclosing tag if no content between
- `props.children` is reserved for the content between tags

## Section 4: React State & Working with Events

- Good practice to name event handler function ending with 'Handler'
- React hooks can only be called in React component (functions)
- `useState()` returns an array with exactly two indices
  - 'Special variable'
  - Function to update this 'special variable'
- State is separated on a per-component basis
  - I.e. the update function is only called once, and on the element it was called from
  - The entire component is rerun
- `useState()` is called once upon initialisation of the component, but is not rerun after (even when the component is updated)
- Combining multiple states into a single object means all states have to be updated
  - Best practice to pass an anonymous function to ensure it is always receiving the latest state snapshot
  - Especially if the new state update depends on the previous
- If `a(func)` takes a pointer to a function as input, then running `a(input1)` will call `func(input1)`
- **Controlled component** - both the value and changes to the value are handled by the parent component
- Stateless/presentational/dumb - no internal state

## Section 5: Rendering Lists & Conditional Content

- Spread operator (`...`) works on both arrays and objects
- React updates all elements that look similar
  - This can mess up states
  - And cause performance issues
  - Solution: add a `key` property to components
- In general, it's a good idea to attach a `key` property whenever elements are rendered in a loop
- `&&` can be used as a ternary operator - second part is outputted if the first part is true
- Dynamic style must be in objects, i.e. `style={{ ... }}`
- `for ... in ...` - objects
- `for ... of ...` - arrays
- Conditional elements are useful to show and hide elements (avoids assigning hide classes)
  - To do this, use `{ a && b }` which will output `b` if `a` is true
  - Or `{ c || d }` which will output `d` if `c` is false

## Section 6: Styling React Components

- CSS modules:

  - CSS files need the `.module.css` file extension
  - In the JS file

  ```js
  import styles from "./Component.module.css";
  ```

  - Add classes using `className={styles.name}`
  - For kebab-case use `className={styles["my-class"]}`

- Use template literals to dynamically set classes, e.g.

```js
  <div className={`form-control ${!isValid ? 'invalid' : ''}`}>

  <div className={`${styles["form-control"]} ${!isValid && styles.invalid}`}>
```

## Section 7: Debugging React Apps

## Section 8: Time to Practice: A Complete Practice Project

- Good idea to store errors in a JS object to use `error.title` and `error.message` etc.

## Section 9: Diving Deeper: Working with Fragments, Portals & Ref's
