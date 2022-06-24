"use strict";
(() => {
var exports = {};
exports.id = 111;
exports.ids = [111];
exports.modules = {

/***/ 248:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ _profileId_),
  "getServerSideProps": () => (/* binding */ getServerSideProps)
});

// EXTERNAL MODULE: external "react/jsx-runtime"
var jsx_runtime_ = __webpack_require__(997);
// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(6689);
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

// EXTERNAL MODULE: ./utils/graphqlRequest.js + 5 modules
var graphqlRequest = __webpack_require__(5825);
// EXTERNAL MODULE: ./gql/index.js + 8 modules
var gql = __webpack_require__(7271);
// EXTERNAL MODULE: ./components/Main/Main.js
var Main = __webpack_require__(2765);
// EXTERNAL MODULE: external "next/router"
var router_ = __webpack_require__(1853);
// EXTERNAL MODULE: external "@fortawesome/react-fontawesome"
var react_fontawesome_ = __webpack_require__(7197);
// EXTERNAL MODULE: external "@fortawesome/free-solid-svg-icons"
var free_solid_svg_icons_ = __webpack_require__(6466);
;// CONCATENATED MODULE: ./components/Profile/UserInfo.js

const UserInfo = ({ name , email , lastname , phone , birthdate , residencia , genero , nivel , experiencia  })=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
        className: "flex flex-col gap-4",
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex flex-col border-b-black border-b-2 pb-4",
                children: [
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h4", {
                        className: "text-black text-md",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "text-primary text-lg",
                                children: "Nombre completo:"
                            }),
                            " ",
                            name,
                            " ",
                            lastname
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h4", {
                        className: "text-black text-md",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "text-primary text-lg",
                                children: "Correo:"
                            }),
                            " ",
                            email
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h4", {
                        className: "text-black text-md",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "text-primary text-lg",
                                children: "N\xfamero Telef\xf3nico:"
                            }),
                            " ",
                            phone
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h4", {
                        className: "text-black text-md",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "text-primary text-lg",
                                children: "Fecha de nacimiento:"
                            }),
                            " ",
                            birthdate
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h4", {
                        className: "text-black text-md",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "text-primary text-lg",
                                children: "G\xe9nero:"
                            }),
                            " ",
                            genero
                        ]
                    }),
                    /*#__PURE__*/ (0,jsx_runtime_.jsxs)("h4", {
                        className: "text-black text-md",
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("span", {
                                className: "text-primary text-lg",
                                children: "Residencia:"
                            }),
                            " ",
                            residencia
                        ]
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex flex-col gap-0",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                        className: "text-md text-primary text-lg",
                        children: "Carrera/Universidad/Nivel:"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        children: nivel
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex flex-col gap-0",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                        className: "text-md text-primary text-lg",
                        children: "Experiencia laboral:"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("p", {
                        children: experiencia
                    })
                ]
            })
        ]
    });
};
/* harmony default export */ const Profile_UserInfo = (UserInfo);

