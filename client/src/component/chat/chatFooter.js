import React from 'react'
import React, {  useState,useEffect } from 'react';
import { View, TextInput, Button } from 'react-native';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { styles } from './styles';



export default function chatFooter(props) {
    const [messageInput, setMessageInput]=useState('')
  const user=useSelector(state=>state.user.userInfo)


    const sendMessage = (e) => {
        e.preventDefault();
        const newMessage = {
          content: messageInput,
      userId:user?.id,
      roomId:props.roomId,
      createdAt:new Date(),
      users:{
        id:user?.id,
        firstName:user?.firstName
      }
      
          
        };
      
       
        axios.post('http://localhost:3000/api/chat', newMessage)
        .then(response => {
          console.log('Message saved successfully:', response.data);
          setMessageInput('');
          
        
        })
        .catch(error => {
          console.error('Error saving message:', error);
        });
        if (props.socket) {
          props.socket.emit('send_message', newMessage);
        }
        props.scrollToBottom()
        setMessageInput('');
      
      };


  return (
    <View style={styles.footer}>
    <View style={styles.form}>
      <TextInput
        style={styles.messageInput}
        placeholder="Write message"
        value={messageInput}
        onChangeText={e=>setMessageInput(e.target.value)}
      />
      <Button title="SEND" onPress={sendMessage} />
    </View>
  </View>
  )
}

const styles = {
    footer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 10,
      paddingVertical: 5,
      backgroundColor: '#f0f0f0',
    },
    form: {
      flexDirection: 'row',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    messageInput: {
      flex: 1,
      paddingHorizontal: 10,
      paddingVertical: 8,
      backgroundColor: '#fff',
      borderRadius: 20,
      marginRight: 10,
    },
  };