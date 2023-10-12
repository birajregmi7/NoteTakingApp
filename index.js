const express = require('express');
const app = express();
const path = require('path');
var methodOverride = require('method-override')
const { v4: uuidv4 } = require('uuid');
uuidv4(); // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'))
app.listen(8080, () => {
  console.log('Server is running');

});
let posts = [
  {
    id: uuidv4(),
    title: 'Notes',
    content: 'Create new notes and enjoy 🫡'
  }
]
app.get('/posts', (req, res) => {
  console.log(posts)
  res.render('home.ejs', { posts })
})
app.get('/posts/new', (req, res) => {
  res.render('new.ejs')
})
app.post('/posts', (req, res) => {
  let { title, content } = req.body;
  let id = uuidv4();
  posts.push({ id, title, content });

  res.render('home.ejs', { posts })
})
app.get('/posts/:id/edit', (req, res) => {
  let { id } = req.params
  let post = posts.find((p) => id === p.id)
  res.render('edit.ejs', { post })
})
app.patch('/posts/:id', (req, res) => {
  let { id } = req.params;
  let { title, content } = req.body;
  let post = posts.find(p => (id === p.id));
  if (!post) {
    return res.status(404).send("Post not found");
  }
  post.title = title;
  post.content = content;
  res.redirect('/posts');
});
app.delete('/posts/:id', (req, res) => {
  let { id } = req.params;
  posts = posts.filter((p) => id !== p.id);
  res.redirect('/posts')
})