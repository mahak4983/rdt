const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);


//MongoURI;
const MONGODB_URI = 'mongodb+srv://MahakC:nodecomplete123@cluster0-nlcrx.mongodb.net/rdt?retryWrites=true&w=majority';

const app = express();

app.set('view engine', 'ejs');
app.set('views', 'views');

/* routes */
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/post');



const store = new MongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store

}));

/* Storing user in session {req.user} logic*/

app.use(authRoutes);
app.use(postRoutes);

mongoose.connect(MONGODB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(result => {

        console.log('connected');
        app.listen(3000);
    }).catch(err => {
        console.log(err);
    });
