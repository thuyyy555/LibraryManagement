import React from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Library</Link>
      </div>
      <ul className="navbar-links">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/books">Books</Link>
        </li>
        <li>
          <Link to="/new-user">Users</Link>
        </li>
        <li>
          <Link to="/borrow">Borrow/Return</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
