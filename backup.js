const SiteClient = require('datocms-client').SiteClient;
const fs = require('fs');
const path = require('path');
const request = require('request');
const client = new SiteClient('7ad237f32747f77cb5b29241594b58');
console.log('Downloading records...');
client.items.all({}, { allPages: true })
    .then(response => {
        fs.writeFileSync('records.json', JSON.stringify(response, null, 2));
    })
    .then(() => {
        return client.site.find();
    })
    // .then((site) => {
    //     client.uploads.all({}, { allPages: true })
    //         .then(uploads => {
    //             return uploads.reduce((chain, upload) => {
    //                 return chain.then(() => {
    //                     return new Promise((resolve) => {
    //                         const imageUrl = 'https://' + site.imgixHost + upload.path;
    //                         console.log(`Downloading ${imageUrl}...`);
    //                         const stream = fs.createWriteStream('./' + path.basename(upload.path));
    //                         stream.on('close', resolve);
    //                         request(imageUrl).pipe(stream);
    //                     });
    //                 });
    //             }, Promise.resolve());
    //         });
    // });
console.log('Done!');
