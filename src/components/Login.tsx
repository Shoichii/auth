import React from 'react';
import { Form } from './Form';
import '../App.css';
import { useAppDispatch } from '../redux/reduxHooks';
import { authFetch } from '../redux/authSlice';
import { Header } from './Header';

export const Login: React.FC = () => {
    const dispatch = useAppDispatch();

    const logIn = (login: { email: string, password: string }) => {
        dispatch(authFetch(login))
    }

    return (
        <>
            <Header />
            <div className='main flex'>
                <Form callBack={logIn} buttonName={'Log In'} />
            </div>
        </>

    )
}