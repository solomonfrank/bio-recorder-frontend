import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <React.Fragment>
      <nav className="navbar navbar__bg">
            <Link to="/" className="navbar-brand"> Bio-recorder</Link>
            <Link to="/users" > Users</Link>
      </nav>
    </React.Fragment>
  )
}

export default Header;