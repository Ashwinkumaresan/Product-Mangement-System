import React from 'react'
import { Link, useNavigate } from 'react-router-dom';

export const Home = () => {
  const navigate = useNavigate();
  const userName =  localStorage.getItem('name');
  const logOut =() => {
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    navigate("/");
  }
  return (
    <>
    <div className='signup'>
    <div className='container d-flex flex-column align-items-center'>
      <h1 style={styles.heading}>Product's Mart</h1>
      <p style={styles.message}>Welcome, <span style={styles.span}>{userName}</span></p>
      <Link to="/product" className='btn btn-primary m-2 w-100'>View products</Link>
      <button className='btn btn-outline-dark m-2 w-100' style={styles.btnL} onClick={logOut}>Log out</button>
    </div>
    </div>
    </>
  );
};

const styles = {
  heading: {
    fontSize: '3rem',
    color: 'green',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.25rem',
    color: '#333',
    marginBottom: '2rem',
  },
  span: {
    fontWeight: '600',
  },
};

