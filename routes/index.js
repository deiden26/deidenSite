var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
	//Create date for resume download
	var today = new Date();
	var dd = today.getDate();
	var mm = today.getMonth() + 1;
	var yyyy = today.getFullYear();
	var todayString = mm + "-" + dd +"-" + yyyy;
	res.render('index', { date: todayString });
});

module.exports = router;
