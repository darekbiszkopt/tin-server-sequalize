require('dotenv').config;
const express = require('express');
const bodyParser = require('express');
const app = express();

// middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(function (req, response, next) {
    response.setHeader('Content-Type', 'application/json');
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Credentials', 'true');
    response.setHeader('Access-Control-Max-Age', 600);
    response.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Authorization, Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    next();
});
//port
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// testing api
app.get('/', (req, res) => res.json({ message: 'API works!' }));

// routers
const userRouter = require('./src/routes/userRouter.js');
app.use('/api/user', userRouter);

const clientRouter = require('./src/routes/clientRouter.js');
app.use('/api/client', clientRouter);

const accountRouter = require('./src/routes/accountRouter.js');
app.use('/api/account', accountRouter);

const bankRouter = require('./src/routes/bankRouter.js');
app.use('/api/bank', bankRouter);
