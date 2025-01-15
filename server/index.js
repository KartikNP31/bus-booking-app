const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dbConnection = require('./db');
require('dotenv').config();
const app = express();

const port = process.env.PORT;
dbConnection();

// app.use(cors());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));

app.use(express.json({ limit: '20mb' }));
app.use(bodyParser.json({ limit: '20mb' }));
app.use(express.urlencoded({extended: true, limit:"100mb"}));



app.use('/api/admin', require('./routes/AdminRoute'));
app.use('/api/user', require('./routes/UserRoute'));

app.listen(port, () => {
  console.log(`Server running on : http://localhost:${port}`);
});
