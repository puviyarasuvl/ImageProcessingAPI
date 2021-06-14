# ImageProcessingAPI

Udacity ImageProcessingAPI project repository

Scripts:

npm run build -> to compile
npm run jasmine -> to execute unit test
npm run test -> to complile and run unit test
npm run start -> to start development server

Used prettier and ESLint from VSCode.

Endpoint:

To process JPEG images : /api/images?filename=<filename>&width=<width>&height=<height> or /api/images?ilename=<filename>&width=<width>&height=<height>&format=jpeg
To process PNG images : /api/images?ilename=<filename>&width=<width>&height=<height>&format=png

Other functionalities:

-   Added option to process PNG images
-   Named thumb images with size to store multiple sizes of same image
-   Added proper log statements
