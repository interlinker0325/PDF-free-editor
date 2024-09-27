const fs = require('fs');
const { buildClient } = require('@datocms/cma-client-node');

const API_TOKEN = "33d5a14659f387773c62ce9d64e1ac";
const client = buildClient({ apiToken: API_TOKEN });

async function exec() {
    try {
        console.log('Starting record and upload processing...');

        console.log('Fetching all records...');
        const allRecords = await client.items.list();
        for await (const record of client.items.listPagedIterator()) {
            allRecords.push(record);
        }
        console.log(`Total records fetched: ${allRecords.length}`);

        console.log('Fetching all uploads...');
        const uploads = await client.uploads.list();
        for await (const upload of client.uploads.listPagedIterator()) {
            uploads.push(upload);
        }
        console.log(`Total uploads fetched: ${uploads.length}`);

        const filteredItems = allRecords.filter(item => ["897394", "897414"].includes(item?.item_type?.id));
        console.log(`Filtered items by type: ${filteredItems.length} items found`);

        const itemUploads = extractUploadIds(filteredItems);
        console.log(`Extracted ${itemUploads.length} upload IDs from records`);

        const uploadIds = uploads.map(item => item.id);

        const result = findCoincidences(itemUploads, uploadIds);
        console.log(`Number of coincidences: ${result.coincidenceCount}`);
        console.log(`Coincidence items: ${result.coincidenceItems}`);
        console.log(`Number of rest items: ${result.restItems.length}`);

        fs.writeFileSync('delete.json', JSON.stringify(result.restItems, null, 2));
        console.log('Saved rest items to delete.json');

        console.log(`Initiating bulk destroy for ${result.restItems.length} items...`);
        await destroyInChunks(result.restItems, 20);
        console.log('Bulk destroy completed.');
    } catch (error) {
        console.error('Error during execution:', error);
    }
}

function extractUploadIds(items) {
    return items.reduce((acc, item) => {
        if (item?.coverimage?.upload_id) acc.push(item.coverimage.upload_id);
        if (item?.avatar?.upload_id) acc.push(item.avatar.upload_id);
        if (item?.monograph?.upload_id) acc.push(item.monograph.upload_id);
        if (item?.banner?.upload_id) acc.push(item.banner.upload_id);
        if (item?.attachments?.length) {
            item.attachments.forEach(file => acc.push(file.upload_id));
        }
        return acc;
    }, []);
}

function findCoincidences(arr1, arr2) {
    const set1 = new Set(arr1);
    const coincidences = [];
    const rest = [];

    for (let item of arr2) {
        if (set1.has(item)) {
            coincidences.push(item);
        } else {
            rest.push(item);
        }
    }

    return {
        coincidenceCount: coincidences.length,
        coincidenceItems: coincidences,
        restItems: rest,
    };
}

async function destroyInChunks(items, chunkSize) {
    for (let i = 0; i < items.length; i += chunkSize) {
        const chunk = items.slice(i, i + chunkSize).map(id => ({ id, type: 'upload' }));
        console.log(`Deleting chunk ${i / chunkSize + 1} with ${chunk.length} items...`);
        const result = await client.uploads.bulkDestroy({ uploads: chunk });
        console.log('Chunk delete result:', result);
    }
}

exec();