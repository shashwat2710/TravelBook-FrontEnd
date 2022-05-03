import React, { useState, useEffect, useCallback } from 'react'
import { Link } from 'react-router-dom';
import { AppBar, Avatar, Toolbar, Typography, Button } from '@material-ui/core'
import useStyles from './Styles';
import { TravelBook } from '../../images'
import { useNavigate, useLocation } from 'react-router-dom';
import {useDispatch} from 'react-redux'
import decode from 'jwt-decode'
const Navbar = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('profile')));
    const logoutHandler = useCallback(() =>{
        
        dispatch({type:'LOGOUT',})
        setUser(null)
        navigate('/auth')

    },[dispatch, navigate])
    useEffect(() => {
        if (user) {
            //JWT token if manual authentication

            const token = user?.token;
            if(token){
                const decodedToken = decode(token)
                if(decodedToken.exp * 1000 < new Date().getTime()){
                    logoutHandler();
                }
            }
        }
        setUser(JSON.parse(localStorage.getItem('profile')))
    }, [user, location, logoutHandler])


    return (
        <AppBar className={classes.appBar} position='static' color='inherit'>
            <div className={classes.brandContainer} >
                <Typography component={Link} to='/' className={classes.header} variant='h2' align='center'>TravelBook</Typography>
                <img className={classes.image} src={TravelBook} alt='travelbook' height='60' />
            </div>
            <Toolbar className={classes.toolbar}>
                {user ? (
                    <div className={classes.profile}>
                        <Avatar className={classes.purple} alt={user.result.name} src={user.result.imageUrl}>{user.result.name.charAt(0)}</Avatar>
                        <Typography className={classes.userName} variant='h6'>{user.result.name}</Typography>
                        <Button variant='contained' className={classes.logout} color='secondary' onClick={logoutHandler}>Logout</Button>
                    </div>
                ) : (
                    <Button component={Link} to='/auth' variant='contained' color='primary'>Login</Button>

                )}
            </Toolbar>
        </AppBar>
    )
}

export default Navbar