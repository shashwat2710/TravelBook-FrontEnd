import React from 'react'
import {Container} from '@material-ui/core'
import Navbar from './components/Navbar/Navbar.jsx';
import Home from './components/Home/Home.jsx';
import Login  from './components/Login/Login.jsx';
import PostDetails from './components/PostDetails/PostDetail.jsx';
import {Routes, Route, Navigate} from 'react-router-dom'

function App() {
  const user =  JSON.parse(localStorage.getItem('profile'));
  return (
    <Container maxWidth="xl">
      <Navbar />
      <Routes>
        <Route path='/' element={<Navigate replace to='/posts'/>} />
        <Route  path='/posts' element={<Home />}/>
        <Route  path='/posts/search' element={<Home />}/>
        <Route  path='/posts/:id' element={<PostDetails />}/>
        <Route path='/auth' element={(!user?<Login />:<Navigate replace to='/posts' />)} />
      </Routes>
    </Container>
  );
}

export default App;