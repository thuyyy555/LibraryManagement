import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AvailableBookPage.css';
import NavBar from './../../components/NavBar/NavBar';

const AvailableBookPage = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState('');
  const [inputError, setInputError] = useState('');

  useEffect(() => {
    axios
      .get('http://localhost:8080/books')
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the books!', error);
      });
  }, []);

  useEffect(() => {
    axios
      .get('http://localhost:8080/users')
      .then((response) => {
        setUsers(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handleCardClick = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedBook(null);
    setInputError('');
  };

  const handleUserId = (e) => {
    setUserId(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (userId !== '') {
      const val = parseInt(userId);
      const user = users.find((user) => user.id === val);
      if (user) {
        setInputError('');
        submitBorrow({ book: selectedBook, user: user });
        console.log('Người dùng tìm thấy:', user);
      } else {
        setInputError('Không tìm thấy người dùng với ID này');
      }
    } else {
      setInputError('Vui lòng nhập ID người dùng');
    }
  };
  const submitBorrow = async (data) => {
    try {
      const response = await fetch('http://localhost:8080/borrowrecord/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (response.ok) {
        alert('Data submitted successfully!');
      } else {
        alert('Failed to submit data.');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const filteredBooks = books.filter((book) => book.title.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="available-books-container">
      <NavBar />
      <h2>Danh Sách Sách Có Sẵn</h2>
      <input
        type="text"
        className={`ab-search-input ${inputError ? 'error' : ''}`}
        placeholder="Tìm kiếm sách..."
        value={search}
        onChange={handleSearch}
      />
      <div className="books-grid">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div className="book-card" key={book.id} onClick={() => handleCardClick(book)}>
              <img src={book.imageUrl} alt={book.title} className="book-image" />
              <div className="book-info">
                <h3 className="book-title">{book.title}</h3>
                <p className="book-author">{book.author}</p>
                <p className="book-genre">Genre: {book.genre}</p>
                <p className="book-quantity">Quantity: {book.quantity}</p>
              </div>
            </div>
          ))
        ) : (
          <div>Không tìm thấy sách.</div>
        )}
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <h2>{selectedBook.title}</h2>
            <p>Tác giả: {selectedBook.author}</p>
            <p>Thể loại: {selectedBook.genre}</p>
            <p>Số lượng: {selectedBook.quantity}</p>
            <form>
              <label>
                Nhập ID User:
                <input
                  type="text"
                  name="note"
                  value={userId}
                  onChange={handleUserId}
                  placeholder="Nhập ID người dùng"
                  className={inputError ? 'input-error' : ''}
                />
              </label>
              <button type="submit" onClick={handleSubmit}>
                Gửi
              </button>
            </form>
            {inputError && <p className="error-message">{inputError}</p>}
          </div>
        </div>
      )}
    </div>
  );
};

export default AvailableBookPage;
