import express from 'express';
import images from './api/images';

const routes = express.Router();

routes.get('/', (req, res) => {
    res.send(
        'Server is up. API is ready for use. Please access the correct endpoint.'
    );
});

routes.use('/images', images);

export default routes;
