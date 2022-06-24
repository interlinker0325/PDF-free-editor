import { updateRecord, buildBlock } from 'utils/server/dato';

export default async (req, res) => {
    let result = { success: false, data: {} };

    if (req.method === 'POST') {
        const { id, sections } = req.body;

        let content = sections.map((section, index) => {
            let block = { itemType: process.env.SECTION_MODEL_ID };

            if (section.id) block.id = section.id;
            block.title = section.title || '';
            block.description = section.description || '';
            block.image = section.image ? { uploadId: section.image } : null;
            block.monograph = section.monograph ? { uploadId: section.monograph } : null;
            block.index = section.index || index;

            return buildBlock(block);
        });

        const record = await updateRecord(id, { content });
        if (!record.error) {
            result.success = true;
            result.data = { id, record, content };
        } else {
            result.error = record.error;
        }
    }

    res.json(result);
};
