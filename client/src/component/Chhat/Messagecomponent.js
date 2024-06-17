import { StyleSheet, Text, View, Image } from "react-native";

export default function Messagecomponent({ currentUser, item }) {
  const currentUserStatus = item.currentUser !== currentUser;

  console.log(currentUserStatus, item);

  return (
    <View style={currentUserStatus ? {} : { alignItems: "flex-end" }}>
      <View style={styles.messageItemWrapper}>
        <Text>{item.currentUser}</Text>
        <View style={styles.messageItemInnerWrapper}>
          {item.text ? (
            <View
              style={
                currentUserStatus
                  ? styles.messageItem
                  : [styles.messageItem, { backgroundColor: "#DCE2FC" }]
              }
            >
              <Text
                style={
                  currentUserStatus ? { color: "#161618" } : { color: "#161618" }
                }
              >
                {item.text}
              </Text>
            </View>
          ) : null}
          {item.image ? (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri:  item.image }} // Check if the image is an array or a string
                style={styles.image} // Adjust width, height, and margin as needed
              />
            </View>
          ) : null}
        </View>
        <Text style={styles.messageTime}>{item.time}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  messageItemWrapper: {
    maxWidth: "60%",
    marginBottom: 15,
  },
  messageItemInnerWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  messageItem: {
    width: "100%",
    height: 60,
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 2,
  },
  messageTime: {
    marginLeft: 10,
  },
  imageContainer: {
    alignItems: "center",
  },
  image: {
    width: 200,
    height: 200,
    margin: 5,
  },
});