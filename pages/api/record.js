
import { publish } from 'utils/server/dato';

export default async (req, res) => {
    let result = { success: false, data: {} };

    if (req.method === 'POST') {
        let { recordId } = req.body;

        if (!Array.isArray(recordId)) {
            recordId = [recordId];
        }

        if (recordId.length) {
            let results = [];

            for (let i = 0; i < recordId.length; i++) {
                const id = recordId[i];
                const record = await publish(id);
                results.push(record);
            }

            result.success = true;
            result.data = results;
        }
    }

    res.json(result);
};
