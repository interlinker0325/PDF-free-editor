"use strict";
(() => {
var exports = {};
exports.id = 888;
exports.ids = [888];
exports.modules = {

/***/ 8740:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _app)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);
;// CONCATENATED MODULE: external "next/head"
const head_namespaceObject = require("next/head");
var head_default = /*#__PURE__*/__webpack_require__.n(head_namespaceObject);
;// CONCATENATED MODULE: ./components/Header/Header.js

function Header({ items =[]  }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("nav", {
        className: "navbar bg-primary shadow-md",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "flex-initial",
                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                    href: "/",
                    className: " btn text-white btn-ghost normal-case text-4xl tracking-widest",
                    children: "Adlyceum"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "flex-auto justify-end sm:justify-end sm:pr-4 gap-2",
                children: /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                    className: "menu menu-horizontal text-white p-0",
                    children: items.map((item, index)=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                ...item.onClick ? {
                                    onClick: item.onClick
                                } : {
                                    href: item.action
                                },
                                children: item.name
                            })
                        }, `Header-nav-item-${index}`)
                    )
                })
            })
        ]
    });
};
;

;// CONCATENATED MODULE: ./components/Footer/Footer.js

function Footer({ items  }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("footer", {
        className: "footer items-center p-4 bg-secondary text-black",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "flex-initial",
                children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                    className: "",
                    children: "Copyright"
                })
            }),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "flex-auto w-full justify-end sm:pr-4 gap-2",
                children: /*#__PURE__*/ jsx_runtime_.jsx("ul", {
                    className: "menu menu-horizontal p-0",
                    children: items.map((item, index)=>/*#__PURE__*/ jsx_runtime_.jsx("li", {
                            children: /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                ...item.onClick ? {
                                    onClick: item.onClick
                                } : {
                                    href: item.action
                                },
                                children: item.name
                            })
                        }, `Footer-nav-item-${index}`)
                    )
                })
            })
        ]
    });
};
;

// EXTERNAL MODULE: ./utils/useUser.js
var useUser = __webpack_require__(888);
;// CONCATENATED MODULE: ./utils/fetchJson.js
const fetchJson = async function(...args) {
    try {
        const response = await fetch(...args);
        const data = await response.json();
        if (response.ok) {
            return data;
        }
        const error = new Error(response.statusText);
        error.response = response;
        error.data = data;
        throw error;
    } catch (error) {
        if (!error.data) {
            error.data = {
                message: error.message
            };
        }
        throw error;
    }
};
/* harmony default export */ const utils_fetchJson = (fetchJson);

;// CONCATENATED MODULE: ./components/Modal/Modal.js

const Modal = ({ display , onClose , ...props })=>{
    if (!display) {
        return null;
    }
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "flex fixed overflow-y-auto inset-0 bg-backdrop justify-center content-center z-[100]",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: "flex flex-col bg-white card my-36 w-2/5 h-2/4 max-h-128",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("button", {
                    className: "self-end text-black pr-4 pt-2",
                    onClick: onClose,
                    children: "x"
                }),
                props.children
            ]
        })
    });
};
/* harmony default export */ const Modal_Modal = (Modal);

;// CONCATENATED MODULE: ./components/LoginModal/LoginModal.js





const LoginModal = ({ onClose , display  })=>{
    const { mutateUser  } = (0,useUser/* default */.Z)({
        callback: onClose
    });
    const { 0: errorMsg , 1: setErrorMsg  } = (0,external_react_.useState)("");
    async function handleSubmit(e) {
        e.preventDefault();
        const body = {
            email: e.currentTarget.email.value,
            password: e.currentTarget.password.value
        };
        try {
            mutateUser(await utils_fetchJson("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(body)
            }));
        } catch (error) {
            console.error("An unexpected error happened:", error);
            setErrorMsg(error.data);
        }
    }
    return /*#__PURE__*/ jsx_runtime_.jsx(Modal_Modal, {
        onClose: onClose,
        display: display,
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
            onSubmit: handleSubmit,
            className: "py-10 px-16 grid grid-cols-1 gap-6 text-lg w-full p-8",
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("h3", {
                    className: "text-2xl font-bold justify-self-center",
                    children: "Iniciar Sesi\xf3n"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                    type: "email",
                    name: "email",
                    role: "email",
                    placeholder: "Correo Electr\xf3nico"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                    type: "password",
                    name: "password",
                    role: "password",
                    placeholder: "Contrase\xf1a"
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("button", {
                    type: "submit",
                    className: "btn btn-primary rounded-full",
                    children: "login"
                })
            ]
        })
    });
};
/* harmony default export */ const LoginModal_LoginModal = (LoginModal);

// EXTERNAL MODULE: external "swr"
var external_swr_ = __webpack_require__(549);
;// CONCATENATED MODULE: ./pages/_app.js











function MyApp({ Component , pageProps  }) {
    const { 0: displayModal , 1: setDisplayModal  } = (0,external_react_.useState)(false);
    const closeModal = ()=>setDisplayModal(false)
    ;
    const { mutateUser , user ={}  } = (0,useUser/* default */.Z)();
    const sessionText = `${user.isLoggedIn ? "Cerrar" : "Iniciar"} Sesión`;
    const doLogout = async (e)=>{
        e.preventDefault();
        mutateUser(await utils_fetchJson("/api/logout", {
            method: "POST"
        }), false);
        closeModal();
    };
    const sessionAction = user.isLoggedIn ? doLogout : ()=>setDisplayModal(true)
    ;
    const navItems = [
        {
            name: "Inicio",
            action: "/"
        },
        {
            name: "Crear Publicaci\xf3n",
            action: "/posts/new"
        },
        {
            name: "Mi Perfil",
            action: "/profile/me"
        },
        {
            name: sessionText,
            onClick: sessionAction
        }
    ];
    return /*#__PURE__*/ jsx_runtime_.jsx((external_react_default()).Fragment, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)(external_swr_.SWRConfig, {
            value: {
                fetcher: utils_fetchJson,
                onError: (err)=>{
                    console.error(err);
                }
            },
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)((head_default()), {
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("title", {
                            children: [
                                Component.pageTitle ? `${Component.pageTitle} | ` : "",
                                "ADLYCEUM"
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("link", {
                            rel: "icon",
                            href: "/favicon.ico"
                        })
                    ]
                }),
                !Component.hideNav ? /*#__PURE__*/ jsx_runtime_.jsx(Header, {
                    items: navItems
                }) : null,
                /*#__PURE__*/ jsx_runtime_.jsx(Component, {
                    ...pageProps
                }),
                !Component.hideFooter ? /*#__PURE__*/ jsx_runtime_.jsx(Footer, {
                    items: navItems
                }) : null,
                displayModal && /*#__PURE__*/ jsx_runtime_.jsx(LoginModal_LoginModal, {
                    onClose: closeModal,
                    display: displayModal
                })
            ]
        })
    });
}
/* harmony default export */ const _app = (MyApp);


/***/ }),

/***/ 1853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ }),

/***/ 549:
/***/ ((module) => {

module.exports = require("swr");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [256], () => (__webpack_exec__(8740)));
module.exports = __webpack_exports__;

})();