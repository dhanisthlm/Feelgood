import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './styles.css';

export class App extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className="app">
        {this.props.children}
      </div>
    )
  }
}

App.propTypes = { children: PropTypes.object };

export default connect()(App)
