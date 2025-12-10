const express = require('express');
const app = express();

app.use(express.json());

let notes = [];
let nextId = 1;

app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    environment: process.env.NODE_ENV || 'development',
    notesCount: notes.length
  });
});

app.post('/notes', (req, res) => {
  const { title, content } = req.body;
  
  if (!title || !content) {
    return res.status(400).json({ error: 'Title and content are required' });
  }
  
  const note = {
    id: nextId++,
    title,
    content,
    createdAt: new Date().toISOString()
  };
  
  notes.push(note);
  res.status(201).json(note);
});

app.get('/notes', (req, res) => {
  res.json(notes);
});

app.get('/notes/:id', (req, res) => {
  const note = notes.find(n => n.id === parseInt(req.params.id));
  
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }
  
  res.json(note);
});

app.put('/notes/:id', (req, res) => {
  const { title, content } = req.body;
  const note = notes.find(n => n.id === parseInt(req.params.id));
  
  if (!note) {
    return res.status(404).json({ error: 'Note not found' });
  }
  
  if (title) note.title = title;
  if (content) note.content = content;
  note.updatedAt = new Date().toISOString();
  
  res.json(note);
});

app.delete('/notes/:id', (req, res) => {
  const index = notes.findIndex(n => n.id === parseInt(req.params.id));
  
  if (index === -1) {
    return res.status(404).json({ error: 'Note not found' });
  }
  
  notes.splice(index, 1);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`NoteVault API running on port ${PORT}`);
  });
}

module.exports = app;