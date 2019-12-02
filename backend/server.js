const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;
const cookieParser = require('cookie-parser')

app.use(cors());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json()); 
app.use(cookieParser());

mongoose.connect('mongodb://127.0.0.1:27017/todos', { useNewUrlParser: true });
const connection = mongoose.connection;

connection.once('open', function () {
    console.log("MongoDB database connection established successfully");
})

app.use('/api/todos', require('./routes/api/todos'));
app.use('/api/users', require('./routes/api/users'));
app.use('/api/boards', require('./routes/api/boards'));
app.use('/api/auth', require('./routes/api/auth'));

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});

