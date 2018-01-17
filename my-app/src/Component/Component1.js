import React, {Component} from 'react';
// import PropTypes from 'prop-types';

export default class MyComponent1 extends React.Component {
  render() {
    return (<div>{this.props.name}</div>);
  }
}

MyComponent1.defaultProps  = {
    name: 'ww'
};
