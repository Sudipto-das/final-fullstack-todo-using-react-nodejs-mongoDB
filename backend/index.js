const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require('mongoose')
const cors = require('cors')

const app = express();
app.use(cors());
app.use(bodyParser.json());

const todosSchema = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  title: String,
  description: String,
  completed: Boolean
});

const todos = mongoose.model('todos',todosSchema)
mongoose.connect('mongodb+srv://S_das:Sudipto123@cluster0.c1sttyl.mongodb.net/todos', { useNewUrlParser: true, useUnifiedTopology: true});

app.get('/todos/:id', async (req, res) => {
  const todoId = req.params.id
  const todo = await todos.findOne( {_id:todoId} );
  if (!todo) {
    res.status(404).send();
  } else {
    res.json(todo);
  }
});

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await todos.find();
    res.json(allTodos);
  } catch (error) {
    console.error('Error retrieving todos:', error);
    res.status(500).send();
  }
});

app.post("/todos", async (req, res) => {
  const newTodo = new todos (req.body)
  await newTodo.save();
  res.status(200).json(newTodo);
});

app.put("/todos/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    const updatedTodo = await todos.findByIdAndUpdate(todoId, req.body);

    if (updatedTodo) {
      res.json({ message: 'Todo updated' });
    } else {
      res.status(404).json({ message: 'Todo not found' });
    }
  } catch (error) {
    console.error('Error updating todo:', error);
    res.status(500).send();
  }
});


app.delete("/todos/:id", async (req, res) => {
  try {
    const todoId = req.params.id;
    const result = await todos.deleteOne({ _id:todoId });

    if (result.deletedCount === 0) {
      res.status(404).send();
    } else {
      res.status(200).send();
    }
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.status(500).send();
  }
});


// for all other routes, return 404
app.use((req, res, next) => {
  res.status(404).send();
});

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
});
