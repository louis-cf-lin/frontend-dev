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
- Best practice to use the intended tag for the intended purpose (e.g. a `<button>` for buttons - not `<div>`)

## Section 9: Diving Deeper: Working with Fragments, Portals & Ref's

### Fragments

- JSX only able to return one root node - results in the `<div>` soup problem of too many nested divs

  - Solution: use `Fragment`:

  ```js
  import React, { Fragment } from "react";

  <Fragment>...</Fragment>;
  ```

  or

  ```js
  import React from "react";

  <React.Fragment>...</React.Fragment>;
  ```

### Portals

- Portals are a way of rendering certain elements/components elsewhere (usually within another element)
- Most useful for overlays, backdrops, sidedrawers

### Ref's

- Refs are similar to states but intended for read-only purposes almost always

- In general, **don't use refs to manipulate the DOM**
- Exception: resetting user input (edge-case)
  - OK because not really manipulating the DOM (e.g. not adding new elements or changing the CSS class)
  - But rarely do this
- Use if just wanting to quickly read a value but never changing it
- Advantage: less code than states
- Disadvantage: can't manipulate the DOM

#### Controlled vs uncontrolled

- When the state of a component is not controlled with React, it is **uncontrolled**

  - typically using refs means it's uncontrolled (assuming no manipulation is done using the ref)

- **Controlled** component - form data is handled by a React component

  - Takes its current value through `props` and notifies changes through callbackes (e.g. `onChange`)
  - A parent component "controls" it by handling the callback and managing its own state and passing the new values as props to the controlled component (aka a "dumb" component)

- **Uncontrolled** components - form data is handled by the DOM itself

  - Instead of writing an event handler for every state update, use a ref to get form values from the DOM
  - Stores its own state internally
  - Query the DOM using a ref to find its current value when needed

## Section 10: Side Effects, Reducers & the Context API

### Side Effects

- `useEffect()` hook runs **AFTER** a component is updated

  ```js
    useEffect(() => { ... }, [ dependencies ]);
  ```

  - `() => { ... }` - a function that should be executed **AFTER** every component evaluation **IF** the specified dependencies changed
  - `[ dependencies ]` - dependencies of the effect; the function only runs if the dependencies change
  - No dependency array means the effect will run when ANYTHING changes
  - An empty array of dependencies means the effect will only run once (after initialisation)

- Commonly used to rerun logic when certain data (props, states) or anything is changed; i.e. whenever you have an action that should be executed in response to some other action
- Should add "everything" used in the effect function as a dependency, with exceptions:
  - Don't need to add state updating functions
  - Don't need to add "built-in" APIs or function (e.g. `fetch()`, `localStorage` )
  - Don't need to add variable or functions defined outside of the component
- In general, dependencies are things that could change because the component (or parent component) is re-rendered
- See [here for an example](https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/25871518#notes)
- **Cleanup function** does not run on the first side effect execution, but will run BEFORE everytime thereafter
  - Implemented as a function that is returned
  - Useful when combined with debouncing

### Reducers

- `useState()` may become hard or error-prone to use with more complex states (multiple states, multiple ways of changing it, dependencies on other states)
- `useReducer()` can be used as a replacement if require "more powerful state management"
- Use when updating a state that depends on another state
- Use when updating multiple states simultaneously

  ```js
  const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn);
  ```

  - `state` - the state snapshot used in the component re-render/re-evaluation cycle
  - `dispatchFn` - a function that can be used to dispatch a new action (i.e. trigger an update of the state)
  - `reducerFn`
    - `(prevState, action) => newState` - a function that is triggered automatically once an action is dispatched (via `dispatchFn()`); it receives the latest state snapshot and should return the new, updated state
  - `initialState` - the initial state
  - `initFn` - a function to set the initial state programmatically

- "Custom extension" of `useState()`
- Good practice to optimise `useEffect()` so that it is only run when needed

  - E.g. use object destructuring to pull a property out of a state and use the extracted property as the dependency, **NOT** the entire state (with its multiple properties)
  - [Read more here](https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/26043040#notes)

- Generally, you'll know when you need to `useReducer()`: when `useState()` becomes cumbersome or you're getting a lot of bugs/unintended behaviours
- `useState()`
  - Main state management tool
  - Great for independent pieces of state/data
  - Great if state updates are easy and limited to a few kinds of updates
- `useReducer()`
  - Great if you need more power
  - Should be considered if you have related pieces of state/data
  - Can be helpful if you have more complex state updates

### Context API

- Method of storing data and accessing across components rather than passing through states and props
- Look [here](./effects-reducers-context/src/App.js), [here](./effects-reducers-context/src/components/MainHeader/Navigation.js), and [here](./effects-reducers-context/src/store/auth-context.js) to find examples on how to use the context API
- When to use:
  - Passing variables/functions/objects through multiple components
  - Forwarding to an element that does something specific (and always will)
  - But in most cases, you will use `props`
- Good idea to add dummy placeholders in the context creation object for better IDE suggestions
- Can also bundle all the logic and data into a single context provider
- **NOT** optimised for high frequency changes
- **SHOULDN'T** be used to replace ALL component communications and props

### Rules of hooks
