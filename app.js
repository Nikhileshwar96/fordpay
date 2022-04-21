const express = require("express");
const paymentRoute = require("./routes/paymentRoute");

const app = express();
app.listen(4001, () => {
    console.log('Started listening on http://localhost:4001')
});
app.use(express.json());

app.use('/payment', paymentRoute)

module.exports = app;