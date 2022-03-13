import { AppBar, Button, makeStyles, Toolbar, Typography } from "@material-ui/core"
import { NavLink } from "react-router-dom";
import { logOut } from "../redux/authSlice";
import { useAppSelector } from "../redux/reduxHooks";
import { useAppDispatch } from '../redux/reduxHooks';

const useStyles = makeStyles({
    flex: {
        display: 'flex',
        justifyContent: 'space-between'
    }
})

export const Header: React.FC = () => {
    const classes = useStyles();
    const state = useAppSelector(state => state.authSlice);
    const dispatch = useAppDispatch();

    const logOutButton = (): void => {
        dispatch(logOut())
    }

    return (
        <AppBar position="static" color='secondary'>
            <Toolbar className={classes.flex}>
                <Typography variant="h6">
                    Authorization
                </Typography>
                {!state.isAuth && localStorage.getItem('isAuth') !== '200' ?
                    <div>
                        <Button color="inherit">
                            <NavLink to="/login" className='link'>Log In</NavLink>
                        </Button>
                        <Button color="inherit">
                            <NavLink to="/register" className='link'>Regitration</NavLink>
                        </Button>
                    </div>
                    :
                    <Button onClick = {logOutButton} color="inherit">
                        Log Out
                    </Button>
                }


            </Toolbar>
        </AppBar>
    )
}