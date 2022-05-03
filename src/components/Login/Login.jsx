import React , {useState} from 'react'
import { Avatar, Button, Paper, Grid, Typography, Container } from '@material-ui/core'
import {GoogleLogin} from 'react-google-login'
import LockOutLinedIcon from '@material-ui/icons/LockOutlined'
import useStyle  from './Styles'
import Input from './Input'
import Icon from './Icon'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {signup, login} from '../../actions/auth'

const initialState = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPass: '',

}
const Login = () => {
    const classes =  useStyle();
    const navigate =  useNavigate();
    const [showPass, setShowPass] = useState(false)
    const [isSignUp, setIsSignUp] = useState(false)
    const [formData, setFormData] = useState(initialState);
    const dispatch = useDispatch()
    const handleChange = (event)=>{
        setFormData({...formData, [event.target.name]:event.target.value})
    }
    const handleSubmit = (event)=>{
        event.preventDefault();
        if(isSignUp){
            dispatch(signup(formData, navigate))
        }
        else{
            dispatch(login(formData, navigate))
        }

    }
    const googleSuccess =async (res)=>{
        const result  =  res.profileObj;
        const token =  res.tokenId;
        try{
            dispatch({type: 'AUTH', data:{result, token}});
            navigate('/');

        }catch(err){
            console.log(err)
        }
    }
    const googleFailure = (err)=>{console.log(err);console.log('Google Sign In was unsucessfull')}
    const switchMode = () =>setIsSignUp((prevState)=>!prevState)
    const handleShowPassword = () => setShowPass((prevState)=> !prevState)
  return (
    <Container component='main' maxWidth='xs' >
        <Paper className={classes.paper} elevation={3}>
            <Avatar  className={classes.avatar}>
                <LockOutLinedIcon />
            </Avatar>
            <Typography variant='h5'>{isSignUp? 'Sign Up':'Login'}</Typography>
            <form  className={classes.form} onSubmit={handleSubmit}>
                <Grid container spacing={2}>
                    {
                        isSignUp  && (
                            <>
                            <Input name='firstName' label='First Name' handleChange={handleChange} autoFocus half/>
                            <Input name='lastName' label='Last Name' handleChange={handleChange} half/>
                            </>
                        )
                    }
                <Input name='email' label='Email' handleChange={handleChange} type='email' />
                <Input name='password' label='Password' handleChange={handleChange} type={showPass ? 'text': 'password'} handleShowPassword={handleShowPassword}/>
                {isSignUp && <Input name='confirmPass' label='Confirm Password' handleChange={handleChange} type='password' />}
                </Grid>
                <Button type='submit' fullWidth variant='contained' color='primary' className={classes.submit} >{isSignUp? 'Sign Up': 'Log In'}</Button>
                <GoogleLogin 
                    clientId='110842954751-abk0bsloph939elvqnl2chjc47vqobrm.apps.googleusercontent.com'
                    render={(renderProps)=>(
                        <Button className={classes.googleButton} color='primary' fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled} startIcon={<Icon />} variant='contained'>Google Sign In</Button>
                    )}
                    onSuccess={googleSuccess}
                    onFailure={googleFailure}
                    cookiePolicy='single_host_origin'/>
                <Grid container justifyContent='flex-end'>
                    <Grid item>
                        <Button onClick={switchMode}>{
                            isSignUp? 'Already have an account? Login':'Create a new account'
                        }</Button>
                    </Grid>
                </Grid>

            </form>


        </Paper>

    </Container>
  )
}

export default Login;