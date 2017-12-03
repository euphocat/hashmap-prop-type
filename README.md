# Hashmap Prop Type

The missing hashmap prop type validator for React.

## Why ?

This validator is especially useful when you use redux as hashmaps are recommended to structure your data within
you state. To know more about state management see https://redux.js.org/docs/faq/OrganizingState.html#how-do-i-organize-nested-or-duplicate-data-in-my-state

## Install
This module depends on module [prop-types](https://www.npmjs.com/package/prop-types)

Run `npm install hashmap-prop-type` or `yarn add hashmap-prop-type`

## How to use

```jsx harmony
import React from 'react';
import PropTypes from 'prop-types';
// import the default function from the package, use require('hashmap-proptype').default for common js
import hashmapPropType from 'hashmap-proptype';

class MyComponent extends React.Component {
  static propTypes = {
    // type your prop with hashmapPropType. You MUST pass a PropType as argument 
    myHashmap: hashmapPropType(PropTypes.shape({
      id: PropTypes.string.isRequired,
      myValue: PropTypes.number.isRequired,
    })).isRequired;
  };
  
  render() {
    const { myHashmap } = this.props;
    return (
      <div>{Object.keys(myHashmap).map(key => <span key={key}>{myHashmap[key].myValue}</span>}</div>
    );
  }
}

class App extends React.Component {
  render() {
    // the hashmap to validate
    const myHashmap = {
      'ddaf34cd-f31b-471b-ae23-6cb2729b580b': {
        id: 'ddaf34cd-f31b-471b-ae23-6cb2729b580b',
        myValue: 42,
      },
      '6298edc8-c679-47fa-b52e-60c032eb744d': {
        id: '6298edc8-c679-47fa-b52e-60c032eb744d',
        myValue: 1234,
      },
    };
    return <MyComponent myHashmap={myHashmap} />
  }
}
```
