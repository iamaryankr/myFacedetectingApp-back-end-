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
      host: '127.0.0.1',
      port: 5432,
      user: 'postgres',
      password: 'aryan',
      database: 'smart-brain',
    },
});

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


app.get('/', (req, res) => {res.send(database.users)})
app.post('/signin', (req, res) => {signin.handleSignin(req, res, db, bcrypt)})
app.post('/register', (req, res) => {register.handleRegister(req, res, db, bcrypt)})
app.get('/profile/:id', (req, res) => {profile.handleProfile(req, res, db)})
app.put('/image', (req, res) => {image.handeImage(req, res, db)})

app.listen(3000, () => {
    console.log('app is running!');
})




