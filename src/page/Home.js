import React from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/page/question');
  };

  return (
    <div className='dark-mode welcome-screen'>
      <div className='border p-5 welcome-hover'style={{ borderRadius: '10px', }}>
        <h1>Welcome MasterNova</h1>
        <button className='btn btn-outline-light' onClick={handleClick}>Click Me</button>
      </div>
    </div>
  );
};

export default Home;
