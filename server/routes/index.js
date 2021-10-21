const express = require('express');
const router = express.Router();
const twitter = require('../../server/action/fetchTwitter');
require('dotenv').config();

/*POST FROM CLIENT SIDE*/
router.post('/:account', async function (req, res, next) {
  try {
    console.log(req.params.account)
    lastTwitterId = req.body.twitterId;
    console.log('Get Tweets Started --------------- ')
    twitterObject = await twitter.getTweets(req.params.account.toLowerCase(), lastTwitterId);
    console.log('Get Tweets Finished --------------- ')
    console.log('Tweets Object:')
    res.status(200).json(twitterObject)
    res.status(200).end();
  } catch {
    res.status(501).json({ serverError: true })
  }
});


module.exports = router;