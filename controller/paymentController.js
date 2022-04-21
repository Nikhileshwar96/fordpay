balance = require("../constant");

function checkBalance(userId) {
    if (!userId) {
        return {isSuccess: false, reason: 'userId is required'}
    }

    return { isSuccess: true, walletBalance: balance };
}

function sendMoney(recieverId, senderId, amount) {
    if (!recieverId || !senderId) {
        return { isSuccess: false, reason: 'recieverId and senerId are compulsory' }
    }

    if (amount > balance) {
        return { isSuccess: false, reason: 'insufficient balance' }
    }

    if (amount <= 0) {
        return { isSuccess: false, reason: 'invalid amount' }
    }

    balance -= amount;
    return { isSuccess: true, transactionId: '123456', walletBalance: balance };
}

function addMoney(userId, amount) {
    if (!userId) {
        return { isSuccess: false, reason: 'userId required' }
    }

    if (amount <= 0) {
        return { isSuccess: false, reason: 'invalid amount' }
    }

    balance += amount;
    return { isSuccess: true, transactionId: '123456', walletBalance: balance };
}

module.exports = { checkBalance, sendMoney, addMoney }