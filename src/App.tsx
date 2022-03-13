import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import { Login } from './components/Login';
import { useAppSelector, useAppDispatch } from './redux/reduxHooks';
import { Home } from './components/Home';
import { Register } from './components/Register';
import { reloaded } from './redux/authSlice';

export const App: React.FC = () => {
  const state = useAppSelector(state => state.authSlice);
  const dispatch = useAppDispatch();

  if(localStorage.getItem('isAuth')) {
    dispatch(reloaded());
  }
  
  if (!state.isAuth && localStorage.getItem('isAuth') !== '200') {
    return (
      <div className='main'>
        <Routes>
          <Route path="/*" element={<Navigate replace to='/login' />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    )
  }
  
  return (
    <div className='main'>
      <Routes>
        <Route path="/login" element={<Navigate replace to='/' />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  )
}
