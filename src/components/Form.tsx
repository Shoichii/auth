import React from 'react';
import '../App.css';
import { Button, FormLabel, TextField, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useAppSelector } from '../redux/reduxHooks';
import { useAppDispatch } from '../redux/reduxHooks';
import { changeEmail, changePassword, falseFields } from '../redux/formSlice';

const useStyles = makeStyles({
    flex: {
        display: 'flex',
        flexDirection: 'column',
        margin: '50px',
    },
    textFields: {
        margin: '15px',
    }
})

interface IProps {
    buttonName: string;
    callBack: ({ email, password }: { email: string, password: string }) => void
}

export const Form: React.FC<IProps> = props => {
    const classes = useStyles();
    const state = useAppSelector(state => state.formSlice);
    const authState = useAppSelector(state => state.authSlice);
    const dispatch = useAppDispatch();

    const typeLoginText = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        dispatch(changeEmail(e.currentTarget.value))
    }

    const typePasswordText = (e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        dispatch(changePassword(e.currentTarget.value))
    }

    const sendData = (): void => {
        props.callBack({ email: state.email, password: state.password });
        dispatch(changeEmail(''))
        dispatch(changePassword(''))
        dispatch(falseFields());
    }

    return (
        <div className='mainPage'>
            <FormLabel className={classes.flex} component='form' color='primary'>
                <TextField className={classes.textFields} id="standard-basic" label="email" type='text'
                    value={state.email} onChange={e => typeLoginText(e)} error={state.isErrorEmail} />
                {state.isErrorEmail && <Typography variant="body2" align='center' color='error'>wrong email</Typography>}


                <TextField className={classes.textFields} id="standard-basic" label="password" type='password'
                    value={state.password} onChange={e => typePasswordText(e)} error={state.isErrorPassword} />
                {state.isErrorPassword &&
                    <>
                        <Typography variant="body2" align='center' color='error'>minimum 8 symbols</Typography>
                        <Typography variant="body2" align='center' color='error'>miaximum 20 symbols</Typography>
                        <Typography variant="body2" align='center' color='error'>a-z & A-Z</Typography>
                    </>
                }

                <Button className={classes.textFields} variant="contained"
                    onClick={() => sendData()}>{props.buttonName}</Button>
                    {authState.wrongEmailOrPass && 
                    <Typography variant="body2" align='center' color='error'>wrong email or password</Typography>}
                    
            </FormLabel>
        </div>
    )
}
