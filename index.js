const { response } = require('express');
const express = require('express');
const hostname = '127.0.0.1';
const port = 3000;
const fetch = require('node-fetch');

var Twit = require('twit')
 
const T = new Twit({
  consumer_key:         'e3uYmjOuz8BFZMVOX3OdV5aqg',
  consumer_secret:      'N2bN21KuxLzzpepRVMZOapmHfCr5kP1MWspMTG5ZTdbiKcACXF',
  access_token:         '4859255168-1tBsmeOOkvaCLsnoZM3InfHVBeP8C2Xpy5NAZrV',
  access_token_secret:  'rJdJwqxsQaTyL0elgujvqevWrnIye3uUdMLK98OT9xkCO',
  timeout_ms:           60*1000,
  strictSSL:            true,
})


T.get('search/tweets', { q: 'banana since:2011-07-11', count: 100 }, function(err, data, response) {
    console.log(data)
  })
