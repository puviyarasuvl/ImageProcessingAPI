import express from 'express';
import fs from 'fs';
import path from 'path';
import resizeJPEG from './resizeJPEG';
import resizePNG from './resizePNG';

const resize = async (req: express.Request, res: express.Response) => {
    // Check the URL params and return error if not present
    if (
        req.query.filename === undefined ||
        req.query.width === undefined ||
        req.query.height === undefined
    ) {
        res.send(
            `Error: Please check the URL parameters and enter valid parameters`
        );
        return;
    }

    // Get the full size filename and resize details from URL
    const reqFileName = req.query.filename as string;
    const reqWidth = parseInt(req.query.width as string);
    const reqHeight = parseInt(req.query.height as string);

    let fileFormat = req.query.format as string;
    let fileExtension = '.' + fileFormat;

    // If no file format is specified consider jpeg as default
    if (fileFormat === undefined) {
        fileFormat = 'jpeg';
        fileExtension = '.jpg';
    }

    const srcFilePath: string = path.join(
        __dirname + '../../../images/full/' + reqFileName + fileExtension
    );

    if (isNaN(reqWidth) || isNaN(reqHeight)) {
        res.send(`Error: Please enter valid number for width and height`);
        return;
    }

    // Create destination (resized) filename using URL parameters
    const dstFileName: string =
        reqFileName + reqWidth + reqHeight + fileExtension;
    const dstDir: string = path.join(__dirname + '../../../images/thumb/');
    const dstFilePath: string = dstDir + dstFileName;

    console.log(dstFilePath);

    try {
        // Check if requested file is present or not
        try {
            fs.accessSync(srcFilePath, fs.constants.F_OK);
            console.log(`Requested file presents in full dir`);
        } catch (err) {
            res.send(`Error: Requested file is not present in full dir`);
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
                res.send(`Error: Failed to create dir`);
                return;
            }
        }

        // Resizing for the first time. Call sharp.
        console.log(`Calling Sharp for resizing, format : ${fileFormat}`);

        if (fileFormat === 'jpeg') {
            await resizeJPEG(srcFilePath, reqWidth, reqHeight, dstFilePath);
        } else if (fileFormat === 'png') {
            await resizePNG(srcFilePath, reqWidth, reqHeight, dstFilePath);
        }

        // Send the resized image
        res.sendFile(dstFilePath);
        return;
    } catch (err) {
        console.log(err);
    }
};

export default resize;
