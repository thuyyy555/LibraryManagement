import React, { useState } from 'react';
import './NewBookPage.css';
import NavBar from './../../components/NavBar/NavBar';

const NewBookPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    genre: '',
    quantity: '',
    imageUrl: '',
  });

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: file.name });
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/books/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
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

  return (
    <div className="nbook-form-container">
      <NavBar />
      <form className="book-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="title">Tên Sách</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Nhập tên sách"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="author">Tác Giả</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            placeholder="Nhập tác giả"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="genre">Thể Loại</label>
          <input
            type="text"
            id="genre"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            placeholder="Nhập thể loại"
          />
        </div>
        <div className="input-group">
          <label htmlFor="quantity">Số Lượng</label>
          <input
            type="number"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="Nhập số lượng sách"
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="image">Chọn Ảnh Bìa</label>
          <input
            type="text"
            id="image"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Nhập URL ảnh bìa"
          />
          {formData.image_url && (
            <div className="image-preview">
              <img src={formData.image_url} alt="Image Preview" />
            </div>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Thêm Sách
        </button>
      </form>
    </div>
  );
};

export default NewBookPage;
