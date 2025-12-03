// routes/api/Mangas.js

const express = require('express');
const router = express.Router();

// Load Manga model
const Manga = require('../models/manga');

// @route   GET api/Mangas/test
// @desc    Tests Mangas route
// @access  Public
router.get('/test', (req, res) => res.send('Manga route testing!'));

// @route   GET api/Mangas
// @desc    Get all Mangas
// @access  Public
router.get('/', (req, res) => {
  Manga.find()
    .then(mangas => res.json(mangas))
    .catch(err => res.status(404).json({ noMangasfound: 'No Mangas found' }));
});

// @route   GET api/Mangas/:id
// @desc    Get single Manga by id
// @access  Public
router.get('/:id', (req, res) => {
  Manga.findById(req.params.id)
    .then(manga => res.json(manga))
    .catch(err => res.status(404).json({ noMangafound: 'No Manga found' }));
});

// @route   POST api/Mangas
// @desc    Add/save Manga
// @access  Public
router.post('/', (req, res) => {
  Manga.create(req.body)
    .then(manga => res.json({ msg: 'Manga added successfully' }))
    .catch(err => res.status(400).json({ error: 'Unable to add this Manga' , err }));
});

// @route   PUT api/Mangas/:id
// @desc    Update Manga by id
// @access  Public
router.put('/:id', (req, res) => {
  Manga.findByIdAndUpdate(req.params.id, req.body)
    .then(manga => res.json({ msg: 'Updated successfully' }))
    .catch(err =>
      res.status(400).json({ error: 'Unable to update the Database' })
    );
});

// @route   DELETE api/Mangas/:id
// @desc    Delete Manga by id
// @access  Public
router.delete('/:id', (req, res) => {
  Manga.findByIdAndDelete(req.params.id)
    .then(manga => res.json({ mgs: 'Manga entry deleted successfully' }))
    .catch(err => res.status(404).json({ error: 'No such a Manga' }));
});

module.exports = router;