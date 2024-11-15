import axios from 'axios';
import { Socket } from 'socket.io';

const PORT = process.env.PORT || 3001;

const getTaskNotifications = async (socketId, io, userId) => {
  try {
    const result = await axios.get(`http://localhost:${PORT}/taskUsers/notified/${userId}`);
    const taskNoNotifiedRaw = await Promise.all(result.data.data.map((taskUser) => axios.get(`http://localhost:${PORT}/tasks/id/${taskUser.taskId}`)));
    const taskNoNotified = [];
    for (const task of taskNoNotifiedRaw) {
      taskNoNotified.push(task.data.data[0]);
    }
    io.to(socketId).emit('getNotifications', taskNoNotified);
    for (const task of result.data.data) {
      const result = await axios.patch(`http://localhost:${PORT}/taskUsers/notified/${task.id}`);
      console.log('Tasks edited', result.data);
    }
  } catch (e) {
    console.log('Error retrieving task:', e);
  }
};

const getGroupNotifications = async (socketId, io, userId) => {
  try {
    const result = await axios.get(`http://localhost:${PORT}/tasks/notified/${userId}`);
    console.log('Tasks', result.data);
    io.to(socketId).emit('getNotifications', result.data);
    for (const task of result.data.data) {
      const result = await axios.patch(`http://localhost:${PORT}/tasks/notified/${task.id}`);
      console.log('Tasks edited', result.data);
    }
  } catch (e) {
    console.log('Error retrieving task:', e);
  }
};

export const handleSocketEvents = (io) => {
  const users = {};

  io.on('connection', async (socket) => {
    const userId = socket.handshake.auth.userId;

    console.log('User connected:', socket.handshake.auth.email);

    if (userId) {
      users[userId] = socket.id;
    }
    console.log(users);

    getTaskNotifications(socket.id, io, userId);

    socket.on('addTaskUser', async ({ taskId, userId }) => {
      try {
        const result = await axios.post(`http://localhost:${PORT}/taskusers/`, { taskId, userId }, { headers: { 'Content-Type': 'application/json' } });
        console.log(result.data);
        const socketId = users[userId];
        if (socketId) {
          getTaskNotifications(socketId, io, userId);
        }
      } catch (e) {
        console.log(e);
        return;
      }
    });

    socket.on('addToGroup', async ({ groupId, userId }) => {
      try {
        const result = await axios.post(`http://localhost:${PORT}/groupusers/`, { groupId, userId }, { headers: { 'Content-Type': 'application/json' } });
        console.log(result.data);
        const socketId = users[userId];
        if (socketId) {
          getNotifications(socketId, io, userId);
        }
      } catch (e) {
        console.log(e);
        return;
      }
    });

    socket.on('disconnect', () => {
      console.log('User disconnected:', socket.handshake.auth.email);
      delete users[userId];
    });
  });
};
