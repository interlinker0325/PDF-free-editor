"use strict";
(() => {
var exports = {};
exports.id = 404;
exports.ids = [404];
exports.modules = {

/***/ 5342:
/***/ ((module) => {

module.exports = require("datocms-client");

/***/ }),

/***/ 1867:
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
        const { id , sections  } = req.body;
        let content = sections.map((section, index)=>{
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
        const record = await (0,utils_server_dato__WEBPACK_IMPORTED_MODULE_0__/* .updateRecord */ .Vs)(id, {
            content
        });
        if (!record.error) {
            result.success = true;
            result.data = {
                id,
                record,
                content
            };
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
var __webpack_exports__ = __webpack_require__.X(0, [619], () => (__webpack_exec__(1867)));
module.exports = __webpack_exports__;

})();