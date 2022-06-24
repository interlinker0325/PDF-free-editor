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
        let { id, coverimage, files, sections, ...rest } = req.body;

        if (coverimage) {
            rest.coverimage = { uploadId: coverimage };
        }

        if (files) {
            if (!Array.isArray(files)) files = [files];
            rest.files = files.map(file => ({ uploadId: file }))
        }

        if (sections) {
            rest.content = sections.map((section, index) => {
                let block = { itemType: process.env.SECTION_MODEL_ID };

                if (section.id) block.id = section.id;
                block.title = section.title || '';
                block.description = section.description || '';
                block.image = section.image ? { uploadId: section.image } : null;
                block.monograph = section.monograph ? { uploadId: section.monograph } : null;
                block.index = section.index || index;

                return buildBlock(block);
            });
        }

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
