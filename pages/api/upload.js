import nextConnect from 'next-connect';
import multer from 'multer';
import fs from 'fs';
import {createUpload, deleteRecord, deleteUpload} from 'utils/server/dato';

const DIR = './uploads';

if (!fs.existsSync(DIR)) fs.mkdirSync(DIR);

const upload = multer({
  storage: multer.diskStorage({
    destination: DIR,
    filename: (req, file, cb) => cb(null, file.originalname),
  }),
});

const apiRoute = nextConnect({});
const uploadMiddleware = upload.array('files');

// POST route for uploading files
apiRoute.post(uploadMiddleware, async (req, res) => {
  let result = {success: false, data: {}};

  if (req.method === 'POST') {
    const {files} = req;
    console.log("===FILES DATA===", {files});

    let uploads = await Promise.all(files.map(file => createUpload(file.path)));

    uploads = uploads.map(({id, url, filename}) => ({
      id,
      url,
      filename,
    }));

    result.success = true;
    result.data = {uploads};
  }
  if (result?.error) res.status(500).send(result);
  else res.json(result);
});

// DELETE route for deleting files
apiRoute.delete(async (req, res) => {
  let result = {success: false, data: {}};

  try {
    // Parse the raw request body
    const buffers = [];
    for await (const chunk of req) {
      buffers.push(chunk);
    }
    const body = JSON.parse(Buffer.concat(buffers).toString());
    const {file2delete} = body;

    console.log("===DELETING FILES===", file2delete);

    const record = await deleteUpload(file2delete);
    console.log("===deleteUpload===", record);

    if (!record?.error) {
      result.success = true;
      result.data = record;
      res.status(200).json(result);
    } else {
      result.error = record.error;
      res.status(500).send(result);
    }
  } catch (error) {
    console.error("Error in DELETE route:", error);
    res.status(500).send({success: false, error: "Failed to parse request body or delete file."});
  }
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false,
  },
};