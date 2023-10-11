const Router = require('koa-router');
const users = require('../../db/db');
const path = require('path');
const uuid = require('uuid');

const fs = require('fs');

const router = new Router();

router.post('/upload', (ctx) => {
//   console.log(typeof ctx.request.body);
//   console.log(ctx.request.body);

  console.log(ctx.request.files.userFile)

  let fileName;
  let userFile

  try {
    const public = path.join(__dirname, '../../public');

    userFile  = ctx.request.files.userFile;
    // console.log(userFile)

    const subfolder = uuid.v4();

    const uploadFolder = public + '/' + subfolder;

    fs.mkdirSync(uploadFolder)
    fs.copyFileSync(userFile.filepath, uploadFolder + '/' + userFile.originalFilename);

    fileName = subfolder + '/' + userFile.originalFilename;
  } catch (error) {
    console.log(error)
    ctx.response.status = 500;
    
    return;
  }

//   ctx.response.body = fileName
    ctx.response.body = JSON.stringify({
    fileName, originalFilename: userFile.originalFilename
    })
 
});



module.exports = router;