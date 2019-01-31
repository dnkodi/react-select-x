# React Select X

An awesome react select component.

## Demo

[https://dnkodi.github.io/react-select-x/](https://dnkodi.github.io/react-select-x/)


## Installation

```bash
$ npm install react-select-x --save
```

After this you can import react-select-x and its styles in your application as follows:

```js
import { Select, MultiSelect } from 'react-select-x';

//Include styles at your root and make sure you have necessary loaders to handle css
import 'react-select-x/dist/styles.css';
```

### Usage:

```js
import React from 'react';
import Select from 'react-select-x';

const list = [
    { value: "LBJ", label: "Lebron James" },
    { value: "SC", label: "Stepehen Curry" },
    { value: "JH", label: "James Harden" }
]

class App extends React.Component {
  state = {
    selectedValue: "",
  }

  handleClick = (value) => {
    this.setState({
            selectedValue: value
    })
    console.log(`Option selected:`, selectedValue);
  }

  render() {
    const { selectedValue } = this.state;

    return (
      <Select
            label="Select"
            name="single-select"
            onChange={this.handleClick}
            options={list}
            placeholder="-Select-"
            value={selectedValue}
        />
    );
  }
}
```

### Props

| Prop | Type | Description
:---|:---|:---
| `disabled` | bool | disable select control |
| `errorText` | string | text to display for an error |
| `inline` | bool | make the select inline |
| `label` | string | pass the label text |
| `margin` | string | add margins to component if necessary |
| `name` | string | generate an HTML input with this name |
| `onChange` | function | subscribe to change events |
| `options` | array | specify the options the user can select from |
| `placeholder` | string | change the text displayed when no option is selected |
| `readOnly` | bool | read only for the select component |
| `searchable` | bool | allow the user to search for matching options |
| `value` | string | control the current value |
| `width` | string | control width of the component |


### TODO

At the moment react-select-x does not handle loading of options asynchronously so this needs to be implemented and few other more fetaures as well. Feel free to raise an issue if you run into something. PR's are most welcome. This repos is still in its early stage. :)

## Development

```bash
$ git clone https://github.com/dnkodi/react-select-x.git
$ npm install
```

### Start the dev server

```bash
$ npm start
```

Defaults to port `8080`.

## Thanks

This component was inspired by: [react-select](https://github.com/JedWatson/react-select) a lovely select component done initially by Jed Watson. And many thanks to my collegues [Michael Raymond](https://www.linkedin.com/in/michael-raymond-681669107/) (the maestro) and [Deegha Galkissa](https://github.com/deegha) for helping to get this component from scratch.


## License

MIT Licensed. Copyright (c) Duleep Kodithuwakku 2019.
