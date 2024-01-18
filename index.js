const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true
}));

let moments = [
  {
    id: 1,
    title: 'Moment 1',
    description: 'This is the first moment.',
    image: 'https://example.com/image1.jpg',
    created_at: "2002-09-21"
  },
  {
    id: 2,
    title: 'Moment 2',
    description: 'This is the second moment.',
    image: 'https://example.com/image2.jpg',
    created_at: "2002-09-22"
  },
  {
    id: 3,
    title: 'Moment 3',
    description: 'This is the third moment.',
    image: 'https://example.com/image3.jpg',
    created_at: "2002-09-23"
  },
  {
    id: 4,
    title: 'Moment 4',
    description: 'This is the fourth moment.',
    image: 'https://example.com/image4.jpg',
    created_at: "2002-09-24"
  },
  {
    id: 5,
    title: 'Moment 5',
    description: 'This is the fifth moment.',
    image: 'https://example.com/image5.jpg',
    created_at: "2002-09-25"
  }
];

app.post('/moments', (req, res) => {
  const { title, description, image, created_at } = req.body;

  if (!title || !description || !image || !created_at) {
    return res.status(400).json({ error: 'incomplete data. required: (title, description, image, created_at).' });
  }

  const id = moments.length + 1;
  const newMoment = { id, title, description, image, created_at };
  moments.push(newMoment);
  res.status(201).json(newMoment);
});

app.get('/moments', (req, res) => {
  res.json({
    message: 'Moments',
    data: moments
  });
});

app.get('/moments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const moment = moments.find(m => m.id === id);
  if (moment) {
    res.json(moment);
  } else {
    res.status(404).json({ error: 'Moment not found' });
  }
});

app.put('/moments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { title, description, image } = req.body;
  const momentIndex = moments.findIndex(m => m.id === id);
  if (momentIndex !== -1) {
    moments[momentIndex] = { id, title, description, image, created_at };
    res.json(moments[momentIndex]);
  } else {
    res.status(404).json({ error: 'Moment not found' });
  }
});

app.delete('/moments/:id', (req, res) => {
  const id = parseInt(req.params.id);
  moments = moments.filter(m => m.id !== id);
  res.json({ message: 'Moment deleted successfully' });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
