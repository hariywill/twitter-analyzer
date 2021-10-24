const express = require('express');
const router = express.Router();
//const twitter = require('../../server/action/fetchTwitter');
const twitter = require('../../server/action/twitter');
require('dotenv').config();

/*POST FROM CLIENT SIDE*/
router.post('/:account', async function (req, res, next) {
  try {
    lastTwitterId = req.body.twitterId;
    twitterObject = await twitter.getTweets(req.params.account.toLowerCase(), lastTwitterId);
    res.status(200).json(twitterObject)
    res.status(200).end();
  } catch {
    res.status(501).json({ serverError: true })
  }
});


module.exports = router;