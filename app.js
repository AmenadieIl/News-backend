const express = require('express');
const app = express();
const { connectToDb, getDB } = require('./db.js');
const adminRouter = require('./routes/adminRouter.js');
const userRouter = require('./routes/userRouter.js');
const dotenv = require('dotenv');
dotenv.config();
const port = process.env.port || 7000;
app.use(express.json());
app.use(adminRouter);
app.use(userRouter);

connectToDb((error) => {
    if (!error) {
        app.listen(port, error => {
            error ? console.log(error) : console.log(`working on port${port}`);
        });
    }
});