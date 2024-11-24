import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from '../../components/NavBar/NavBar';
import './EditUsersPage.css';

const EditUsersPage = () => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalDelete, setShowModalDelete] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()),
  );

  const handleEdit = (user) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      address: user.address,
      phone: user.phone,
    });
    setShowModalEdit(true);
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowModalDelete(true);
  };

  const handleCloseModal = () => {
    setShowModalEdit(false);
    setSelectedUser(null);
    setShowModalDelete(false);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/users/edit', {
        id: selectedUser.id,
        ...formData,
      });

      if (response.status === 200) {
        setUsers((prevUsers) =>
          prevUsers.map((user) => (user.id === selectedUser.id ? { ...user, ...formData } : user)),
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
      const response = await axios.post(`http://localhost:8080/users/delete/${id}`);
      if (response.status === 200) {
        alert('Xóa thành công!');
        setUsers(users.filter((user) => user.id !== id));
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
            <th>Tên</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Số điện thoại</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.address}</td>
                <td>{user.phone}</td>
                <td>
                  <button className="action-btn edit-btn" onClick={() => handleEdit(user)}>
                    Sửa
                  </button>
                  <button className="action-btn delete-btn" onClick={() => handleDelete(user)}>
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
                ID User:
                <input type="text" value={selectedUser.id} readOnly />
              </label>
              <label>
                Tên:
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              </label>
              <label>
                Email:
                <input type="text" name="email" value={formData.email} onChange={handleChange} />
              </label>
              <label>
                Địa chỉ:
                <input type="text" name="address" value={formData.address} onChange={handleChange} />
              </label>
              <label>
                Số điện thoại:
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} />
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
              <p>Xác nhận xóa người dùng {selectedUser.name}</p>
              <div className="del-btn-container">
                <button type="button" onClick={() => handleDeleteSubmit(selectedUser.id)}>
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

export default EditUsersPage;
