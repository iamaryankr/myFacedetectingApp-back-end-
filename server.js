const express = require('express');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors'); //to give access to browsers
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const app = express();

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL || 'postgresql://myApp:1LSyZurDLdGlyj0PnheSo9HluIkPXMSE@localhost:5432/myapp_9xtr',
        ssl: process.env.DATABASE_URL ? true : false,
        host: process.env.DATABASE_HOST,
        port: 5432,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PW,
        database: process.env.DATABASE_DB
    }
});

module.exports = db;

db.select('*').from('users').then(data => {
    console.log(data)
});
  

app.use(express.json());
app.use(cors());

/*
--> res = this is working`
signin --> POST = success/fail
register --> POST = user
profile/:userId --> GET = user
image --> PUT --> user
*/


app.get('/', (req, res) => {res.send('app is working!')})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})
app.put('/image', (req, res) => {image.handeImage(req, res, db)})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on PORT ${process.env.PORT}`);
})




