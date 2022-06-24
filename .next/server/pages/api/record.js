"use strict";
(() => {
var exports = {};
exports.id = 954;
exports.ids = [954];
exports.modules = {

/***/ 5342:
/***/ ((module) => {

module.exports = require("datocms-client");

/***/ }),

/***/ 9812:
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
        let { recordId  } = req.body;
        if (!Array.isArray(recordId)) {
            recordId = [
                recordId
            ];
        }
        if (recordId.length) {
            let results = [];
            for(let i = 0; i < recordId.length; i++){
                const id = recordId[i];
                const record = await (0,utils_server_dato__WEBPACK_IMPORTED_MODULE_0__/* .publish */ .nY)(id);
                results.push(record);
                let category = await (0,utils_server_dato__WEBPACK_IMPORTED_MODULE_0__/* .getRecord */ .vn)(record.category);
                const categoryExists = category.entries.some((rid)=>record.id === rid
                );
                if (!categoryExists) {
                    category.entries = [
                        ...category.entries,
                        id
                    ];
                    await (0,utils_server_dato__WEBPACK_IMPORTED_MODULE_0__/* .updateRecord */ .Vs)(record.category, category);
                }
            }
            result.success = true;
            result.data = results;
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
var __webpack_exports__ = __webpack_require__.X(0, [619], () => (__webpack_exec__(9812)));
module.exports = __webpack_exports__;

})();