import React, { useContext, useEffect, useState } from "react";
import { FlatList, Keyboard, Pressable, StyleSheet, Text, TextInput, View, Image } from "react-native";
import { GlobalContext } from "../context";
import Messagecomponent from "../src/component/Chhat/Messagecomponent";
import { socket } from "../utils/index";
import { launchImageLibrary } from 'react-native-image-picker';
import { cloud_name, preset } from "../src/apAdress";
import Icon from 'react-native-vector-icons/MaterialIcons';

export default function Messagescreen({ navigation, route }) {
  const { currentGroupName, currentGroupID } = route.params;
  const { allChatMessages, setAllChatMessages, currentUser, currentChatMesage, setCurrentChatMessage } = useContext(GlobalContext);
  const [selectedImage, setSelectedImage] = useState(null);
  

  const imageHandler = async (imageAsset) => {
    const form = new FormData();
    form.append("file", {
      uri: imageAsset.uri,
      type: imageAsset.type,
      name: imageAsset.fileName || 'photo.jpg'
    });
    form.append("upload_preset", preset);
    form.append("cloud_name", cloud_name);

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, {
      method: 'POST',
      body: form
    });
    const data = await res.json();
    return data.secure_url;
  };

  const pickImage = () => {
    const options = {
      selectionLimit: 0,
      mediaType: 'photo'
    };

    launchImageLibrary(options, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        try {
          const uploadPromises = response.assets.map(imageAsset => imageHandler(imageAsset));
          const imageUris = await Promise.all(uploadPromises);
          setSelectedImage(imageUris[0]); 
        } catch (error) {
          console.log('Error uploading images:', error);
        }
      }
    });
  };

  

  function handleAddNewMessage() {
    const timeData = {
      hr: new Date().getHours() < 10 ? `0${new Date().getHours()}` : new Date().getHours(),
      mins: new Date().getMinutes() < 10 ? `0${new Date().getMinutes()}` : new Date().getMinutes(),
    };

    if (currentUser) {
      socket.emit("newChatMessage", {
        currentChatMesage,
        groupIdentifier: currentGroupID,
        currentUser,
        timeData,
        image: selectedImage,
      });
      setSelectedImage(null);
      setCurrentChatMessage("");
      Keyboard.dismiss();
    }
  }

  useEffect(() => {
    socket.emit('findGroup', currentGroupID)
    socket.on('foundGroup', (allChats) => setAllChatMessages(allChats))
  }, [socket])

  const ImageIcon = <Icon size={25} name='add-a-photo' />;

  return (
    <View style={styles.wrapper}>
      <View style={[styles.wrapper, { paddingVertical: 15, paddingHorizontal: 10 }]}>
        {allChatMessages && allChatMessages[0] ? (
          <FlatList
            data={allChatMessages}
            renderItem={({ item }) => (
              <Messagecomponent item={item} currentUser={currentUser} />
            )}
            keyExtractor={(item) => item.id}
          />
        ) : (
          ""
        )}
      </View>
      <View style={styles.messageInputContainer}>
        <TextInput
          style={styles.messageInput}
          value={currentChatMesage}
          onChangeText={(value) => setCurrentChatMessage(value)}
          placeholder="Enter your message"
        />
        {selectedImage && (
          <Image
            source={{ uri: selectedImage }}
            style={styles.selectedImage}
          />
        )}
        <Text onPress={pickImage} style={{color:"black"}}>{ImageIcon}</Text>
       
        <Pressable onPress={handleAddNewMessage} style={styles.button}>
          <View>
            <Icon name="send" color='black' style={styles.buttonText}/>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#eee",
  },
  messageInputContainer: {
    width: "100%",
    backgroundColor: "#fff",
    paddingVertical: 30,
    paddingHorizontal: 15,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  messageInput: {
    borderWidth: 1,
    padding: 15,
    flex: 1,
    borderRadius: 50,
    marginRight: 10,
  },
  button: {
    width: "15%",
    // backgroundColor: "#112678",
    
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginVertical:10,
  },
  buttonText: {
    // height:'22%',
    color: "#112678",
    fontSize:20,
  },
  selectedImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
    marginVertical: 10,
    marginRight:10
  },
 
});