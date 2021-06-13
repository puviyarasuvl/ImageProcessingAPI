import express from 'express';
import resizeJPEG from './resizeJPEG';

const images = express.Router();

images.get('/', (req, res) => {
    resizeJPEG(req, res);
});

export default images;
