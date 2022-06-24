"use strict";
exports.id = 765;
exports.ids = [765];
exports.modules = {

/***/ 2765:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (/* binding */ Main)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(997);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

function Main({ title , actionItems , children , ...props }) {
    return /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("main", {
        className: styles.main,
        ...props,
        children: [
            title && /*#__PURE__*/ (0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
                className: styles.titleSection,
                children: [
                    /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("h1", {
                        className: styles.title,
                        children: title
                    }),
                    actionItems && /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("div", {
                        className: styles.btnGroup,
                        children: actionItems.length && actionItems.map((actionItem, actionIndex)=>/*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("button", {
                                ...actionItem.onClick ? actionItem.onClick : null,
                                className: `${styles.btn} ${actionIndex === 0 ? "btn-primary text-white" : ""}`,
                                children: actionItem.href ? /*#__PURE__*/ react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx("a", {
                                    href: actionItem.href,
                                    children: actionItem.text
                                }) : actionItem.text
                            }, `actionItem_${actionItem.text}_${actionIndex}`)
                        )
                    })
                ]
            }),
            children
        ]
    });
};
const styles = {
    main: "flex flex-col p-4",
    titleSection: "flex flex-row justify-between py-4",
    title: "text-4xl font-bold lowercase",
    btnGroup: "btn-group shadow-xl",
    btn: "btn hover:bg-primary hover:text-black"
};


/***/ })

};
;