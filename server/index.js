const express = require("express")
require('dotenv').config()
let app = express()
const http =require('http').Server(app);
const cors=require('cors')
const ownerRouter=require('./router/owner')
const userRouter=require('./router/user')
const chat=require('./router/chat')
const reservation=require('./router/reservation')
// const userRoute=require('./router/user')
const CompairePrice=require('./router/compairePrice')
const userRoute=require('./router/user')
const review=require("./router/review")
const search=require('./router/search')
// require("./dummy")()
const negotiate=require('./router/negotiation')
const bodyParser = require('body-parser');
const hotel = require('./router/hotel');
const pay = require ('./controller/Payment')
const favorite=require('./router/favorite')
const codeQR=require('./router/codeQR')
const socketIO = require("socket.io")(http, {
  cors: {
    origin: "http://10.0.2.2:3000/",
  },
});

// app.use(express.static(__dirname + "/../client/dist"))
app.use(express.urlencoded({extended: true}))

app.use(express.json())
app.use(cors())
app.use(bodyParser.json());

app.use(express.json());
app.use('/api/search',search)
app.use('/api/reservation',reservation)
app.use('/api/price',CompairePrice)
app.use('/api/auth',userRouter)
app.use('/api/owner',ownerRouter)
app.use('/api/chat',chat)

app.use("/api/review",review)
app.use('/api/search',search)
app.use('/api/negotiation',negotiate)
app.use('/api/favorite',favorite)
app.use('/api', hotel);
app.use('/api',codeQR)
app.use('/api/pay',pay)
app.use("/api/user",userRoute)




let port = 3000

function createUniqueId() {
  return Math.random().toString(20).substring(2, 10);
}

let chatgroups = [];

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

socketIO.on("connection", (socket) => {
  console.log(`${socket.id} user is just connected`);

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
    const { currentChatMesage, groupIdentifier, currentUser, timeData,image} = data;
    const filteredGroup = chatgroups.filter(
      (item) => item.id === groupIdentifier
    );
    const newMessage = {
      id: createUniqueId(),
      text: currentChatMesage,
      currentUser,
      time: `${timeData.hr}:${timeData.mins}`,
      image: image,
    };

    socket
      .to(filteredGroup[0].currentGroupName)
      .emit("groupMessage", newMessage);
    filteredGroup[0].messages.push(newMessage);
    socket.emit("groupList", chatgroups);
    socket.emit("foundGroup", filteredGroup[0].messages);
  });
});

app.get("/api", (req, res) => {
  console.log(req,res);
  // res.json(chatgroups);
});

http.listen(port, () => {
  console.log(`Server is listeing on ${port}`);
});

// app.listen(port, function () {
//   console.log(`listening on port ${port}`)
// })