import path from 'path';
import resizeJPEG from '../../utilities/resizeJPEG';

describe('Test image processing', () => {
    it('should get the resized image as per provided width and height', async () => {
        const srcFilePath: string = path.join(
            __dirname + '../../../../images/full/fjord.jpg'
        );
        const dstFileName: string = 'fjord' + 250 + 250 + '.jpg';
        const dstDir: string = path.join(
            __dirname + '../../../../images/thumb/'
        );
        const dstFilePath: string = dstDir + dstFileName;
        await resizeJPEG(srcFilePath, 250, 250, dstFilePath);

        expect(dstFilePath).toBeTruthy();
    });
});
