"use strict";
(() => {
var exports = {};
exports.id = 541;
exports.ids = [541];
exports.modules = {

/***/ 3425:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var utils_withSession__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4612);

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ((0,utils_withSession__WEBPACK_IMPORTED_MODULE_0__/* ["default"] */ .Z)(async (req, res)=>{
    const user = req.session.get("user");
    if (user) {
        // in a real world application you might read the user id from the session and then do a database request
        // to get more information on the user if needed
        res.json({
            isLoggedIn: true,
            ...user
        });
    } else {
        res.json({
            isLoggedIn: false
        });
    }
}));


/***/ }),

/***/ 4612:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "Z": () => (/* binding */ withSession)
});

;// CONCATENATED MODULE: external "next-iron-session"
const external_next_iron_session_namespaceObject = require("next-iron-session");
;// CONCATENATED MODULE: ./utils/withSession.js
// this file is a wrapper with defaults to be used in both API routes and `getServerSideProps` functions

function withSession(handler) {
    return (0,external_next_iron_session_namespaceObject.withIronSession)(handler, {
        password: process.env.SECRET_COOKIE_PASSWORD,
        cookieName: "userCookie",
        cookieOptions: {
            // the next line allows to use the session in non-https environments like
            // Next.js dev mode (http://localhost:3000)
            secure: "production" === "production"
        }
    });
};


/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__(3425));
module.exports = __webpack_exports__;

})();