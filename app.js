// cliente de notificaciones en vivo
// crear una plataforma nextjs o react
// servidor node js
// cliente
// persona puede crear tareas de asignacion
// a juro dos usuarios registrados
// las notificaciones son en tiempo real y deben ser un toast
// toast framework:
// tiene login
// lo mas importante es la logica
// ------------------------------
// opcional: grupos de tareas
// En los grupos se asignarian las tareas a todos los grupos

// miercoles proxima semana

// tablas temporales para carrito sqlite para carrito es mejor
// redis para cachear

// database:
// Name:           epic-yellowjacket
// URL:            libsql://epic-yellowjacket-raulrangelxd.turso.io
// ID:             cecee4a0-124a-4256-aebc-a4daeace1b67
// Token: eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MzExMTUwODgsImlkIjoiY2VjZWU0YTAtMTI0YS00MjU2LWFlYmMtYTRkYWVhY2UxYjY3In0.cQiHxDqRtjjKIyIwiXwz0r2B3vLEcXklnQhMmyPJJ5wMQkLew4_WrUJkpWIdCFV9lyBg07PsMfs1ziil2pzNDg

import express from 'express'
import { createServer } from 'node:http'
import { Server } from 'socket.io'
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from 'cookie-parser'
import { createTables, deleteTables } from './src/config/database.js'
import { handleSocketEvents } from './src/socket/socket.js'
import morgan from 'morgan'

import userRoutes from './src/routes/users.js'
import authRoutes from './src/routes/auth.js'
import groupRoutes from './src/routes/group.js'
import groupUserRoutes from './src/routes/groupUser.js'
import taskRoutes from './src/routes/tasks.js'
import taskUserRoutes from './src/routes/taskUser.js'

dotenv.config()
const PORT = process.env.PORT || 3001

const app = express()
const server = createServer(app)
const io = new Server(server, {
  cors: { origin: [`http://localhost:${PORT}`, `http://localhost:3000`, `https://tasks-project-client.onrender.com`, `https://tasks-project-server.onrender.com`] },
  connectionStateRecovery: {},
})
app.use(morgan('dev'))

app.use(express.json())
app.use(cors({ origin: [`http://localhost:${PORT}`, `http://localhost:3000`, `https://tasks-project-client.onrender.com`, `https://tasks-project-server.onrender.com`], credentials: true }))
app.use(cookieParser())

createTables()
// deleteTables();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use('/users', userRoutes)
app.use('/auth', authRoutes)
app.use('/groups', groupRoutes)
app.use('/groupUsers', groupUserRoutes)
app.use('/tasks', taskRoutes)
app.use('/taskUsers', taskUserRoutes)

handleSocketEvents(io)

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`)
})
