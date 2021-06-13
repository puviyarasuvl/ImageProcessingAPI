import express from 'express';
import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const resizeJPEG = async (req: express.Request, res: express.Response) => {
    // Get the full size filename and resize details from URL
    const reqFileName: string = req.query.filename as string;
    const reqWidth: number = parseInt(req.query.width as string);
    const reqHeight: number = parseInt(req.query.height as string);

    const srcFilePath: string = path.join(
        __dirname + '../../../../images/full/' + reqFileName + '.jpg'
    );

    // Create destination (resized) filename using URL parameters
    const dstFileName: string = reqFileName + reqWidth + reqHeight + '.jpg';
    const dstDir: string = path.join(__dirname + '../../../../images/thumb/');
    const dstFilePath: string = dstDir + dstFileName;

    console.log(dstFilePath);

    try {
        // Check if requested file is present or not
        try {
            fs.accessSync(srcFilePath, fs.constants.F_OK);
            console.log(`Requested file presents in full dir`);
        } catch (err) {
            res.send(`Requested file is not present in full dir`);
            return;
        }

        // Check if resized file is present or not
        try {
            fs.accessSync(dstFilePath, fs.constants.F_OK);
            // File exists. Display the resized image
            console.log(`Resized file present in the thumb dir`);

            res.sendFile(dstFilePath);
            return;
        } catch (err) {
            console.log(`No resized file found`);
        }

        // Create thumb folder if doesnt exist
        try {
            fs.accessSync(dstDir, fs.constants.F_OK);
            console.log(`Thumb dir found`);
        } catch (err) {
            try {
                fs.mkdirSync(dstDir);
            } catch (err) {
                res.send(`Failed to create dir`);
                return;
            }
        }

        // Resizing for the first time. Call sharp.
        console.log(`Calling Sharp for resizing`);

        await sharp(srcFilePath)
            .resize(reqWidth, reqHeight)
            .toFormat('jpeg')
            .toFile(dstFilePath);

        // Send the resized image
        res.sendFile(dstFilePath);
        return;
    } catch (err) {
        console.log(err);
    }
};

export default resizeJPEG;
