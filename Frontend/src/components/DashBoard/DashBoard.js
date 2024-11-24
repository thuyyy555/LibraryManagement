import React from 'react';
import './DashBoard.css';
import { FaBook, FaUser, FaBookOpenReader } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const DashBoard = () => {
  return (
    <div>
      <div className="dashboard">
        <Link to="/edit-users" className="dashboard-item">
          <div className="total-readers">
            <p className="db-text">USERS</p>
            <FaUser className="db-icon" />
          </div>
        </Link>
        <Link to="/total-books" className="dashboard-item">
          <div className="total-books">
            <p className="db-text">TOTAL BOOKS</p>
            <FaBook className="db-icon" />
          </div>
        </Link>
        <Link to="/edit-books" className="dashboard-item">
          <div className="edit-books">
            <p className="db-text">EDIT BOOKS</p>
            <FaBookOpenReader className="db-icon" />
          </div>
        </Link>
        <Link to="/available-books" className="dashboard-item">
          <div className="available-books">
            <p className="db-text">AVAILABLE BOOKS</p>
            <FaBook className="db-icon" />
          </div>
        </Link>
      </div>
    </div>
  );
};

export default DashBoard;
