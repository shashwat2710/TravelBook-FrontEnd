import React, {useState} from 'react'
import { Card, CardActions, CardContent, CardMedia, Button, Typography, ButtonBase } from '@material-ui/core'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbAltOutLined from '@material-ui/icons/ThumbUpAltOutlined'
import DeleteIcon from '@material-ui/icons/Delete'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import moment from 'moment'
import useStyles from './styles'
import { useDispatch } from 'react-redux'
import { deletePost, updateLikeCount } from '../../../actions/posts'
import { useNavigate } from 'react-router-dom'

const Post = ({ post, setCurrentId }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const navigate = useNavigate();
  const [likeCount, setLikeCount] = useState(post?.likeCount);
  const user = JSON.parse(localStorage.getItem('profile'))

  const userId =  user?.result?.googleId || user?.result?._id

  const hasLikedPost = post.likeCount.find((like) =>like === userId)
console.log(hasLikedPost);

  const openPost = () =>{
    navigate(`/posts/${post._id}`)

  }

  const handleLike =async ()=>{
    dispatch(updateLikeCount(post._id))
    if(hasLikedPost){
      setLikeCount(post.likeCount.filter((id)=>id!==userId))
    }else{
      setLikeCount([...post.likeCount, userId]);
    } 
  }

  console.log(hasLikedPost);

  const Like = () => {
    if (likeCount.length > 0) {
      return likeCount.find((like)=>like===userId)
        ? (
          <><ThumbUpAltIcon fontSize='small' />&nbsp;{likeCount.length > 2 ? `You and ${likeCount.length - 1} others` : `${likeCount.length} like${likeCount.length > 2 ? 's' : ''}`}</>
        ) : (<><ThumbUpAltIcon fontSize='small' />&nbsp;{likeCount.length} {likeCount.length === 1 ? 'Like' : 'Likes'}</>)
    }

    return <><ThumbAltOutLined fontSize='small' />&nbsp;Like</>
  }


  return (
    <Card className={classes.card} raised elevation={6}>
      <ButtonBase className={classes.cardAction}
      onClick={openPost}>

      <CardMedia className={classes.media} image={post.selectedFile} title={post.title} />
      <div className={classes.overlay}>
        <Typography variant='body1'>{post.name}</Typography>
        <Typography variant='body2'>{moment(post.createdAt).fromNow()}</Typography>
      </div>
      {(user?.result?.googleId === post?.creator || user?.result?._id=== post?.creator) && (
        <div className={classes.overlay2}>
        <Button style={{ color: 'white' }} size='small'
          onClick={() => setCurrentId(post._id)}>
          <MoreHorizIcon fontSize='medium' />
        </Button>
      </div>
      )}
      <div className={classes.details}>
        <Typography variant="body2" color='textSecondary'>{post.tags.map((tag) => `#${tag} `)}</Typography>
      </div>
      <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
      <CardContent>
        <Typography variant='body2' color='textSecondary' component='p'>{post.message}</Typography>
      </CardContent>
      </ButtonBase>
      <CardActions className={classes.cardActions} >
        <Button size='small' color='primary' disabled={!user} onClick={handleLike}>
          <Like />
        </Button>
        {(user?.result?.googleId === post?.creator || user?.result?._id=== post?.creator) && (

          <Button size='small' color='primary' onClick={() => dispatch(deletePost(post._id))}>
            <DeleteIcon fontSize='small' />
            Delete
          </Button>
        )}
      </CardActions>
    </Card>
  )
}

export default Post