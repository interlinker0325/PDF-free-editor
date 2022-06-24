"use strict";
(() => {
var exports = {};
exports.id = 475;
exports.ids = [475];
exports.modules = {

/***/ 3463:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _postId_),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./utils/graphqlRequest.js + 5 modules
var graphqlRequest = __webpack_require__(5825);
;// CONCATENATED MODULE: external "axios"
const external_axios_namespaceObject = require("axios");
var external_axios_default = /*#__PURE__*/__webpack_require__.n(external_axios_namespaceObject);
;// CONCATENATED MODULE: ./utils/axios.js

const METHODS = {
    GET: "get",
    PUT: "put",
    POST: "post"
};
const request = async (method, URL, data, headers)=>await external_axios_default()({
        method: method,
        url: URL,
        data: data,
        headers: headers,
        timeout: 0
    })
;
const axios_post = async (URL, data, asFormData)=>{
    try {
        let headers = false;
        if (asFormData) {
            headers = {
                "Content-Type": "multipart/form-data"
            };
        }
        const response = await request(METHODS.POST, URL, data, headers);
        return {
            success: true,
            ...response === null || response === void 0 ? void 0 : response.data
        };
    } catch (error) {
        return {
            success: false,
            error
        };
    }
};
const axios_put = async (URL, data)=>{
    try {
        const response = await request(METHODS.PUT, URL, data);
        return {
            success: true,
            ...response === null || response === void 0 ? void 0 : response.data
        };
    } catch (error) {
        return {
            success: false,
            error
        };
    }
};
const get = async (URL, asText)=>{
    try {
        let headers = false;
        if (asText) {
            headers = {
                "Content-Type": "text/html"
            };
        }
        const response = await request(METHODS.GET, URL, null, headers);
        return asText ? {
            success: true,
            text: response === null || response === void 0 ? void 0 : response.data
        } : {
            success: true,
            ...response === null || response === void 0 ? void 0 : response.data
        };
    } catch (error) {
        return {
            success: false,
            error
        };
    }
};


;// CONCATENATED MODULE: ./handlers/bll.js

const createEntry = async ({ title , coverimage , description , category , files =[] , showathome =false , notice =false , author  })=>{
    const requestData = {
        title,
        coverimage,
        description,
        category,
        files,
        showathome,
        notice,
        author
    };
    const response = await post("/api/entry", requestData);
    if (response === null || response === void 0 ? void 0 : response.success) {
        return response.data;
    } else {
        return {
            error: response.error
        };
    }
};
const updateEntry = async (id, data)=>{
    data.sections = data.sections.map(({ imageRef , monographRef , ...rest })=>rest
    );
    const requestData = {
        id,
        ...data
    };
    const response = await put("/api/entry", requestData);
    if (response === null || response === void 0 ? void 0 : response.success) {
        return response.data;
    } else {
        return {
            error: response.error
        };
    }
};
const publishEntry = async (recordId)=>{
    const requestData = {
        recordId
    };
    const response = await post("/api/record", requestData);
    if (response === null || response === void 0 ? void 0 : response.success) {
        return response.data;
    } else {
        return {
            error: response.error
        };
    }
};
const newSection = async (recordId, sections = [])=>{
    const requestData = {
        id: recordId,
        sections
    };
    requestData.sections = requestData.sections.map(({ imageRef , monographRef , ...rest })=>rest
    );
    const response = await post("/api/section", requestData);
    if (response === null || response === void 0 ? void 0 : response.success) {
        return response.data;
    } else {
        return {
            error: response.error
        };
    }
};
const upload = async (files)=>{
    if (!files) return {
        error: "No file selected."
    };
    let formData = new FormData();
    Array.from(files).forEach((file)=>{
        formData.append("files", file);
    });
    const response = await post("/api/upload", formData, true);
    if (response === null || response === void 0 ? void 0 : response.success) {
        var ref;
        const data = (ref = response.data.uploads) === null || ref === void 0 ? void 0 : ref.map(({ id  })=>id
        );
        return data.length === 1 ? data[0] : data;
    } else {
        return {
            error: response.error
        };
    }
};
const getHTML = async (url)=>(await get(url, true)).text
;

// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
;// CONCATENATED MODULE: ./components/IFrame/IFrame.js


const IFrame = ({ url , ...props })=>{
    const iFrameRef = (0,external_react_.useRef)();
    const { 0: frameHeight , 1: setFrameHeight  } = (0,external_react_.useState)("100vh");
    (0,external_react_.useEffect)(()=>{
        if (iFrameRef.current) {
            var ref, ref1, ref2, ref3;
            setFrameHeight((ref = iFrameRef.current) === null || ref === void 0 ? void 0 : (ref1 = ref.contentWindow) === null || ref1 === void 0 ? void 0 : (ref2 = ref1.document) === null || ref2 === void 0 ? void 0 : (ref3 = ref2.body) === null || ref3 === void 0 ? void 0 : ref3.scrollHeight);
        }
    }, [
        iFrameRef
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx("iframe", {
        ref: iFrameRef,
        src: url,
        className: "border-none w-full my-4 overflow-unset",
        scrolling: "no",
        height: frameHeight,
        ...props
    });
};
/* harmony default export */ const IFrame_IFrame = (IFrame);

// EXTERNAL MODULE: ./components/Main/Main.js
var Main = __webpack_require__(2765);
// EXTERNAL MODULE: ./utils/useUser.js
var useUser = __webpack_require__(888);
;// CONCATENATED MODULE: ./components/Posts/Post.js





const Post = ({ entry , course  })=>{
    var ref, ref1;
    const { user  } = (0,useUser/* default */.Z)();
    const { 0: showFiles , 1: setshowFiles  } = (0,external_react_.useState)(false);
    const toggleShowFiles = ()=>setshowFiles(!showFiles)
    ;
    const author = entry === null || entry === void 0 ? void 0 : entry.author;
    const isCurrentUserAuthor = author.id === (user === null || user === void 0 ? void 0 : user.id);
    const files = entry === null || entry === void 0 ? void 0 : (ref = entry.files) === null || ref === void 0 ? void 0 : ref.map((file)=>/*#__PURE__*/ jsx_runtime_.jsx("a", {
            target: "_blank",
            href: file.url,
            className: "text-primary ml-4 text-xs underline underline-offset-1",
            children: file.title || file.filename
        }, `file_attachment_${file.id}`)
    );
    console.log("OVER HEre!!", entry, isCurrentUserAuthor);
    return /*#__PURE__*/ jsx_runtime_.jsx(Main/* default */.Z, {
        className: "",
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("article", {
            className: "flex flex-col gap-4 p-4",
            children: [
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "flex flex-row items-center justify-between pb-2 border-2 border-transparent rounded-none border-b-black",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("h2", {
                            className: "col-span-4 text-4xl",
                            children: entry.title
                        }),
                        isCurrentUserAuthor && /*#__PURE__*/ jsx_runtime_.jsx("a", {
                            href: `/posts/${entry.id}/edit`,
                            className: "text-primary text-lg",
                            children: "Editar Publicaci\xf3n >"
                        })
                    ]
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: "grid grid-cols-4 gap-4",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("section", {
                            className: "col-span-3",
                            children: entry.monografia && /*#__PURE__*/ jsx_runtime_.jsx(IFrame_IFrame, {
                                srcDoc: entry.monografia
                            })
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("aside", {
                            className: "col-span-1 flex flex-col gap-2 pl-4 border-2 border-transparent rounded-none border-l-black",
                            children: [
                                entry.curso && /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h3", {
                                    className: "text-lg",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "text-primary pr-2",
                                            children: "Curso:"
                                        }),
                                        entry.curso.title
                                    ]
                                }),
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h4", {
                                    className: "text-xs",
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                            className: "text-primary pr-2 text-lg",
                                            children: "Autor(es):"
                                        }),
                                        author.name,
                                        " ",
                                        author.lastname
                                    ]
                                }),
                                (entry === null || entry === void 0 ? void 0 : (ref1 = entry.coAutores) === null || ref1 === void 0 ? void 0 : ref1.length) > 0 && entry.coAutores.map((coAutor)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("h4", {
                                        className: "text-xs",
                                        children: [
                                            coAutor.name,
                                            " ",
                                            coAutor.lastname
                                        ]
                                    }, `co-autor_${coAutor.id}`)
                                ),
                                /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                    onClick: toggleShowFiles,
                                    className: "text-primary underline underline-offset-1",
                                    children: "Contenido Adjunto >"
                                }),
                                showFiles && files
                            ]
                        })
                    ]
                })
            ]
        })
    });
};
/* harmony default export */ const Posts_Post = (Post);

;// CONCATENATED MODULE: ./pages/posts/[postId]/index.js






const Posts = (props)=>{
    const router = (0,router_.useRouter)();
    (0,external_react_.useEffect)(()=>{
        if (!props.entry) router.push("/");
    }, [
        props
    ]);
    return /*#__PURE__*/ jsx_runtime_.jsx(Posts_Post, {
        ...props
    });
};
async function getServerSideProps({ params: { postId  }  }) {
    let { entry  } = await (0,graphqlRequest/* request */.WY)((0,graphqlRequest/* GET_ENTRY_BY_ID */.bW)(postId));
    if (entry === null || entry === void 0 ? void 0 : entry.monografia) {
        entry.monografia = await getHTML(entry.monografia.url);
    }
    console.log("OVER HERE!!!", entry);
    return {
        props: {
            entry
        }
    };
}
/* harmony default export */ const _postId_ = (Posts);


/***/ }),

/***/ 5805:
/***/ ((module) => {

module.exports = require("graphql-request");

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
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [765,825,256], () => (__webpack_exec__(3463)));
module.exports = __webpack_exports__;

})();