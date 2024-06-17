const router = require('express').Router();
const {addMessage,getAllMessages,joinChat,getAllUser,createRoom,getAllRoomByUserId,removeMessage}=require('../controller/chat')

router.post('/',addMessage)
router.get('/:roomId',getAllMessages)
router.post('/:user1/:user2',createRoom)
router.get('/user',getAllUser)
router.get('/room/:userId',getAllRoomByUserId)
router.delete('/:id',removeMessage)
router.post('/join',joinChat)
module.exports = router;