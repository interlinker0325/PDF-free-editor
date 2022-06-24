"use strict";
exports.id = 256;
exports.ids = [256];
exports.modules = {

/***/ 888:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ useUser)
/* harmony export */ });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(689);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(853);
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(549);
/* harmony import */ var swr__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(swr__WEBPACK_IMPORTED_MODULE_2__);



function useUser({ redirectTo =false , redirectIfFound =false , callback =undefined  } = {}) {
    const { data: user , mutate: mutateUser  } = swr__WEBPACK_IMPORTED_MODULE_2___default()("/api/user");
    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{
        if (callback && (user === null || user === void 0 ? void 0 : user.isLoggedIn)) {
            callback();
        }
        if (!redirectTo || !user) return;
        if (// If redirectTo is set, redirect if the user was not found.
        (redirectTo && !redirectIfFound && !(user === null || user === void 0 ? void 0 : user.isLoggedIn)) || // If redirectIfFound is also set, redirect if the user was found
        (redirectIfFound && (user === null || user === void 0 ? void 0 : user.isLoggedIn))) {
            next_router__WEBPACK_IMPORTED_MODULE_1___default().push(redirectTo);
        }
    }, [
        user,
        redirectIfFound,
        redirectTo
    ]);
    return {
        user,
        mutateUser
    };
};


/***/ })

};
;