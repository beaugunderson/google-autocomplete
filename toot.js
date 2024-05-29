'use strict';

const fs = require('fs');
const Mastodon = require('mastodon');

require('dotenv').config();

const M = new Mastodon({
  access_token: process.env.ACCESS_TOKEN,
});

M.post('media', {file: fs.createReadStream('./out.png')}).then(resp => {
  M.post('statuses', {
    status: '',
    media_ids: [resp.data.id]
  });
});
