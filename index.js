const express = require('express');
const res = require('express/lib/response');
const app = express();
const pool = require('./db');
const shortid = require('shortid');

var cors = require('cors');
const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions)); // Use this after the variable declaration
app.use(express.json()); // => req.body

// ROUTES

// get all post
app.get('/list-posts', async (req, res) => {
  try {
    const listPosts = await pool.query(`SELECT * FROM post`);
    res.json(listPosts.rows);
  } catch (err) {
    console.error(err.message);
  }
});
// get post
app.get('/post/:nombre', async (req, res) => {
  const { nombre } = req.params;
  try {
    const post = await pool.query('SELECT * FROM post WHERE nombre = $1', [
      nombre,
    ]);
    res.json(post.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});
// create post
app.post('/new-post', async (req, res) => {
  try {
    const { nombre, descripcion } = req.body;
    const newPost = await pool.query(
      `INSERT INTO post( id, nombre, descripcion) VALUES ($1, $2, $3 ) RETURNING *`,
      [ shortid.generate(), nombre, descripcion]
    );
    res.json(newPost.rows[0]);
  } catch (err) {
    console.log(err.message);
  }
});

// delete post
app.delete('/post/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletePost = await pool.query(`DELETE FROM post WHERE id = $1`, [id]);
    res.json('El post fue eliminado!');
  } catch (err) {
    console.error(err.message);
  }
});

app.listen(5000, () => {
  console.log('server listening 5000');
});
