import React, { useState, useEffect } from 'react'
import useStyles from './styles'
import { TextField, Button, Typography, Paper } from '@material-ui/core'
import FileBase from 'react-file-base64'
import { useDispatch, useSelector } from 'react-redux'
import {useNavigate} from 'react-router-dom'
import { createPost, updatePost } from '../../actions/posts'

const initialPostData= {title: '', message: '', tags: '', selectedFile: ''} 

function Form({currentId, setCurrentId}) {
  const dispatch =  useDispatch()
  const navigate =  useNavigate()
  const [postData, setPostData] = useState(initialPostData)
  const post = useSelector((state)=> currentId ? state.posts.posts.find((p)=> p._id===currentId): null);
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('profile'));
  useEffect(()=>{
    if(post){
      setPostData(post);
    }
  }, [post])

  const handleSubmit = (event) => {
    event.preventDefault();

    if(currentId){
      dispatch(updatePost(currentId,{...postData, name: user.result.name}));
    } else{
      dispatch(createPost({...postData, name: user.result.name }, navigate))
    }
    clear();
  }
  const clear = () =>{
    setCurrentId(null);
    setPostData(initialPostData)
  }

  if(!user?.result){
    return (<Paper className={classes.paper} elevation={6}>
      <Typography variant='h6' align='center'>
        Please Sign in to create your own Travel Dairy
      </Typography>
    </Paper>)
  }
  return (
    <Paper className={classes.paper}>
      <form autoComplete='off' noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
        <Typography variant='h6'>{currentId?'Editing':'Creating'} a Travel Post</Typography>
        <TextField name='title' variant='standard' label='Title' fullWidth value={postData.title} onChange={(e)=>setPostData({...postData, title: e.target.value})} />
        <TextField name='message' variant='standard' label='Message' fullWidth value={postData.message} onChange={(e)=>setPostData({...postData, message: e.target.value})} />
        <TextField name='tags' variant='standard' label='Tags' fullWidth value={postData.tags} onChange={(e)=>setPostData({...postData, tags: e.target.value.split(',')})} />
        <div className={classes.fileInput}>
          <FileBase
          type="file"
          multiple={false}
          onDone={({base64})=>setPostData({...postData, selectedFile: base64})}></FileBase>
        </div>
        <Button className={classes.buttonSubmit} variant='contained' color='primary' type='submit' size='large' fullWidth>Submit</Button>
        <Button variant='contained' color='secondary' size='large' onClick={clear} fullWidth>Clear</Button>

      </form>
    </Paper>
  )
}

export default Form