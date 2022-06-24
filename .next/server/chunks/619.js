"use strict";
exports.id = 619;
exports.ids = [619];
exports.modules = {

/***/ 619:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "BI": () => (/* binding */ buildBlock),
/* harmony export */   "Vs": () => (/* binding */ updateRecord),
/* harmony export */   "ae": () => (/* binding */ createRecord),
/* harmony export */   "iP": () => (/* binding */ createUpload),
/* harmony export */   "nY": () => (/* binding */ publish),
/* harmony export */   "vn": () => (/* binding */ getRecord)
/* harmony export */ });
/* unused harmony exports listAllTypes, getField */
/* harmony import */ var datocms_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(342);
/* harmony import */ var datocms_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(datocms_client__WEBPACK_IMPORTED_MODULE_0__);

const API_TOKEN = process.env.DATOCMS_API_TOKEN;
const client = new datocms_client__WEBPACK_IMPORTED_MODULE_0__.SiteClient(API_TOKEN);
const getRecord = async (recordId)=>{
    try {
        return await client.items.find(recordId, {
            version: "published"
        });
    } catch (error) {
        console.error(error);
        return {
            error
        };
    }
};
const createUpload = async (file)=>{
    try {
        const path = await client.createUploadPath(file);
        return await client.uploads.create({
            path
        });
    } catch (error) {
        console.error(error);
        return {
            error
        };
    }
};
const createRecord = async (recordData)=>{
    try {
        return await client.items.create(recordData);
    } catch (error) {
        console.error(error);
        return {
            error
        };
    }
};
const updateRecord = async (recordId, recordData)=>{
    try {
        return await client.items.update(`${recordId}`, recordData);
    } catch (error) {
        console.error(error);
        return {
            error
        };
    }
};
const publish = async (recordId)=>{
    try {
        return await client.items.publish(`${recordId}`);
    } catch (error) {
        console.error(error);
        return {
            error
        };
    }
};
const listAllTypes = async ()=>{
    try {
        return await client.itemTypes.all();
    } catch (error) {
        console.error(error);
        return {
            error
        };
    }
};
const getField = async (fieldIdOrApiKey)=>{
    try {
        return await client.fields.find(fieldIdOrApiKey);
    } catch (error) {
        console.error(error);
        return {
            error
        };
    }
};
const buildBlock = datocms_client__WEBPACK_IMPORTED_MODULE_0__.buildModularBlock;


/***/ })

};
;