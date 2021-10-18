const express = require('express');
const router = express.Router();
const twitter = require('../../server/action/fetchTwitter');
require('dotenv').config();

/*POST FROM CLIENT SIDE*/
router.post('/:account', async function (req, res, next) {
  try {
    console.log(req.params.account)
    lastTwitterId = req.body.twitterId;
    twitterObject = await twitter.getTweets(req.params.account.toLowerCase(), lastTwitterId);
    res.status(200).json(twitterObject)
  } catch {
    res.status(501).json({ serverError: true })
  }
});


module.exports = router;