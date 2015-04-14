var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Account = require('../models/account.js');

/* GET /accounts listing. */
router.get('/accounts.json', function(req, res, next) {
	Account.find(function (err, accounts) {
		if (err) return next(err);
		res.json(accounts);
	});
});

/* GET /account by id */
router.get('/:id.json', function(req, res, next) {
	Account.findById(req.params.id,  function (err, post) {
		if (err) return next(err);
		res.json(post);
	});
});

/* POST /accounts */
router.post('/newAccount', function(req, res, next) {
	var query = Account.where({Email : req.body.Email}); 
	query.findOne(function (err , account) {
		if(err) next(err); 
		if(account == null){
			Account.create(req.body, function (err, post) {
				if (err) return next(err);
				res.json(post);
			});			
		} else {
			res.json({Email: "This is Email is registered before"});
		}
	});
});

/* POST /batch accounts */
router.post('/newAccounts', function(req, res, next) {
	Account.collection.insert(req.body, function (err, post) {
		if (err) return next(err);
		res.json(post);		
	});
});

/* Update /account by id */
router.put('/:id', function (req, res, next) {
	Account.findByIdAndUpdate(req.params.id, req.body, function (err , post) {
		if(err) return next(err);
		Account.findById(req.params.id, function (err , account) {
			if(err) return next(err); 
			res.json(account);
		})
	});
});

/* Update Status /account by id */
router.put('/changeStatus/:id', function (req, res, next) {
	Account.findById(req.params.id, function (err , account) {
		if(err) return next(err); 
		account.Status = req.body.Status; 
		account.save(function (err, newAccount) {
			res.json(newAccount);
		})
	})
});

module.exports = router;