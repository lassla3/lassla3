import React from 'react'
import React, { useEffect, useState,useRef} from 'react';
import { View, Text, StyleSheet, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useSelector } from 'react-redux';
import { styles } from './styles';



export default function chatBody() {
    const User=useAppSelector((state) => state.user.userInfo);
    const chatContainerRef = useRef(null);
    const [messages, setMessages] = useState(props.rooms.rooms.messages);

    useEffect(() => {
        props.socket.on('connect', () => {
          console.log('Connected to server');
        });
        props.socket.emit('join',props.rooms.rooms.id );
      if (!props.socket) console.log("not connected to sockete");
      
      
      props.socket.on('message', (data) => {
        console.log('data is ready',data);
        setMessages((prevMessages) => [...prevMessages, data]);
      });
      
      return () => props.socket.off('message');
      }, []);

      const scrollToBottom = () => {
        if (chatContainerRef.current) {
          
          chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
      };


  return (
    <View style={styles.main}>
    <View style={styles.header}>
      <Text style={styles.headerText}>{User?.firstName}</Text>
      <Icon
        name="arrow-forward-outline"
        size={24}
        color="black"
        onPress={() => Linking.openURL('/')} 
        style={styles.leaveChatBtn}
      />
    </View>
    <View style={styles.container}>
      {messages.map((message) => (
        <View ref={chatContainerRef} style={styles.chatsContainer} key={message.id}>
          <Text style={styles.senderName}>{message.users.firstName}</Text>
          <View style={styles.message}>
            <Text>{message.content}</Text>
          </View>
        </View>
      ))}
      <View style={styles.status}>
        <Text></Text>
      </View>
    </View>
    <ChatFooter scrollToBottom={scrollToBottom} roomId={rooms.rooms.id} socket={socket} />
  </View>
  )
}
const styles = StyleSheet.create({
    main: {
      flex: 1,
    },
    header: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 10,
    },
    headerText: {
      fontSize: 20,
      fontWeight: 'bold',
    },
    leaveChatBtn: {
      paddingHorizontal: 10,
    },
    container: {
      flex: 1,
    },
    chatsContainer: {
      padding: 10,
    },
    senderName: {
      fontWeight: 'bold',
      marginBottom: 5,
    },
    message: {
      backgroundColor: '#f0f0f0',
      padding: 10,
      borderRadius: 10,
    },
    status: {
      padding: 10,
      alignItems: 'center',
    },
  });
