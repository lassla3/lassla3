
const express = require('express');
const app = express();
const cors = require('cors');
const { Server } = require('socket.io'); 
const http =require('http').Server(app);

const server = http.createServer(app); 


const socketIO = require("socket.io")(http, {
    cors: {
      origin: "http://10.0.2.2:3000/",
    },
  });

  socketIO.on("chatConnection", (socket) => {
    console.log(`${socket.id} user is just to chat `);
  
    socket.on("getAllGroups", () => {
      socket.emit("groupList", chatgroups);
    });
  
    socket.on("createNewGroup", (currentGroupName) => {
      console.log(currentGroupName);
      chatgroups.unshift({
        id: chatgroups.length + 1,
        currentGroupName,
        messages: [],
      });
      socket.emit("groupList", chatgroups);
    });
  
    socket.on("findGroup", (id) => {
      const filteredGroup = chatgroups.filter((item) => item.id === id);
      socket.emit("foundGroup", filteredGroup[0].messages);
    });
  
    socket.on("newChatMessage", (data) => {
      const { currentChatMesage, groupIdentifier, currentUser, timeData } = data;
      const filteredGroup = chatgroups.filter(
        (item) => item.id === groupIdentifier
      );
      const newMessage = {
        id: createUniqueId(),
        text: currentChatMesage,
        currentUser,
        time: `${timeData.hr}:${timeData.mins}`,
      };
  
      socket
        .to(filteredGroup[0].currentGroupName)
        .emit("groupMessage", newMessage);
      filteredGroup[0].messages.push(newMessage);
      socket.emit("groupList", chatgroups);
      socket.emit("foundGroup", filteredGroup[0].messages);
    });
  });