"use strict";
(() => {
var exports = {};
exports.id = 566;
exports.ids = [566];
exports.modules = {

/***/ 7092:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ posts_new),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
// EXTERNAL MODULE: ./components/Main/Main.js
var Main = __webpack_require__(2765);
// EXTERNAL MODULE: external "@fortawesome/react-fontawesome"
var react_fontawesome_ = __webpack_require__(7197);
// EXTERNAL MODULE: external "@fortawesome/free-solid-svg-icons"
var free_solid_svg_icons_ = __webpack_require__(6466);
;// CONCATENATED MODULE: ./components/Posts/CreatePost.js




const CreatePost = ({ form , courses , students , doSubmit , clearForm , onChange , refs  })=>{
    console.log("OVER HEre!!", courses, students);
    return /*#__PURE__*/ jsx_runtime_.jsx(Main/* default */.Z, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
            className: "grid auto-rows-auto gap-6",
            onSubmit: doSubmit,
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("section", {
                    className: "row-auto",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "form-control",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                            className: styles.titleInput,
                            type: "text",
                            name: "title",
                            placeholder: "T\xedtulo",
                            value: form.title,
                            onChange: (e)=>onChange(e, "title")
                        })
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                    className: "row-span-3 grid lg:grid-cols-2 auto-rows-auto gap-2",
                    children: [
                        /*#__PURE__*/ jsx_runtime_.jsx("div", {
                            className: "flex flex-col gap-2",
                            children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                className: "form-control gap-2",
                                children: [
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                        className: styles.label,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(react_fontawesome_.FontAwesomeIcon, {
                                                className: styles.icon,
                                                icon: free_solid_svg_icons_.faTags
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                                                className: styles.select,
                                                value: form.course,
                                                onChange: (e)=>onChange(e, "course")
                                                ,
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                        value: "default",
                                                        children: "Cursos"
                                                    }),
                                                    courses.map((course)=>/*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                            value: course.id,
                                                            children: course.title
                                                        }, `select_course_${course.id}`)
                                                    )
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                        className: styles.label,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(react_fontawesome_.FontAwesomeIcon, {
                                                className: styles.icon,
                                                icon: free_solid_svg_icons_.faFileCode
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        className: styles.fileInput,
                                                        type: "file",
                                                        name: "monograph",
                                                        id: "monografia",
                                                        ref: refs.monografia,
                                                        onChange: (e)=>onChange(e, "monografia")
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        htmlFor: "monografia",
                                                        className: styles.fileLabel,
                                                        children: "Agregar Monograf\xeda >"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                        className: styles.label,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(react_fontawesome_.FontAwesomeIcon, {
                                                className: styles.icon,
                                                icon: free_solid_svg_icons_.faImages
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        className: styles.fileInput,
                                                        type: "file",
                                                        name: "coverimage",
                                                        id: "coverimage",
                                                        ref: refs.coverimage,
                                                        onChange: (e)=>onChange(e, "coverimage")
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        htmlFor: "coverimage",
                                                        className: styles.fileLabel,
                                                        children: "Agregar imagen de Encabezado >"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                        className: styles.label,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(react_fontawesome_.FontAwesomeIcon, {
                                                className: styles.icon,
                                                icon: free_solid_svg_icons_.faTags
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                                        className: styles.fileInput,
                                                        type: "file",
                                                        name: "files",
                                                        id: "files",
                                                        multiple: true,
                                                        ref: refs.files,
                                                        onChange: (e)=>onChange(e, "files")
                                                    }),
                                                    /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                                        className: styles.fileLabel,
                                                        children: "Agregar contenido Adjunto >"
                                                    })
                                                ]
                                            })
                                        ]
                                    }),
                                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                                        className: styles.label,
                                        children: [
                                            /*#__PURE__*/ jsx_runtime_.jsx(react_fontawesome_.FontAwesomeIcon, {
                                                className: styles.icon,
                                                icon: free_solid_svg_icons_.faPeopleGroup
                                            }),
                                            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                                                className: styles.select,
                                                value: form.coAutores,
                                                onChange: (e)=>onChange(e, "coAutores")
                                                ,
                                                children: [
                                                    /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                                        value: "default",
                                                        children: "Co-Autores"
                                                    }),
                                                    students.map((student)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("option", {
                                                            value: student.id,
                                                            children: [
                                                                student.name,
                                                                " ",
                                                                student.lastname
                                                            ]
                                                        }, `select_student_${student.id}`)
                                                    )
                                                ]
                                            })
                                        ]
                                    })
                                ]
                            })
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "form-control gap-4",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("textarea", {
                                    className: styles.textarea,
                                    placeholder: "Agregar descripci\xf3n de la publicaci\xf3n",
                                    value: form.description,
                                    onChange: (e)=>onChange(e, "description")
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("textarea", {
                                    className: styles.textarea,
                                    placeholder: "Palabras claves (separado por espacio)",
                                    value: form.tags,
                                    onChange: (e)=>onChange(e, "tags")
                                })
                            ]
                        })
                    ]
                }),
                /*#__PURE__*/ jsx_runtime_.jsx("section", {
                    className: "row-auto",
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "form-control",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("label", {
                            className: styles.label,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("input", {
                                    type: "checkbox",
                                    className: styles.checkbox,
                                    ref: refs.acceptedTerms,
                                    checked: form.acceptedTerms,
                                    onChange: (e)=>onChange(e, "acceptedTerms")
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                    className: "label-text",
                                    children: "He leido y aceptado Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin id dolor ut leo vehicula maximus. Sed tristique eleifend fermentum. Aenean sodales ligula at risus fringilla, et consequat nisl tristique. Cras id risus auctor, facilisis neque vitae, tempor ante. Ut fringilla augue a laoreet fermentum. Aliquam consectetur venenatis est non convallis. Nullam in massa odio.Vestibulum sit amet ligula a eros lobortis efficitur. In elementum iaculis ipsum ut pretium. Nunc vitae ultrices nisl, fringilla accumsan lectus. Vestibulum at eleifend dolor. Sed fermentum enim enim, in commodo ligula semper in. Ut eget est lacinia, convallis sapien vel, gravida diam."
                                })
                            ]
                        })
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                    className: "row-auto items-center flex flex-row w-full justify-between",
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: "form-control flex flex-row gap-2",
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                    type: "submit",
                                    className: styles.button("secondary"),
                                    children: "Guardar"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                    type: "button",
                                    onClick: clearForm,
                                    className: styles.button("secondary"),
                                    children: "Cancelar"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("button", {
                                    type: "button",
                                    className: styles.button("warning"),
                                    children: "Solicitar Aprobaci\xf3n"
                                })
                            ]
                        }),
                        /*#__PURE__*/ jsx_runtime_.jsx("button", {
                            type: "button",
                            className: styles.button("primary"),
                            children: "Vista Previa"
                        })
                    ]
                })
            ]
        })
    });
};
const styles = {
    titleInput: "input text-2xl input-ghost border-transparent rounded-none w-full border-b-black",
    label: "cursor-pointer label justify-start gap-4",
    icon: "label-text w-8 h-8 text-sm",
    select: "select text-sm h-8 min-h-8 w-full max-w-xs pl-0 border-2 border-transparent rounded-none border-b-black",
    fileInput: "input hidden input-ghost w-full",
    fileLabel: "label-text border-2 border-transparent py-2 rounded-none border-b-black",
    textarea: "textarea rounded-none resize-none bg-secondary w-full h-1/2",
    checkbox: "checkbox checkbox-secondary",
    button: (type)=>`btn btn-${type} rounded-full`
};
/* harmony default export */ const Posts_CreatePost = (CreatePost);

