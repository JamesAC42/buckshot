const express = require('express');
const session = require('express-session');
const redis = require('redis');
const RedisStore = require('connect-redis')(session);
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const httpServer = http.createServer(app);
const redisClient = redis.createClient({ legacyMode: true });
const port = 5000;

const config = require('./config.json');
const redisLogin = require('./redis_login.json');

const sequelize = require('./database');

let io;
if(config.local) {
  io = new Server(httpServer, {
    cors: {
      origin: '*'
    }
  });
} else {
  io = new Server(httpServer, {
  	path:'/socket',
    cors: {
        origin: 'https://buckshot.me',
        methods: ['GET','POST']
    } 
  });
}

redisClient.auth(redisLogin.password);

const datamodels = require('./datamodels/datamodels');
const handleConnection = require('./socket');
const generate = require('./controllers/llm/generate');
const createAccount = require('./controllers/user/createAccount');
const login = require("./controllers/user/login");
const getSession = require('./controllers/user/getSession');
const logout = require('./controllers/user/logout');
const verifyEmail = require('./controllers/user/verifyEmail');
const sendResetPasswordEmail = require('./controllers/user/sendResetPasswordEmail');
const resetPassword = require('./controllers/user/resetPassword');
const updateEmail = require('./controllers/user/updateEmail');
const updateUsername = require('./controllers/user/updateUsername');
const updatePassword = require('./controllers/user/updatePassword');
const updateCopyInfo = require('./controllers/settings/updateCopyInfo');
const updateMode = require('./controllers/settings/updateMode');
const updateTone = require('./controllers/settings/updateTone');
const updateModel = require('./controllers/settings/updateModel');
const createJob = require('./controllers/jobs/createJob');
const requestDeleteJob = require('./controllers/jobs/deleteJob');
const downloadOutput = require('./controllers/jobs/downloadOutput');
const {
  requestSaveJobInput,
  requestSaveJobTitle,
  requestSaveJobPersonalInfo,
  requestSaveJobJobInfo,
  requestSaveJobRequiredSections
} = require('./controllers/jobs/saveJobInput');

sequelize.sync()
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing database:', error);
  });

try {
  sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);
app.use(
  session({
    store: new RedisStore({ client: redisClient }),
    secret: 'domoarigato',
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: config.secureSession, // Set to true if using HTTPS
    },
  })
);
// Middleware
app.use(express.json());

// Error handling
app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.post('/api/generate', async (req, res) => {
  console.log("asfsadf lkjlkjl");
  generate(req, res, redisClient);
});

app.post('/api/login', async(req, res) => {
  login(req, res, datamodels);
});

app.post('/api/logout', async(req, res) => {
  logout(req, res);
});

app.post('/api/createAccount', async (req, res) => {
  createAccount(req, res, datamodels, redisClient);
});

app.post('/api/verifyEmail', async (req, res) => {
  verifyEmail(req, res, datamodels, redisClient);
});

app.post('/api/sendResetPasswordEmail', async (req, res) => {
  sendResetPasswordEmail(req, res, datamodels, redisClient);
});

app.post('/api/resetPassword', async (req, res) => {
  resetPassword(req, res, datamodels, redisClient);
});

app.post('/api/updateEmail', async (req, res) => {
  updateEmail(req, res, datamodels, redisClient);
});

app.post('/api/updatePassword', async (req, res) => {
  updatePassword(req, res, datamodels);
});

app.post('/api/updateUsername', async (req, res) => {
  updateUsername(req, res, datamodels);
});

app.post('/api/updateCopyInfo', async (req, res) => {
  updateCopyInfo(req, res, datamodels);
});

app.post('/api/updateMode', async (req, res) => {
  updateMode(req, res, datamodels);
});

app.post('/api/updateTone', async (req, res) => {
  updateTone(req, res, datamodels);
});

app.post('/api/updateModel', async (req, res) => {
  updateModel(req, res, datamodels);
});

app.post('/api/createJob', async (req, res) => {
  createJob(req, res);
});

app.post('/api/deleteJob', async (req, res) => {
  requestDeleteJob(req, res);
});

app.post('/api/saveJobInput', async (req, res) => {
  requestSaveJobInput(req, res);
});

app.post('/api/saveJobTitle', async (req, res) => {
  requestSaveJobTitle(req, res);
});

app.post('/api/saveJobPersonalInfo', async (req, res) => {
  requestSaveJobPersonalInfo(req, res);
});

app.post('/api/saveJobJobInfo', async (req, res) => {
  requestSaveJobJobInfo(req, res);
});

app.post('/api/saveJobRequiredSections', async (req, res) => {
  requestSaveJobRequiredSections(req, res);
});

app.get('/api/getSession', async (req, res) => {
  getSession(req, res, datamodels);
});

app.get('/api/downloadOutput/:jobId', async (req, res) => {
  downloadOutput(req, res);
});

io.on('connection', handleConnection);

// Start the server
httpServer.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});