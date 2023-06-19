const express = require('express');
const router = express.Router();
const Article = require('../models/article');

// Create a new article
router.post('/', async (req, res) => {
  try {
    const { title, content } = req.body;
    const article = new Article({ title, content });
    await article.save();
    res.status(201).json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create article' });
  }
});

// Get all articles
router.get('/', async (req, res) => {
  try {
    const articles = await Article.find();
    res.json(articles);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch articles' });
  }
});

// Get a single article by ID
router.get('/:id', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch article' });
  }
});

// Update an article
router.put('/:id', async (req, res) => {
  try {
    const { title, content } = req.body;
    const article = await Article.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json(article);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update article' });
  }
});

// Delete an article
router.delete('/:id', async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }
    res.json({ message: 'Article deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete article' });
  }
});

module.exports = router;
const axios = require('axios');

// Fetch news articles from an API
router.get('/fetch', async (req, res) => {
  try {
    const response = await axios.get('https://api.example.com/news');
    const articlesData = response.data.articles;
    
    // Process the articlesData and save them to the database using the Article model

    res.json({ message: 'Articles fetched and saved to the database' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news articles' });
  }
});
const OpenAI = require('openai');

// Initialize OpenAI API client
const openai = new OpenAI('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');

// Summarize an article using the OpenAI API
router.get('/:id/summary', async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ error: 'Article not found' });
    }

    // Use the OpenAI API to summarize the article content
    const response = await openai.completions.create({
      engine: 'text-davinci-003',
      prompt: article.content,
      max_tokens: 100,
    });

    const summary = response.choices[0].text.trim();
    article.summary = summary;
    await article.save();

    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: 'Failed to summarize article' });
  }
});
