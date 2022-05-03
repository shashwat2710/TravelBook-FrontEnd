/* eslint-disable no-unused-vars */
import React, { useState} from 'react'
import { Grid, Container, Grow, Paper, AppBar, TextField, Button } from '@material-ui/core'
import { useNavigate, useLocation } from 'react-router-dom'
import Posts from '../Posts/Posts.jsx'
import Form from '../Form/Form.jsx'
import { useDispatch } from 'react-redux'
import { getPostBySearch } from '../../actions/posts.js'
import useStyles from './styles'
import Paginate from '../Pagination.jsx'
import ChipInput from 'material-ui-chip-input'

function useQuery() {
  return new URLSearchParams(useLocation().search);

}

const Home = () => {
  const [currentId, setCurrentId] = useState(null)
  const [search, setSearch] = useState("")
  const [tags, setTags] = useState([])
  const classes = useStyles();
  const dispatch = useDispatch();
  const query = useQuery();
  const page = query.get('page') || 1;
  const navigate = useNavigate();
  const searchQuery = query.get('searchQuery');

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      //Search for post
      searchPost()
    }
  }
  const handleAdd = (tag)=>setTags([...tags, tag])
  const handleDelete = (tagToDelete)=>setTags(tags.filter((tag)=> tag!== tagToDelete))
  const searchPost = (event)=>{
    if(search.trim() || tags){
      //dispach => fetch search post
      dispatch(getPostBySearch({search,tags:tags.join(',')}))
      navigate(`/posts/search?searchQuery=${search || 'none'}&tags=${tags.join(",")}`)
    }
    else{
      navigate('/', {replace: true})
    }
  }
  return (

    <Grow in>
      <Container maxWidth='xl'>
        <Grid className={classes.gridContainer} container justifyContent='space-between' alignItems='stretch' spacing={3}>
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
              <TextField
                name='search'
                variant='outlined'
                label='Search Travel Book'
                fullWidth
                value={search}
                onKeyPress={handleKeyPress}
                onChange={(e) => { setSearch(e.target.value) }}
              />
              <ChipInput style={{ margin: '10px 0' }}
                value={tags}
                onAdd={handleAdd}
                onDelete={handleDelete}
                label='Search Tags'
                variant='outlined' />
              <Button onClick={searchPost} className={classes.searchButton} variant='contained' color='primary'>Search Post</Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {(!searchQuery && !tags.length) && (
            <Paper className={classes.pagination} elevation={6}>
              <Paginate  page={page} />
            </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home;