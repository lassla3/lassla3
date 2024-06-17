import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { styles } from './styles';



export default function chatBar(props) {

  return (
    <View style={styles.sidebar}>
    <Text style={styles.title}>Chats</Text>
    {rooms.map((room) => (
      <View key={room.id}>
        <Text style={styles.header}>ACTIVE USERS</Text>
        <View style={styles.usersContainer}>
          {room.users.map((user) => (
            id !== user.id && (
              <TouchableOpacity
                style={styles.userButton}
                onPress={() => changeView(room.id)}
                key={user.id}
              >
                <Text>{user.firstName}</Text>
              </TouchableOpacity>
            )
          ))}
        </View>
      </View>
    ))}
  </View>
  )
}
const styles = StyleSheet.create({
    sidebar: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    header: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
    },
    usersContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
    },
    userButton: {
      backgroundColor: '#f0f0f0',
      padding: 10,
      margin: 5,
      borderRadius: 10,
    },
  });
