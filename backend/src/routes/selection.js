const express = require('express');
const Selection = require('../models/Selection');

const router = express.Router();

// POST /api/selection
// body: { sheetId?: string, selections: [ { row: {...} } ] }
router.post('/', async (req, res) => {
  try {
    const { selections, sheetId } = req.body;
    if (!selections || !Array.isArray(selections) || selections.length === 0) {
      return res.status(400).json({ error: 'No selections provided' });
    }

    const doc = await Selection.create({
      sheetId: sheetId || process.env.SHEET_ID,
      rows: selections,
    });

    res.status(201).json({ ok: true, id: doc._id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/selection - list latest selections
router.get('/', async (req, res) => {
  try {
    const items = await Selection.find().sort({ createdAt: -1 }).limit(50);
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
