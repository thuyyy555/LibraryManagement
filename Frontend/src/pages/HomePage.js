import React from 'react';
import NavBar from '../components/NavBar/NavBar';
import DashBoard from '../components/DashBoard/DashBoard';

const HomePage = () => {
  return (
    <div className="home-page">
      <NavBar />
      <DashBoard />
    </div>
  );
};

export default HomePage;
