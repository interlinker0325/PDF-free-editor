"use strict";
(() => {
var exports = {};
exports.id = 39;
exports.ids = [39];
exports.modules = {

/***/ 5342:
/***/ ((module) => {

module.exports = require("datocms-client");

/***/ }),

/***/ 1738:
/***/ ((module) => {

module.exports = require("multer");

/***/ }),

/***/ 5616:
/***/ ((module) => {

module.exports = import("next-connect");;

/***/ }),

/***/ 7147:
/***/ ((module) => {

module.exports = require("fs");

/***/ }),

/***/ 6661:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "config": () => (/* binding */ config),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var next_connect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5616);
/* harmony import */ var multer__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1738);
/* harmony import */ var multer__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(multer__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7147);
/* harmony import */ var fs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(fs__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var utils_server_dato__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(7619);
var __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([next_connect__WEBPACK_IMPORTED_MODULE_0__]);
next_connect__WEBPACK_IMPORTED_MODULE_0__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];




const DIR = "./uploads";
if (!fs__WEBPACK_IMPORTED_MODULE_2___default().existsSync(DIR)) fs__WEBPACK_IMPORTED_MODULE_2___default().mkdirSync(DIR);
const upload = multer__WEBPACK_IMPORTED_MODULE_1___default()({
    storage: multer__WEBPACK_IMPORTED_MODULE_1___default().diskStorage({
        destination: DIR,
        filename: (req, file, cb)=>cb(null, file.originalname)
    })
});
const apiRoute = (0,next_connect__WEBPACK_IMPORTED_MODULE_0__["default"])({});
const uploadMiddleware = upload.array("files");
apiRoute.use(uploadMiddleware);
apiRoute.post(async (req, res)=>{
    let result = {
        success: false,
        data: {}
    };
    if (req.method === "POST") {
        const { files  } = req;
        let uploads = await Promise.all(files.map((file)=>(0,utils_server_dato__WEBPACK_IMPORTED_MODULE_3__/* .createUpload */ .iP)(file.path)
        ));
        uploads = uploads.map(({ id , url , filename  })=>({
                id,
                url,
                filename
            })
        );
        result.success = true;
        result.data = {
            uploads
        };
    }
    res.json(result);
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (apiRoute);
const config = {
    api: {
        bodyParser: false
    }
};

__webpack_async_result__();
} catch(e) { __webpack_async_result__(e); } });

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [619], () => (__webpack_exec__(6661)));
module.exports = __webpack_exports__;

})();