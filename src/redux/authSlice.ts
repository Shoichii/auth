import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

export const authFetch = createAsyncThunk(
    'authSlice/authFetch',
    async function (login: { email: string, password: string }) {
        const res = await fetch('https://reqres.in/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(login)
        });
        return res.status
    }
)

export const regFetch = createAsyncThunk(
    'authSlice/regFetch',
    async (regData: { email: string, password: string }) => {
        const res = await fetch('https://reqres.in/api/register', {
            method: 'POSt',
            headers: {
                'Content-type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(regData)
        });
        return res.status
    }
)


interface IinitialState {
    isAuth: boolean;
    isReg: boolean;
    wrongEmailOrPass: boolean;
}

// Define the initial state using that type
const initialState: IinitialState = {
    isAuth: false,
    isReg: false,
    wrongEmailOrPass: false,
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        logOut: state => {
            state.isAuth = false;
            localStorage.clear();
        },
        reloaded: state => {state.isAuth = true}
    },
    extraReducers: builder => {
        builder.addCase(authFetch.fulfilled, (state, action) => {
            if (action.payload === 200) {
                localStorage.setItem('isAuth', '200');
                state.isAuth = true;
                state.isReg = false;
                state.wrongEmailOrPass = false;
            } else {
                state.wrongEmailOrPass = true;
            }
        });
        builder.addCase(regFetch.fulfilled, (state, action) => {
            if (action.payload === 200) {
                state.isReg = true
            }
        });
    },
})

export const { logOut, reloaded } = authSlice.actions;
