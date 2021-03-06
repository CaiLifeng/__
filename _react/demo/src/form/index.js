import React from 'react';
import ReactDOM from 'react-dom'
import FormInput from './input'
import TwoWayForm from './two-way-binding'
// require('./index.less');

const App = React.createClass({
  render() {
    return (
      <div>
        <h2>demo1</h2>
        <FormInput />
        <h2>demo2</h2>
        <TwoWayForm></TwoWayForm>
      </div>
    );
  }
})

ReactDOM.render(<App></App>, document.getElementById('example'));
