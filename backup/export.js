const SiteClient = require('datocms-client').SiteClient;
const fs = require('fs');
const path = require('path');
const request = require('request');
const client = new SiteClient('7ad237f32747f77cb5b29241594b58');

async function downloadRecords() {
    console.log('Downloading records...');

    const response = await client.items.all({}, { allPages: true });
    fs.writeFileSync('records.json', JSON.stringify(response, null, 2));

    console.log('Downloading uploads...');

    const site = await client.site.find();
    const uploads = await client.uploads.all({}, { allPages: true });
    fs.writeFileSync('uploads.json', JSON.stringify(uploads, null, 2));

    for (let upload of uploads) {
        await new Promise((resolve) => {
            const imageUrl = 'https://' + site.imgixHost + upload.path;

            console.log(`Downloading ${imageUrl}...`);
            const stream = fs.createWriteStream('./uploads/' + path.basename(upload.path));
            stream.on('close', resolve);
            request(imageUrl).pipe(stream);
        });
    }

    console.log('Done!');
}

downloadRecords();
