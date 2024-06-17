import axios from 'axios'
import { createAsyncThunk } from '@reduxjs/toolkit'



export const oneUser = createAsyncThunk(
    'auth/currentUser',
    async (token) => {
      try {
        
        
        const {data} = await axios.get(
          `http://192.168.104.2:3000/api/user/user`,
          {headers:{"Authorization":`Bearer ${token}`}}
          
         
        )
        
       
        return data
      } catch (error) {
      
      
          return error.response.data.message
     
      
    }}
  )

  export const getRoomByUserId = createAsyncThunk(
    'auth/room',
    async (userId) => {
      try {
        
        
       const {data} = await axios.get(`http://localhost:3000/api/chat/room/${userId}`)
        
       console.log("data from the server room",data);
       
        return data
      } catch (error) {
      
        if (error.response && error.response.data.message) {
          error.response.data.message
       
      }
         }   }
  )
  export const addMessage = createAsyncThunk(
    'auth/message',
    async (obj, { rejectWithValue }) => {
      try {
        
        
       const {data} = await axios.post(`http://localhost:3000/api/chat/`,obj)
        
       console.log(data);
       
        return data
      } catch (error) {
      
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          console.log(error);
          return rejectWithValue(error.message)
        }
      }
    }
  )
  

  export const getAllMessages = createAsyncThunk(
    'auth/Allmessage',
    async (roomId, { rejectWithValue }) => {
      try {
        
        
       const {data} = await axios.get(`http://localhost:3000/api/chat/${roomId}`)
        
       console.log(data);
       
        return data
      } catch (error) {
      
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          console.log(error);
          return rejectWithValue(error.message)
        }
      }
    }
  )
  export const createRoom = createAsyncThunk(
    'auth/createRoom',
    async (params, { rejectWithValue }) => {
      try {
        
        
       const {data} = await axios.post(`http://localhost:3000/api/chat/${params}`)
        
       console.log(data);
       
        return data
      } catch (error) {
      
        if (error.response && error.response.data.message) {
          return rejectWithValue(error.response.data.message)
        } else {
          console.log(error);
          return rejectWithValue(error.message)
        }
      }
    }
  )