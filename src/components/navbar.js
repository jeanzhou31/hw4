// navbar component -- home and new post buttons

import React, { Component } from 'react';
import { Link } from 'react-router';

class NavBar extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <div className="navbar">
        <Link to="/" className="navitem">HOME</Link>
        <Link to="/posts/new" className="navitem">NEW POST</Link>
      </div>
    );
  }
}

export default NavBar;
