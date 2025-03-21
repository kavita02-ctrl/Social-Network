const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send('Mini Social Network API is running...');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));

const authRoutes = require("./routes/auth");
app.use("/auth", authRoutes);


// routes/user.js

const userRoutes = require('./routes/user');
app.use('/users', userRoutes);