// EXTERNAL MODULE: ./utils/graphqlRequest.js + 5 modules
var graphqlRequest = __webpack_require__(5825);
;// CONCATENATED MODULE: ./pages/posts/new.js




const formBaseState = {
    isGeneralFilled: false,
    title: "",
    description: "",
    coverimage: "",
    course: "Curso",
    files: [],
    monografia: null,
    error: false,
    tags: "",
    coAutores: "Co-Autores",
    acceptedTerms: false
};
const baseErrorMessage = (key)=>`${key} es requerido. Por favor ingresar ${key}`
;
const baseErrorState = {
    hasErrors: false,
    errorKey: null,
    errorMessage: null
};
const NewPost = (props)=>{
    const { 0: formState , 1: setFormState  } = (0,external_react_.useState)(formBaseState);
    const { 0: errorState , 1: setErrorState  } = (0,external_react_.useState)(baseErrorState);
    const clearSubmitForm = ()=>(0,external_react_.useState)(formBaseState)
    ;
    const refs = {
        files: (0,external_react_.useRef)(),
        coverimage: (0,external_react_.useRef)(),
        monografia: (0,external_react_.useRef)(),
        acceptedTerms: (0,external_react_.useRef)()
    };
    console.log("OVER HERE", props);
    const doSubmit = (e)=>{
        e.preventDefault();
        console.log("over here form", formState);
        Object.keys(formState).forEach((key)=>console.log("over here form", key, typeof key)
        );
    };
    const onChange = (e, name)=>{
        delete formState[name];
        const hasRef = refs[name];
        if (hasRef) {
            setFormState({
                [name]: refs[name].current.files || refs[name].current.checked,
                ...formState
            });
        } else {
            setFormState({
                [name]: e.target.value,
                ...formState
            });
        }
    };
    return /*#__PURE__*/ jsx_runtime_.jsx(Posts_CreatePost, {
        refs: refs,
        form: formState,
        error: errorState,
        doSubmit: doSubmit,
        clearForm: clearSubmitForm,
        onChange: onChange,
        ...props
    });
};
async function getServerSideProps() {
    const { allUsers , allCourses  } = await (0,graphqlRequest/* request */.WY)([
        graphqlRequest/* GET_ALL_COURSES */.gS,
        graphqlRequest/* GET_ALL_STUDENTS */.rm
    ]);
    return {
        props: {
            courses: allCourses,
            students: allUsers
        }
    };
}
// NewPost.pageTitle = 'Crear contenido';
/* harmony default export */ const posts_new = (NewPost);


/***/ }),

/***/ 6466:
/***/ ((module) => {

module.exports = require("@fortawesome/free-solid-svg-icons");

/***/ }),

/***/ 7197:
/***/ ((module) => {

module.exports = require("@fortawesome/react-fontawesome");

/***/ }),

/***/ 5805:
/***/ ((module) => {

module.exports = require("graphql-request");

/***/ }),

/***/ 6689:
/***/ ((module) => {

module.exports = require("react");

/***/ }),

/***/ 997:
/***/ ((module) => {

module.exports = require("react/jsx-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [765,825], () => (__webpack_exec__(7092)));
module.exports = __webpack_exports__;

})();