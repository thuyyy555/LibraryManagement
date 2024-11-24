import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TotalBooksPage from './pages/TotalBooksPage/TotalBooksPage';
import EditUsersPage from './pages/EditUsersPage/EditUsersPage';
import EditBooksPage from './pages/EditBooksPage/EditBooksPage';
import HomePage from './pages/HomePage';
import BorrowListPage from './pages/BorrowListPage/BorrowListPage';
import NewBookPage from './pages/NewBookPage/NewBookPage';
import NewUserPage from './pages/NewUserPage/NewUserPage';
import AvailableBookPage from './pages/AvailableBookPage/AvailableBookPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/edit-users" element={<EditUsersPage />} />
        <Route path="/edit-books" element={<EditBooksPage />} />
        <Route path="/new-user" element={<NewUserPage />} />
        <Route path="/borrow" element={<BorrowListPage />} />
        <Route path="/books" element={<NewBookPage />} />
        <Route path="/total-books" element={<TotalBooksPage />} />
        <Route path="/available-books" element={<AvailableBookPage />} />
      </Routes>
    </Router>
  );
};

export default App;
