const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

const LOCAL_MONGO_URI = process.env.LOCAL_MONGO_URI || 'mongodb://host.docker.internal:27017/Test11';
const PORT = Number(process.env.PORT) || 3001;

const db = mongoose.createConnection(LOCAL_MONGO_URI);
db.on('connected', () => console.log('Connected to MongoDB'));
db.on('error', (err) => console.error('MongoDB error:', err.message));

const RealOrder = db.model('RealOrder', new mongoose.Schema({}, { strict: false, collection: 'Test11' }));

app.get('/health', (req, res) => {
  res.json({ status: 'ok', db: db.readyState === 1 ? 'connected' : 'disconnected' });
});

app.use('/analysis/ask', require('./routes/ask')(RealOrder));
app.use('/analysis', require('./routes/analysis')(RealOrder));

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500).json({ error: err.message });
});

const server = app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is busy`);
    process.exit(1);
  }
});
