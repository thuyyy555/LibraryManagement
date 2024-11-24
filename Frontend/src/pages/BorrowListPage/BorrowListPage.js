import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './../../components/NavBar/NavBar';

const BorrowList = () => {
  const [borrowRecords, setBorrowRecords] = useState([]);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);
  const [formData, setFormData] = useState({
    book: {
      id: '',
    },
    user: {
      id: '',
    },
    borrowDate: '',
    returnDate: '',
    returned: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('.')) {
      const [parent, child] = name.split('.');
      setFormData({
        ...formData,
        [parent]: {
          ...formData[parent],
          [child]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  useEffect(() => {
    axios
      .get('http://localhost:8080/borrowrecord')
      .then((response) => {
        setBorrowRecords(response.data);
      })
      .catch((error) => {
        console.error('There was an error when fetching!', error);
      });
  }, []);

  const handleEdit = (record) => {
    setSelectedRecord(record);
    setFormData({
      book: {
        id: record.book.id,
      },
      user: {
        id: record.user.id,
      },
      borrowDate: record.borrowDate,
      returnDate: record.returnDate,
      returned: record.returned,
    });
    setShowModalEdit(true);
  };

  const handleDelete = (record, id) => {
    setSelectedRecord(record);
    setShowModalDelete(true);
  };

  const handleCloseModal = () => {
    setShowModalEdit(false);
    setSelectedRecord(null);
    setShowModalDelete(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/borrowrecord/edit', {
        id: selectedRecord.id,
        ...formData,
      });
      if (response.status === 200) {
        setBorrowRecords((prevRecords) =>
          prevRecords.map((record) => (record.id === selectedRecord.id ? { ...record, ...formData } : record)),
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
      const response = await axios.post(`http://localhost:8080/borrowrecord/delete/${id}`);
      if (response.status === 200) {
        alert('Xóa thành công!');
        setBorrowRecords(borrowRecords.filter((record) => record.id !== id));
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
    <div className="user-table">
      <NavBar />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>UserId</th>
            <th>BookId</th>
            <th>Ngày mượn</th>
            <th>Ngày trả</th>
            <th>Tình trạng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {borrowRecords.map((record) => (
            <tr key={record.id}>
              <td>{record.id}</td>
              <td>{record.user.id}</td>
              <td>{record.book.id}</td>
              <td>{record.borrowDate}</td>
              <td>{record.returnDate}</td>
              <td>{record.returned ? 'Đã trả' : 'Chưa trả'}</td>
              <td>
                <button className="action-btn edit-btn" onClick={() => handleEdit(record)}>
                  Sửa
                </button>
                <button className="action-btn delete-btn" onClick={() => handleDelete(record, record.id)}>
                  Xóa
                </button>
              </td>
            </tr>
          ))}
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
                ID Record:
                <input type="text" value={selectedRecord.id} readOnly />
              </label>
              <label>
                Id Book:
                <input type="number" name="book.id" value={formData.book.id} onChange={handleChange} />
              </label>
              <label>
                Id User:
                <input type="number" name="user.id" value={formData.user.id} onChange={handleChange} />
              </label>
              <label>
                Ngày mượn:
                <input type="date" name="borrowDate" value={formData.borrowDate} onChange={handleChange} />
              </label>
              <label>
                Ngày trả:
                <input type="date" name="returnDate" value={formData.returnDate} onChange={handleChange} />
              </label>
              <label>
                Tình trạng:
                <select name="returned" value={formData.returned} onChange={handleChange}>
                  <option value="true">Đã trả</option>
                  <option value="false">Chưa trả</option>
                </select>
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
              <p>Xác nhận xóa record {selectedRecord.id}</p>
              <div className="del-btn-container">
                <button type="button" onClick={() => handleDeleteSubmit(selectedRecord.id)}>
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

export default BorrowList;
