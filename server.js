const express = require('express');
const connectDB = require('./config/db');
const app = express();

connectDB();
app.use(express.json());
app.use('/api/sleep', require('./routes/sleepRoutes'));
app.use(require('./middlewares/errorHandler'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
