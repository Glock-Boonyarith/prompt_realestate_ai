const express = require('express');
const axios = require('axios');
const csv = require('csvtojson');

const router = express.Router();

const SHEET_ID = process.env.SHEET_ID;
const SHEET_GID = process.env.SHEET_GID || '0';
const SHEET_PUBLIC = (process.env.SHEET_PUBLIC || 'true') === 'true';

// GET /api/sheet
router.get('/', async (req, res) => {
  try {
    if (!SHEET_ID) return res.status(400).json({ error: 'Missing SHEET_ID in env' });

    // If public: use CSV export
    if (SHEET_PUBLIC) {
      const csvUrl = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${SHEET_GID}`;
      const response = await axios.get(csvUrl);
      const json = await csv().fromString(response.data);
      return res.json({ rows: json });
    }

    // If not public - you could implement Google Sheets API using an API key / OAuth here.
    return res.status(400).json({ error: 'SHEET_PUBLIC=false not implemented in this example' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch sheet', details: err.message });
  }
});

module.exports = router;
