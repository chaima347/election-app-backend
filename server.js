const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http'); // Import the http module
const { Server } = require('socket.io');

dotenv.config();

const app = express();
const server = http.createServer(app); // Create the server after importing http
const socketServer = new Server(server);

const authRoutes = require('./routes/authRoutes');
const candidateRoutes = require('./routes/candidateRoutes');
const userRoutes = require('./routes/userRoutes');

socketServer.on('connection', (socket) => {
    console.log('A user connected');
    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

app.use(express.json());

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.use('/api/auth', authRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/users', userRoutes);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
