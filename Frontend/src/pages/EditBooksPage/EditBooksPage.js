import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../../components/NavBar/NavBar';
import './EditBooksPage.css';

const EditBooksPage = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    quantity: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    axios
      .get('http://localhost:8080/books')
      .then((response) => {
        setBooks(response.data);
      })
      .catch((error) => {
        console.error('There was an error fetching the users!', error);
      });
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) ||
      book.author.toLowerCase().includes(search.toLowerCase()),
  );

  const handleEdit = (book) => {
    setSelectedBook(book);
    setFormData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      quantity: book.quantity,
    });
    setShowModalEdit(true);
  };

  const handleDelete = (book) => {
    setSelectedBook(book);
    setShowModalDelete(true);
  };

  const handleCloseModal = () => {
    setShowModalEdit(false);
    setSelectedBook(null);
    setShowModalDelete(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/books/edit', {
        id: selectedBook.id,
        ...formData,
      });

      if (response.status === 200) {
        setBooks((prevUsers) =>
          prevUsers.map((user) => (user.id === selectedBook.id ? { ...user, ...formData } : user)),
        );
        setShowModalEdit(false);
      } else {
        alert('Cập nhật thất bại.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra.');
    }
  };

  const handleDeleteSubmit = async (id) => {
    try {
      const response = await axios.post(`http://localhost:8080/books/delete/${id}`);
      if (response.status === 200) {
        alert('Xóa thành công!');
        setBooks(books.filter((book) => book.id !== id));
        setShowModalDelete(false);
      } else {
        alert('Xóa thất bại.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Có lỗi xảy ra.');
    }
  };

  return (
    <div className="book-table">
      <NavBar />
      <h2>Danh Sách Người Dùng</h2>
      <input
        type="text"
        className="search-input"
        placeholder="Tìm kiếm người dùng..."
        value={search}
        onChange={handleSearch}
      />

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên sách</th>
            <th>Tác giả</th>
            <th>Thể loại</th>
            <th>Số lượng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredBooks.length > 0 ? (
            filteredBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.genre}</td>
                <td>{book.quantity}</td>
                <td>
                  <button className="action-btn edit-btn" onClick={() => handleEdit(book)}>
                    Sửa
                  </button>
                  <button className="action-btn delete-btn" onClick={() => handleDelete(book)}>
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">Không tìm thấy người dùng.</td>
            </tr>
          )}
        </tbody>
      </table>
      {showModalEdit && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <form className="edit-form">
              <label>
                ID Book:
                <input type="text" value={selectedBook.id} readOnly />
              </label>
              <label>
                Tên sách:
                <input type="text" name="title" value={formData.title} onChange={handleChange} />
              </label>
              <label>
                Tác giả:
                <input type="text" name="author" value={formData.author} onChange={handleChange} />
              </label>
              <label>
                Thể loại:
                <input type="text" name="genre" value={formData.genre} onChange={handleChange} />
              </label>
              <label>
                Số lượng:
                <input type="text" name="quantity" value={formData.quantity} onChange={handleChange} />
              </label>
              <button type="submit" onClick={handleEditSubmit}>
                Gửi
              </button>
            </form>
          </div>
        </div>
      )}

      {showModalDelete && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={handleCloseModal}>
              &times;
            </span>
            <form className="delete-form">
              <p>Xác nhận xóa sách {selectedBook.title}</p>
              <div className="del-btn-container">
                <button type="button" onClick={() => handleDeleteSubmit(selectedBook.id)}>
                  Xác nhận
                </button>
                <button onClick={handleCloseModal}>Hủy</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditBooksPage;
