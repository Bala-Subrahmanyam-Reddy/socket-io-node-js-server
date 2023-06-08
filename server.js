const { Server } = require('socket.io');

const io = new Server({
  cors: {
    origin: '*',
  },
});

const users = {};
io.on('connection', (socket) => {
  socket.on('new-user', (name) => {
    users[socket.id] = name;
  });
  socket.on('join-room', (roomId) => {
    socket.join(roomId);
  });
  socket.on('send-chat-message', (message, roomId) => {
    socket.to(roomId).emit('chat-message', {
      message: message,
      name: users[socket.id],
      id: socket.id,
    });
  });
});

io.listen(3001);
