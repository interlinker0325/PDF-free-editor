"use strict";
(() => {
var exports = {};
exports.id = 405;
exports.ids = [405];
exports.modules = {

/***/ 456:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ pages),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(689);
// EXTERNAL MODULE: ./utils/graphqlRequest.js + 5 modules
var graphqlRequest = __webpack_require__(825);
// EXTERNAL MODULE: ./components/Main/Main.js
var Main = __webpack_require__(765);
;// CONCATENATED MODULE: ./components/HeroCards/HeroCards.js

// import HeroCard from 'components/HeroCards/HeroCard';
const HeroCards = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
        className: "grid grid-cols-7 gap-4 h-40",
        children: [
            /*#__PURE__*/ jsx_runtime_.jsx("article", {
                className: "card col-start-1 col-end-4 flex",
                children: /*#__PURE__*/ jsx_runtime_.jsx("figure", {
                    children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                        src: "logo_ucr.png"
                    })
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                className: "card bg-secondary text-center text-black col-start-4 col-end-6 flex",
                children: [
                    "segundo",
                    /*#__PURE__*/ jsx_runtime_.jsx("figure", {})
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
                className: "card bg-secondary text-center text-black col-start-6 col-end-8 flex",
                children: [
                    "tercero",
                    /*#__PURE__*/ jsx_runtime_.jsx("figure", {})
                ]
            })
        ]
    });
};
/* harmony default export */ const HeroCards_HeroCards = (HeroCards);

;// CONCATENATED MODULE: ./components/PostCard/PostCard.js

function Card({ id , title , description , curso , coverimage , notice  }) {
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("a", {
        href: `/posts/${id}`,
        className: "group card cursor-pointer bg-base-100 shadow-lg hover:shadow-xl",
        children: [
            coverimage && /*#__PURE__*/ jsx_runtime_.jsx("figure", {
                children: /*#__PURE__*/ jsx_runtime_.jsx("img", {
                    className: "max-h-48 w-full",
                    src: coverimage.url,
                    alt: coverimage.title
                })
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "card-body p-4 hover group-hover:bg-primary",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h2", {
                        className: "card-title text-base leading-5 group-hover:text-white",
                        children: [
                            title,
                            notice && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                                className: "badge badge-secondary",
                                children: "Atenci\xf3n"
                            })
                        ]
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        className: "text-sm max-w-prose text-ellipsis overflow-hidden line-clamp-2 group-hover:text-white",
                        children: description
                    }),
                    curso && /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "card-actions justify-end py-1",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "text-xs group-hover:bg-white group-hover:text-primary badge badge-outline p-2",
                            children: curso.title
                        })
                    })
                ]
            })
        ]
    });
};

// EXTERNAL MODULE: ./utils/useUser.js
var useUser = __webpack_require__(888);
// EXTERNAL MODULE: ./gql/index.js + 8 modules
var gql = __webpack_require__(271);
;// CONCATENATED MODULE: ./pages/index.js








const Home = ({ posts , currentPage , ...props })=>{
    const { user ={}  } = (0,useUser/* default */.Z)();
    const { 0: state , 1: setState  } = (0,external_react_.useState)({
        showMore: true,
        currentPage,
        posts
    });
    console.log("OVER HERE !$!@$!@$@!", gql/* selector.user.PUBLIC_USER_PROFILE */.nZ.EA.m, gql/* query.user.GET_USER_LOGIN_DATA */.IO.E.GET_USER_LOGIN_DATA);
    const getNextPage = async ()=>{
        const nextPage = state.currentPage + 1;
        const { allEntries  } = await (0,graphqlRequest/* request */.WY)((0,graphqlRequest/* GET_ALL_ENTRIES */.H9)(false, nextPage));
        const showMore = !(allEntries.length < 11);
        if (showMore) {
            const { allAdvertisements  } = await (0,graphqlRequest/* request */.WY)((0,graphqlRequest/* GET_ALL_ADS */.iW)(nextPage));
            allEntries.splice(1, 0, {
                ...allAdvertisements[0],
                isAd: true
            });
        }
        setState({
            showMore,
            currentPage: nextPage,
            posts: [
                ...state.posts,
                ...allEntries
            ],
            alerts: state.alerts
        });
    };
    console.log("OVER HERE POSTS!", state);
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)(Main/* default */.Z, {
        children: [
            user.isLoggedIn && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h3", {
                className: "text-primary self-end pb-4",
                children: [
                    "Bienvenid@ ",
                    user.name,
                    " ",
                    user.lastname
                ]
            }),
            /*#__PURE__*/ jsx_runtime_.jsx(HeroCards_HeroCards, {}),
            /*#__PURE__*/ jsx_runtime_.jsx("div", {
                className: "my-8 grid grid-cols-4 gap-4",
                children: state.posts && state.posts.map((post)=>/*#__PURE__*/ jsx_runtime_.jsx(Card, {
                        ...post
                    }, `Post-Home-${post.id}`)
                )
            })
        ]
    });
};
async function getServerSideProps() {
    const CURRENT_PAGE = 1;
    const { allEntries  } = await (0,graphqlRequest/* request */.WY)((0,graphqlRequest/* GET_ALL_ENTRIES */.H9)(CURRENT_PAGE));
    return {
        props: {
            currentPage: CURRENT_PAGE,
            posts: allEntries
        }
    };
}
/* harmony default export */ const pages = (Home);


/***/ }),

/***/ 805:
/***/ ((module) => {

module.exports = require("graphql-request");

/***/ }),

/***/ 853:
/***/ ((module) => {

module.exports = require("next/router");

/***/ }),

/***/ 689:
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
var __webpack_exports__ = __webpack_require__.X(0, [765,825,271,256], () => (__webpack_exec__(456)));
module.exports = __webpack_exports__;

})();