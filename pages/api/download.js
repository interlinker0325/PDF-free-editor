const IMAGE_HOST = process.env.NEXT_PUBLIC_DATOCMS_STORAGE_URL.slice(0, -1);

import stream from 'stream';
import { promisify } from 'util';
import fetch from 'node-fetch';

const pipeline = promisify(stream.pipeline);

export default async (req, res) => {
    if (req.method === 'GET') {
        const { query } = req;
        if (query) {
            const { uri, mimeType, filename } = query;
            const response = await fetch(IMAGE_HOST + uri); // replace this with your API call & options
            if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);

            res.setHeader('Content-Type', mimeType);
            res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
            await pipeline(response.body, res);
        }
    }
};
