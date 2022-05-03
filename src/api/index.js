import axios from 'axios'

const API = axios.create({baseURL: 'https://travelbook-backend.herokuapp.com'})

API.interceptors.request.use((req)=>{
    if(localStorage.getItem('profile')){
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})
export const fetchPosts = (page)=>API.get(`/posts?page=${page}`);
export const getPostBySearch = (searchQuery)=>API.get(`/posts/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags || 'none'}`)
export const fetchPostById = (id) => API.get(`/posts/${id}`);
export const createPost = (newPost)=>API.post('/posts', newPost);
export const updatePost = (currId, updatePost)=> API.patch(`/posts/${currId}`,updatePost);
export const deletePost =  (currId) => API.delete(`/posts/${currId}`)
export const updateLikeCount =  (currId) => API.patch(`/posts/${currId}/likePost`)
export const comment = (value, id) => API.post(`/posts/${id}/commentPost`, {value})

export const login = (formData)=>API.post('/auth/login', formData);
export const signup = (formData)=>API.post('/auth/signup', formData);
