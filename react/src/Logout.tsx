import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Space, Table, Image, Button, Input } from 'antd';
const Logout = () => {
  const history = useNavigate();

  const onHandleLogout = () => {
    const confirm = window.confirm('Ban có chắc muốn đăng xuất không !');
    if (confirm) {
      localStorage.removeItem('token');
      history('/login'); // Chuyển hướng đến trang đăng nhập sau khi đăng xuất
    }
  };

  return (
    <Button onClick={onHandleLogout} type="primary" danger>
      Logout
    </Button>
  );
};
export default Logout;
