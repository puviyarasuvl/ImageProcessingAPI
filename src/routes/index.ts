import express from 'express';

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('Hey there..! Welcome to root route');
});

export default routes;
