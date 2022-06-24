"use strict";
(() => {
var exports = {};
exports.id = 955;
exports.ids = [955];
exports.modules = {

/***/ 5342:
/***/ ((module) => {

module.exports = require("datocms-client");

/***/ }),

/***/ 3021:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var utils_server_dato__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(7619);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (async (req, res)=>{
    let result = {
        success: false,
        data: {}
    };
    if (req.method === "POST") {
        let { coverimage , files , category , ...rest } = req.body;
        let entry = {
            ...rest,
            content: [],
            itemType: process.env.ENTRY_MODEL_ID
        };
        entry.category = category || null;
        entry.coverimage = coverimage ? {
            uploadId: coverimage
        } : null;
        if (files) {
            if (!Array.isArray(files)) files = [
                files
            ];
            entry.files = files.map((file)=>({
                    uploadId: file
                })
            );
        }
        const record = await (0,utils_server_dato__WEBPACK_IMPORTED_MODULE_0__/* .createRecord */ .ae)(entry);
        if (!record.error) {
            result.success = true;
            result.data = record;
        } else {
            result.error = record.error;
        }
    } else if (req.method === "PUT") {
        let { id , coverimage , files , sections , ...rest } = req.body;
        if (coverimage) {
            rest.coverimage = {
                uploadId: coverimage
            };
        }
        if (files) {
            if (!Array.isArray(files)) files = [
                files
            ];
            rest.files = files.map((file)=>({
                    uploadId: file
                })
            );
        }
        if (sections) {
            rest.content = sections.map((section, index)=>{
                let block = {
                    itemType: process.env.SECTION_MODEL_ID
                };
                if (section.id) block.id = section.id;
                block.title = section.title || "";
                block.description = section.description || "";
                block.image = section.image ? {
                    uploadId: section.image
                } : null;
                block.monograph = section.monograph ? {
                    uploadId: section.monograph
                } : null;
                block.index = section.index || index;
                return (0,utils_server_dato__WEBPACK_IMPORTED_MODULE_0__/* .buildBlock */ .BI)(block);
            });
        }
        const record = await (0,utils_server_dato__WEBPACK_IMPORTED_MODULE_0__/* .updateRecord */ .Vs)(id, rest);
        if (!record.error) {
            await (0,utils_server_dato__WEBPACK_IMPORTED_MODULE_0__/* .publish */ .nY)(record.id);
            result.success = true;
            result.data = record;
        } else {
            result.error = record.error;
        }
    }
    res.json(result);
});


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [619], () => (__webpack_exec__(3021)));
module.exports = __webpack_exports__;

})();