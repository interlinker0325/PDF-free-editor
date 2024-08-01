const SiteClient = require('datocms-client').SiteClient;

const API_TOKEN = process.env.DATOCMS_API_TOKEN;

const client = new SiteClient(API_TOKEN);

export default client;
