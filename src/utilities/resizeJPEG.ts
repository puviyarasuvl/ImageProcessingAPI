import sharp from 'sharp';

const resizeJPEG = async (
    srcFilePath: string,
    reqWidth: number,
    reqHeight: number,
    dstFilePath: string
) => {
    await sharp(srcFilePath)
        .resize(reqWidth, reqHeight)
        .toFormat('jpeg')
        .toFile(dstFilePath);
};

export default resizeJPEG;
