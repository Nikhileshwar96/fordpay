const express = require("express");
const { checkBalance, sendMoney, addMoney } = require("../controller/paymentController");

const paymentRoute = express.Router();

paymentRoute.get('/checkBalance', (req, res) => {
    var bal = checkBalance(req.body.userId);
    res.status(200).send(bal);
});

paymentRoute.post('/sendMoney', (req, res) => {
    var paymentStatus = sendMoney(req.body.recieverId, req.body.senderId, req.body.amount);
    if (paymentStatus.isSuccess) {
        res.status(200).send(paymentStatus);
    }
    else {
        res.status(403).send(paymentStatus);
    }
});


paymentRoute.post('/addMoney', (req, res) => {
    var transactionStatus = addMoney(req.body.userId, req.body.amount);
    if (transactionStatus.isSuccess) {
        res.status(200).send(transactionStatus);
    }
    else {
        res.status(403).send(transactionStatus);
    }
});

module.exports = paymentRoute;