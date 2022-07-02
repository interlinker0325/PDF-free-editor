import { publish, createRecord, updateRecord, buildBlock } from 'utils/server/dato';

export default async (req, res) => {
    let result = { success: false, data: {} };

    if (req.method === 'POST') {
        let { coverimage, files, category, ...rest } = req.body;

        let entry = {
            ...rest,
            content: [],
            itemType: process.env.ENTRY_MODEL_ID,
        };

        entry.category = category || null;
        entry.coverimage = coverimage ? { uploadId: coverimage } : null;

        if (files) {
            if (!Array.isArray(files)) files = [files];
            entry.files = files.map(file => ({ uploadId: file }))
        }

        const record = await createRecord(entry);

        if (!record.error) {
            result.success = true;
            result.data = record;
        } else {
            result.error = record.error;
        }
    } else if (req.method === 'PUT') {
        let { id, coverimage, attachments, ...rest } = req.body;

        if (coverimage) {
            rest.coverimage = { uploadId: coverimage };
        }

        if (attachments) {
            if (!Array.isArray(attachments)) attachments = [attachments];
            rest.attachments = attachments.map(file => ({ uploadId: file }))
        }

        console.log('OVER HERE!!!', rest);
        const record = await updateRecord(id, rest);

        if (!record.error) {
            await publish(record.id);
            result.success = true;
            result.data = record;
        } else {
            result.error = record.error;
        }
    }

    res.json(result);
};
