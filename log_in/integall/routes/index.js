const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require('../config/auth');
var mongo = require('mongodb');
var assert = require('assert');

var url = 'mongodb+srv://admin:admin@cluster0.qkgea.mongodb.net/dbenrollment?retryWrites=true&w=majority';

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);

router.get('/get-data', function(req, res, next) {
  var resulArray = [];
  mongo.connect(url, function(err, db){
    assert.equal(null, err);
    var cursor = db.collection('overview').find();
    cursor.forEach(function(doc, err){
      assert.equal(null, err);
      resultArray.push(doc);
    }, function(){
      db.close();
      res.render('index', {items: resultArray});
    });
  });
});

router.post('/container', function(req, res, next){
  var item = {
    scode: req.body.scode,
    sname: req.body.sname,
    semester: req.body.semester,
    day: req.body.day
  };

  mongo.connect(url, function(err, db) {
    assert.equal(null, err);
    db.collection('users').insertOne(item, function(err, result){
      assert.equal(null, err);
      console.log('Item inserted');
      db.close();
    });
  });

  res.redirect('/');

});

router.post('/update', function(req, res, next){

});

router.post('/delete', function(req, res, next){

});





module.exports = router;
