import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './TotalBooksPage.css';
import NavBar from '../../components/NavBar/NavBar';

const TotalBooksPage = () => {
  const [books, setBooks] = useState([]);

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

  return (
    <div className="total-books-container">
      <NavBar />
      <h1>List Books</h1>
      <div className="books-grid">
        {books.map((book) => (
          <div className="book-card" key={book.id}>
            <img src={book.imageUrl} alt={book.title} className="book-image" />
            <div className="book-info">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">{book.author}</p>
              <p className="book-genre">Genre: {book.genre}</p>
              <p className="book-quantity">Quantity: {book.quantity}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TotalBooksPage;
