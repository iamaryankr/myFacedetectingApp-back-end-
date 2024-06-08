import express from 'express';
import bcrypt from 'bcrypt-nodejs';
import cors from 'cors'; //to give access to browsers
import knex from 'knex';


import handleRegister from './controllers/register.js';
import handleSignin from './controllers/signin.js';
import handleProfile from './controllers/profile.js';
import handeImage from './controllers/image.js';

const app = express();

const db = knex({
    client: 'pg',
    connection: {
        connectionString: process.env.DATABASE_URL || 'postgresql://PGPASSWORD=1LSyZurDLdGlyj0PnheSo9HluIkPXMSE psql -h dpg-cphjh20l6cac73a2g6hg-a.oregon-postgres.render.com -U myapp_9xtr_user myapp_9xtr',
        ssl: process.env.DATABASE_URL ? true : false,
        host: process.env.DATABASE_HOST,
        port: 5432,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PW,
        database: process.env.DATABASE_DB
    }
});

//module.exports = db;

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




