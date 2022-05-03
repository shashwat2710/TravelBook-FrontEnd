import { FETCH_ALL, CREATE, UPDATE, DELETE, FETCH_BY_SEARCH, START_LOADING, END_LOADING, FETCH_BY_ID , COMMENT} from '../constants/actionTypes';
import * as api from '../api';

//Action creators
export const getPosts = (page)=> async(dispatch)=> {
    try{
        dispatch({type: START_LOADING})
        const {data} = await api.fetchPosts(page);
        dispatch({type: FETCH_ALL, payload: data});
        dispatch({type: END_LOADING})

    }catch (err){
        console.log(err)
    }    
}

export const getPost = (id) => async(dispatch) =>{
    try{
        dispatch({type: START_LOADING})
        const {data} =  await api.fetchPostById(id);
        dispatch({type: FETCH_BY_ID, payload: data.data})
        dispatch({type: END_LOADING})
    }catch(err){
        console.log(err);
    }

}

export const getPostBySearch = (searchQuery) =>async(dispatch)=>{
    try{
        dispatch({type: START_LOADING})
        const {data}=  await api.getPostBySearch(searchQuery);
        dispatch({type: FETCH_BY_SEARCH, payload: data})
        dispatch({type: END_LOADING})

    }catch(err){
        console.log(err)
    }
}

export const createPost = (post, navigate)=> async(dispatch) =>{
    try{
        dispatch({type: START_LOADING})
        const {data} =  await api.createPost(post);
        console.log(data);
        navigate(`/posts/${data._id}`)
        dispatch({type: CREATE, payload: data });
        dispatch({type: END_LOADING})
    }   
    catch(err){
        console.log(err)
    }
}

export const updatePost =  (currentId, post) => async(dispatch)=>{
    try{
        const {data} =  await api.updatePost(currentId, post);
        dispatch({type: UPDATE, payload: data})
    }
    catch(err){
        console.log(err)    
    }
}

export const deletePost = (currId) => async(dispatch)=>{
    try{
        await api.deletePost(currId);
        dispatch({type: DELETE, payload: currId})
    }
    catch(err){
        console.log(err)
    }
}

export const updateLikeCount = (currId) =>  async(dispatch) =>{
    try{
        const {data} = await api.updateLikeCount(currId);
        dispatch({type:'UPDATE', payload: data})
        
    } catch(err){
        console.log(err)
    }
}

export const commentPost = (value, id) => async(dispatch)=>{
    try{
        const {data} = await api.comment(value, id)
        dispatch({type: COMMENT, payload: data})
        return data.comments
    }catch(err){
        console.log(err.response)
    }
}

