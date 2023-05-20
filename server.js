const express = require('express');
const connectDB = require('./config/db');

const app = express();

connectDB();

//Init Middleware
app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('API running'));


//Define routes
app.use('/api/users', require('./routes/api/users'));     // Register user
app.use('/api/auth', require('./routes/api/auth'));       //login user
app.use('/api/profile', require('./routes/api/profile')); //create profile
app.use('/api/posts', require('./routes/api/posts'));     //create posts


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`server running on port ${PORT}`));