;// CONCATENATED MODULE: ./utils/index.js
// Constants
const regex = {
    email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    phone: /[\+\(]{0,2}\d{1,4}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}[\.\-\s\(\)]*\d{1}/,
    string: /^[\w'\-,.][^0-9_!¡?÷?¿/\\+=@#$%ˆ&*(){}|~<>;:[\]]{2,}$/,
    hyperLynk: /^(http: \/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
    month: new RegExp(`^(0[1-9]|1[0-2])$`),
    year: new RegExp(`^([0-9][0-9])$`),
    amexCard: new RegExp("^(?:3[47][0-9]{13})$"),
    script: new RegExp(`<script[^<]*</script>`, "g")
};
const isBrowser = (/* unused pure expression or super */ null && ("undefined" !== "undefined"));
// Functions
const isTheSameObject = (object1, object2)=>JSON.stringify(Object.values(object1).sort()) === JSON.stringify(Object.values(object2).sort())
;
const isTheSameArray = (arr1, arr2)=>arr1 && arr2 && arr1.length === arr2.length && arr1.every((value1)=>arr2.some((value2)=>isTheSameObject(value1, value2)
        )
    )
;
const objectHasValues = (object1)=>object1 && Object.values(object1).length > 0 && Object.values(object1).every((value)=>value !== undefined
    )
;
const arrayHasValues = (arr)=>arr && Array.isArray(arr) && arr.length > 0 ? true : false
;
const downloadToCSV = (fileName, data, isBlob = true)=>{
    let a = document.createElement("a");
    if (isBlob) {
        const file = new Blob([
            data
        ], {
            type: "text/csv;charset=utf-8;"
        });
        a.href = window.URL.createObjectURL(file);
        ;
        a.download = `${fileName}-${Date.now()}.csv`;
    } else {
        a.href = "data:text/csv;charset=utf-8," + encodeURI(data);
        a.download = fileName;
    }
    a.click();
};
const isOdd = (num)=>num % 2
;

;// CONCATENATED MODULE: ./components/Profile/Courses.js


const Courses = ({ items  })=>{
    console.log("OVER HERE!!!", items);
    return /*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "overflow-x-auto",
        children: /*#__PURE__*/ jsx_runtime_.jsx("table", {
            className: "w-full",
            children: /*#__PURE__*/ jsx_runtime_.jsx("tbody", {
                children: items && items.map((item, itemIndex)=>/*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                        className: `flex flex-row justify-between w-full py-2 px-4 ${!isOdd(itemIndex) ? "bg-secondary" : ""}`,
                        children: [
                            /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                className: "rounded-l-none rounded-r-none w-full",
                                children: item.title
                            }),
                            /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                className: `rounded-l-none rounded-r-none ${item.enabled ? "text-success" : "text-secondary"}`,
                                children: item.enabled ? "Activo" : "Inactivo"
                            })
                        ]
                    }, `User_courses_${itemIndex}`)
                )
            })
        })
    });
};
/* harmony default export */ const Profile_Courses = (Courses);

;// CONCATENATED MODULE: ./components/Profile/Publications.js


const Publications = ({ items  })=>/*#__PURE__*/ jsx_runtime_.jsx("div", {
        className: "overflow-x-auto",
        children: /*#__PURE__*/ jsx_runtime_.jsx("table", {
            className: "w-full",
            children: /*#__PURE__*/ jsx_runtime_.jsx("tbody", {
                children: items && items.map((item, itemIndex)=>/*#__PURE__*/ jsx_runtime_.jsx("a", {
                        href: `/posts/${item.id}`,
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("tr", {
                            className: `${styles.tableRow} ${!isOdd(itemIndex) ? "bg-secondary" : ""}`,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                    className: styles.title,
                                    children: item.title
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("td", {
                                    className: `${styles.status} ${styles[item.aprobacion]}`,
                                    children: item.aprobacion
                                })
                            ]
                        })
                    }, `User_posts_${itemIndex}`)
                )
            })
        })
    })
;
const styles = {
    tableRow: "flex flex-row justify-between w-full py-2 px-4 hover:text-primary",
    title: "rounded-l-none rounded-r-none w-full",
    status: "rounded-l-none rounded-r-none",
    Aprobado: "text-success",
    Denegado: "text-error",
    Pendiente: "text-black"
};
/* harmony default export */ const Profile_Publications = (Publications);

;// CONCATENATED MODULE: ./components/Profile/EditProfile.js




const EditProfile = ()=>{
    return /*#__PURE__*/ (0,jsx_runtime_.jsxs)("form", {
        className: "flex flex-col gap-4",
        onSubmit: (e)=>e.preventDefault()
        ,
        children: [
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("section", {
                className: "flex flex-col border-b-black border-b-2 pb-8 gap-1",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "form-control",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                            className: EditProfile_styles.titleInput,
                            type: "text",
                            name: "fullname",
                            placeholder: "Nombre completo *",
                            value: "",
                            onChange: (e)=>onChange(e, "fullname")
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "form-control",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                            className: EditProfile_styles.titleInput,
                            type: "email",
                            name: "email",
                            placeholder: "Correo *",
                            value: "",
                            onChange: (e)=>onChange(e, "email")
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "form-control",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                            className: EditProfile_styles.titleInput,
                            type: "tel",
                            name: "phone",
                            placeholder: "N\xfamero telef\xf3nico",
                            value: "",
                            onChange: (e)=>onChange(e, "phone")
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "form-control",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                            className: EditProfile_styles.titleInput,
                            type: "date",
                            name: "birthday",
                            placeholder: "Fecha de nacimiento",
                            value: "",
                            onChange: (e)=>onChange(e, "birthday")
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "form-control",
                        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("select", {
                            className: EditProfile_styles.select,
                            value: "",
                            onChange: (e)=>onChange(e, "genero")
                            ,
                            children: [
                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                    value: "default",
                                    children: "G\xe9nero"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                    value: "Masculino",
                                    children: "Masculino"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                    value: "Femenino",
                                    children: "Femenino"
                                }),
                                /*#__PURE__*/ jsx_runtime_.jsx("option", {
                                    value: "Otro",
                                    children: "Otro"
                                })
                            ]
                        })
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: "form-control",
                        children: /*#__PURE__*/ jsx_runtime_.jsx("input", {
                            className: EditProfile_styles.titleInput,
                            type: "text",
                            name: "residencia",
                            placeholder: "Residencia (provincia/canton/distrito)",
                            value: "",
                            onChange: (e)=>onChange(e, "residencia")
                        })
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex flex-col gap-0",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                        className: "text-md text-primary text-lg",
                        children: "Carrera/Universidad/Nivel:"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("textarea", {
                        className: EditProfile_styles.textarea,
                        placeholder: "Agregar descripci\xf3n de la publicaci\xf3n",
                        value: "",
                        onChange: (e)=>onChange(e, "description")
                    })
                ]
            }),
            /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                className: "flex flex-col gap-0",
                children: [
                    /*#__PURE__*/ jsx_runtime_.jsx("h4", {
                        className: "text-md text-primary text-lg",
                        children: "Experiencia laboral:"
                    }),
                    /*#__PURE__*/ jsx_runtime_.jsx("textarea", {
                        className: EditProfile_styles.textarea,
                        placeholder: "Agregar descripci\xf3n de la publicaci\xf3n",
                        value: "",
                        onChange: (e)=>onChange(e, "description")
                    })
                ]
            })
        ]
    });
};
const EditProfile_styles = {
    titleInput: "input input-sm input-ghost border-transparent rounded-none w-full border-b-black",
    label: "cursor-pointer label justify-start gap-4",
    icon: "label-text w-8 h-8 text-sm",
    select: "select input-ghost text-sm h-8 min-h-8 w-full pl-3 border-1 border-transparent rounded-none border-b-black",
    fileInput: "input hidden input-ghost w-full",
    fileLabel: "label-text border-2 border-transparent py-2 rounded-none border-b-black",
    textarea: "textarea rounded-none resize-none bg-secondary w-full h-1/2",
    checkbox: "checkbox checkbox-secondary",
    button: (type)=>`btn btn-${type} rounded-full`
};
/* harmony default export */ const Profile_EditProfile = (EditProfile);

;// CONCATENATED MODULE: ./utils/user.js
const USER_TYPE_NAMES = {
    SUPLENTE: "Suplente",
    PROFESOR: "Profesor",
    ESTUDIANTE: "Estudiante",
    DIRECTOR: "Director",
    ADMINISTRADOR: "Administrador"
};
const USER_TYPE_BY_ID = {
    "122038962": USER_TYPE_NAMES.SUPLENTE,
    "122038961": USER_TYPE_NAMES.PROFESOR,
    "122038960": USER_TYPE_NAMES.ESTUDIANTE,
    "122038959": USER_TYPE_NAMES.DIRECTOR,
    "122038958": USER_TYPE_NAMES.ADMINISTRADOR
};
const user_isProfessor = (typeId)=>USER_TYPE_BY_ID[typeId] === USER_TYPE_NAMES.PROFESOR || USER_TYPE_BY_ID[typeId] === USER_TYPE_NAMES.SUPLENTE
;

;// CONCATENATED MODULE: ./pages/profile/[profileId].js














const CURRENT_USER_PROFILE_ID = "me";
const VIEW_STATES = {
    USER: "userInfo",
    COURSE: "courses",
    POSTS: "posts",
    EDIT: "editProfile",
    ARCHIVE: "ARCHIVE"
};
const Profile = ({ profile , courses , posts , archivePosts , isProfessor  })=>{
    const { 0: activeView , 1: setActiveView  } = (0,external_react_.useState)(VIEW_STATES.USER);
    const { query: { profileId  }  } = (0,router_.useRouter)();
    const mainRef = (0,external_react_.useRef)();
    const isCurrentUserProfile = profileId === CURRENT_USER_PROFILE_ID;
    console.log("OVER HERE!!!", archivePosts, isCurrentUserProfile, profile, isProfessor, posts);
    return /*#__PURE__*/ jsx_runtime_.jsx(Main/* default */.Z, {
        children: /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
            className: _profileId_styles.mainContainer,
            children: [
                /*#__PURE__*/ jsx_runtime_.jsx("div", {
                    className: _profileId_styles.leftContainer,
                    children: /*#__PURE__*/ jsx_runtime_.jsx("div", {
                        className: _profileId_styles.avatarCard,
                        children: /*#__PURE__*/ jsx_runtime_.jsx(react_fontawesome_.FontAwesomeIcon, {
                            className: "py- min-w-fit text-2xl",
                            icon: free_solid_svg_icons_.faCircleUser
                        })
                    })
                }),
                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                    className: _profileId_styles.rightContainer,
                    children: [
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: _profileId_styles.tabs,
                            children: [
                                /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                                    children: [
                                        /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                            className: activeView === VIEW_STATES.USER ? _profileId_styles.activeTab : _profileId_styles.tabItem,
                                            onClick: ()=>setActiveView(VIEW_STATES.USER)
                                            ,
                                            children: "Data personal"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                            className: activeView === VIEW_STATES.COURSE ? _profileId_styles.activeTab : _profileId_styles.tabItem,
                                            onClick: ()=>setActiveView(VIEW_STATES.COURSE)
                                            ,
                                            children: "Cursos"
                                        }),
                                        /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                            className: activeView === VIEW_STATES.POSTS ? _profileId_styles.activeTab : _profileId_styles.tabItem,
                                            onClick: ()=>setActiveView(VIEW_STATES.POSTS)
                                            ,
                                            children: "Publicaciones"
                                        }),
                                        isProfessor && isCurrentUserProfile && /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                            className: activeView === VIEW_STATES.ARCHIVE ? _profileId_styles.activeTab : _profileId_styles.tabItem,
                                            onClick: ()=>setActiveView(VIEW_STATES.ARCHIVE)
                                            ,
                                            children: "Archivo"
                                        })
                                    ]
                                }),
                                isCurrentUserProfile && /*#__PURE__*/ jsx_runtime_.jsx("a", {
                                    className: activeView === VIEW_STATES.EDIT ? _profileId_styles.activeTab : _profileId_styles.tabItem,
                                    onClick: ()=>setActiveView(VIEW_STATES.EDIT)
                                    ,
                                    children: "Editar Perfil >"
                                })
                            ]
                        }),
                        /*#__PURE__*/ (0,jsx_runtime_.jsxs)("div", {
                            className: _profileId_styles.tabContent,
                            children: [
                                activeView === VIEW_STATES.USER && /*#__PURE__*/ jsx_runtime_.jsx(Profile_UserInfo, {
                                    name: profile.name,
                                    lastname: profile.lastname,
                                    email: profile.email,
                                    genero: profile.genero,
                                    phone: profile.phone,
                                    birthdate: profile.birthdate,
                                    residencia: profile.residencia,
                                    nivel: profile.nivel,
                                    experiencia: profile.experiencia
                                }),
                                activeView === VIEW_STATES.COURSE && /*#__PURE__*/ jsx_runtime_.jsx(Profile_Courses, {
                                    items: courses
                                }),
                                activeView === VIEW_STATES.POSTS && /*#__PURE__*/ jsx_runtime_.jsx(Profile_Publications, {
                                    items: posts
                                }),
                                activeView === VIEW_STATES.ARCHIVE && /*#__PURE__*/ jsx_runtime_.jsx(Profile_Publications, {
                                    items: archivePosts
                                }),
                                activeView === VIEW_STATES.EDIT && /*#__PURE__*/ jsx_runtime_.jsx(Profile_EditProfile, {})
                            ]
                        })
                    ]
                })
            ]
        })
    });
};
const _profileId_styles = {
    mainContainer: "my-8 grid grid-cols-4 gap-8",
    leftContainer: "",
    rightContainer: "col-span-3 flex flex-col gap-4",
    avatarCard: "card text-gray-400 bg-secondary rounded-none h-60",
    tabs: "tabs border-transparent border-b-black border-b-2 w-full justify-between",
    tabItem: "tab pl-0",
    activeTab: "tab tab-active text-primary pl-0",
    tabContent: "border-b-black border-b-2 pb-4"
};
const getServerSideProps = withSession(async function({ req , res  }) {
    const currentUser = req.session.get("user");
    const urlSplit = req.url.split("/");
    const userIdParam = urlSplit[urlSplit.length - 1];
    const isCurrentUserProfile = userIdParam === CURRENT_USER_PROFILE_ID && currentUser;
    const isProfessor = user_isProfessor(currentUser.tipo.id);
    const profileId = isCurrentUserProfile ? currentUser.id : userIdParam;
    const profileQuery = isCurrentUserProfile ? gql/* query.user.GET_PRIVATE_USER_PROFILE */.IO.E.GET_PRIVATE_USER_PROFILE : gql/* query.user.GET_PUBLIC_USER_PROFILE */.IO.E.GET_PUBLIC_USER_PROFILE;
    const { user: profile , allCourses , allEntries: posts  } = await (0,graphqlRequest/* request */.WY)([
        profileQuery(profileId),
        isProfessor && isCurrentUserProfile ? gql/* query.user.GET_PROFESOR_COURSES */.IO.E.GET_PROFESOR_COURSES(profileId) : gql/* query.user.GET_USER_COURSES */.IO.E.GET_USER_COURSES(profileId),
        gql/* query.user.GET_USER_POSTS */.IO.E.GET_USER_POSTS(profileId), 
    ]);
    let archivePosts = {};
    if (isProfessor && isCurrentUserProfile) {
        const profesorCourses = allCourses.map((course)=>course.id
        );
        console.log("OVER HERE SADSA!!", profesorCourses);
        archivePosts = await (0,graphqlRequest/* request */.WY)(gql/* query.posts.GET_PROFESOR_COURSES_POSTS */.IO.x.GET_PROFESOR_COURSES_POSTS(profesorCourses));
    }
    return {
        props: {
            profile,
            courses: allCourses,
            posts: posts,
            archivePosts: archivePosts.allEntries || [],
            isProfessor
        }
    };
});
/* harmony default export */ const _profileId_ = (Profile);


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

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, [765,271,825], () => (__webpack_exec__(248)));
module.exports = __webpack_exports__;

})();