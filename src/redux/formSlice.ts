import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IinitialState {
    email: string;
    password: string;
    isErrorEmail: boolean;
    isErrorPassword: boolean;
}

const initialState: IinitialState = {
    email: '',
    password: '',
    isErrorEmail: false,
    isErrorPassword: false,
}

export const formSlice = createSlice({
    name: 'formSlice',
    initialState,
    reducers: {
        changeEmail: (state, action: PayloadAction<string>) => {
            let checkEmail = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            state.email = action.payload
            
            !checkEmail.test(action.payload) ? state.isErrorEmail = true 
                                            : state.isErrorEmail = false;
        },
        changePassword: (state, action: PayloadAction<string>) => {
            let checkPass = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=(.*[a-zA-Z])).{8,20}$/;
            state.password = action.payload
            !checkPass.test(action.payload) ? state.isErrorPassword = true 
                                            : state.isErrorPassword = false;
        }, 
        falseFields: state => {
            state.isErrorEmail = false;
            state.isErrorPassword = false;
        }
    }

})

export const {changeEmail, changePassword, falseFields} = formSlice.actions;