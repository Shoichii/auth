import React from 'react';
import { Form } from './Form';
import '../App.css';
import { Header } from './Header';
import { useAppDispatch, useAppSelector } from '../redux/reduxHooks';
import { regFetch } from '../redux/authSlice';

export const Register: React.FC = () => {
    const dispatch = useAppDispatch();
    const state = useAppSelector(state => state.authSlice);

    const registration = (regData: { email: string, password: string }) => {
        dispatch(regFetch(regData))
    }

    return (
        <>
            <Header />
            <div className='main flex'>
                {state.isReg ?
                    <h1 className='words'>
                        Success
                    </h1>
                    : <Form callBack={registration} buttonName={'Registration'} />}
            </div>
        </>
    )
}