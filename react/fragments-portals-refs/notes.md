- The <div> soup problem - too many nested divs

  - Solution: use a wrapper helper component that only returns `props.children`
  - Workaround to JSX only being able to return one root node
  - Better solution, use `Fragment`:

  ```js
  import React, { Fragment } from "react";

  <Fragment>...</Fragment>;
  ```

  or if not importing Fragment directly:

  ```js
  <React.Fragment>...</React.Fragment>
  ```

- Best practice to use a button tag for buttons and not a div
- Portals are a way of rendering certain elements/components within a specific element elsewhere (most useful for overlays, backdrops, sidedrawers)

- Refs are kinda like states, except they're not constantly updated(?)

  - In general, don't use refs to manipulate the DOM
    - Except for resetting user input, in which case it's kinda fine
    - OK because we're not really manipulating the DOM (e.g. not adding new elements or changing the CSS class)
    - But rarely do it
  - If you just want to quickly read a value and never plan on changing it, use refs

- When the state of a component is not controlled with React, it is **uncontrolled**

  - typically using refs means it's uncontrolled (assuming no manipulation is done using the ref)

    > In a controlled component, form data is handled by a React component. The alternative is uncontrolled components, where form data is handled by the DOM itself. To write an uncontrolled component, instead of writing an event handler for every state update, you can use a ref to get form values from the DOM.

  - stack overflow answer

    > - A Controlled Component is one that takes its current value through `props` and notifies changes through callbacks like `onChange`. A parent component "controls" it by handling the callback and managing its own state and passing the new values as props to the controlled component. You could also call this a "dumb component".
    > - A Uncontrolled Component is one that stores its own state internally, and you query the DOM using a `ref` to find its current value when you need it. This is a bit more like traditional HTML.
    >   In most (or all) cases you should use controlled components
