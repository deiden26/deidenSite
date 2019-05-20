const express = require('express');
const router = new express.Router();

/* GET home page. */
router.get('/', function(req, res) {
    // Create date for resume download
    const today = new Date();
    const dd = today.getDate();
    const mm = today.getMonth() + 1;
    const yyyy = today.getFullYear();
    const todayString = `${mm}-${dd}-${yyyy}`;
    res.render('index', {date: todayString});
});

module.exports = router;
