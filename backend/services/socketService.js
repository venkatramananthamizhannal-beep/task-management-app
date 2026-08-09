let io = null;

const initSocket = (socketIoInstance) => {
  io = socketIoInstance;

  io.on('connection', (socket) => {
    console.log(`[Socket.IO] Client connected: ${socket.id}`);

    // Join user specific room
    socket.on('join', (userId) => {
      if (userId) {
        socket.join(`user_${userId}`);
        console.log(`[Socket.IO] Socket ${socket.id} joined room user_${userId}`);
      }
    });

    socket.on('disconnect', () => {
      console.log(`[Socket.IO] Client disconnected: ${socket.id}`);
    });
  });
};

const emitTaskEvent = (userId, eventName, payload) => {
  if (io && userId) {
    io.to(`user_${userId}`).emit(eventName, payload);
  }
};

const emitNotification = (userId, notification) => {
  if (io && userId) {
    io.to(`user_${userId}`).emit('notification:new', notification);
  }
};

module.exports = {
  initSocket,
  emitTaskEvent,
  emitNotification,
};
