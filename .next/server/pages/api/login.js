"use strict";
(() => {
var exports = {};
exports.id = 994;
exports.ids = [994];
exports.modules = {

/***/ 942:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "default": () => (/* binding */ login)
});

;// CONCATENATED MODULE: external "graphql-request"
const external_graphql_request_namespaceObject = require("graphql-request");
;// CONCATENATED MODULE: ./gql/getAllStudents.js
const studentId = "122038960";
const GET_ALL_STUDENTS = `
    allUsers(filter: {tipo: {eq: ${studentId}}}) {
        lastname
        name
        id
    }
`;

;// CONCATENATED MODULE: ./utils/graphqlRequest.js

const API_TOKEN = "2740db090e41f5be41a40780b3ff7d";
const request = (queries, preview = false)=>{
    try {
        const endpoint = preview ? `https://graphql.datocms.com/preview` : `https://graphql.datocms.com/`;
        const client = new external_graphql_request_namespaceObject.GraphQLClient(endpoint, {
            mode: "cors",
            headers: {
                authorization: `Bearer ${API_TOKEN}`
            }
        });
        const query = external_graphql_request_namespaceObject.gql`{
            ${queries}
        }`;
        return client.request(query);
    } catch (error) {
        console.error(error);
        return null;
    }
};









// EXTERNAL MODULE: ./utils/withSession.js + 1 modules
var withSession = __webpack_require__(612);
;// CONCATENATED MODULE: external "cors"
const external_cors_namespaceObject = require("cors");
var external_cors_default = /*#__PURE__*/__webpack_require__.n(external_cors_namespaceObject);
;// CONCATENATED MODULE: ./utils/initMiddleware.js
// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function initMiddleware(middleware) {
    return (req, res)=>new Promise((resolve, reject)=>{
            middleware(req, res, (result)=>{
                if (result instanceof Error) {
                    return reject(result);
                }
                return resolve(result);
            });
        })
    ;
};

;// CONCATENATED MODULE: ./gql/config.js
const gqlConfig = {
    API_URL: "https://api-us-east-1.graphcms.com/v2/ckx6o9nnz5r2p01xp07jv85yk/master"
};

;// CONCATENATED MODULE: ./gql/selectors/user.js
const EMAIL_PASSWORD = `email
    password`;
const AVATAR = `avatar {
        url
        title
        filename
    }`;
const SYSTEM = `createdAt
    updatedAt
    id
    tipo {
        nombre
        id
    }`;
const FULLNAME = `lastname
    name`;
const DETAILS = `experiencia
    genero
    nivel
    phone
    residencia
    username`;
const BIRTHDAY = `birthdate`;
const USER_LOGIN_DATA = `
    ${EMAIL_PASSWORD}
    ${AVATAR}
    ${SYSTEM}
    ${FULLNAME}
`;
const PUBLIC_USER_PROFILE = `
    ${EMAIL_PASSWORD}
    ${AVATAR}
    ${SYSTEM}
    ${FULLNAME}
    ${DETAILS}
`;
const PRIVATE_USER_PROFILE = `
    ${EMAIL_PASSWORD}
    ${AVATAR}
    ${SYSTEM}
    ${FULLNAME}
    ${DETAILS}
    ${BIRTHDAY}
`;

;// CONCATENATED MODULE: ./gql/selectors/posts.js
const DEFAULT = `id
    title
    updatedAt
    description
    createdAt
    aprobacion`;
const AUTHOR = `author {
        id
        name
        lastname
        email
    }`;
const COAUTORS = `coAutores {
        email
        name
        lastname
        id
    }`;
const TAGS = `tags {
        id
        tag
    }`;
const COVERIMAGE = `coverimage {
        url
        title
        filename
    }`;
const MONOGRAPH = `monografia {
        url
        title
        filename
    }`;
const COURSE = `curso {
        id
        title
    }`;
const FILES = `files {
        filename
        url
    }`;
const POSTS_OF_USER = `
    ${DEFAULT}
    ${AUTHOR}
    ${COAUTORS}
    ${TAGS}
    ${COVERIMAGE}
    ${MONOGRAPH}
    ${COURSE}
    ${FILES}
`;

;// CONCATENATED MODULE: ./gql/selectors/courses.js
const courses_DEFAULT = `createdAt
    description
    enabled
    id
    title
    updatedAt`;
const STUDENTS = `estudiantes {
        id
        lastname
        name
    }`;
const PROFESOR = `profesor {
        name
        lastname
        id
    }`;
const USER_COURSES = `
    ${courses_DEFAULT}
    ${STUDENTS}
    ${PROFESOR}
`;
const PROFESOR_COURSES = `
    ${courses_DEFAULT}
    ${STUDENTS}
    ${PROFESOR}
`;

;// CONCATENATED MODULE: ./gql/selectors/index.js




;// CONCATENATED MODULE: ./gql/queries/User.js

const GET_USER_LOGIN_DATA = (email)=>`
    user(filter: { email: { eq: "${email}" } }) {
        ${USER_LOGIN_DATA}
    }
`
;
const GET_PRIVATE_USER_PROFILE = (id)=>`
    user(filter: { id: { eq: "${id}" } }) {
        ${PRIVATE_USER_PROFILE}
    }
`
;
const GET_PUBLIC_USER_PROFILE = (id)=>`
    user(filter: { id: { eq: "${id}" } }) {
        ${PUBLIC_USER_PROFILE}
    }
`
;
const GET_USER_COURSES = (id)=>`
    allCourses(filter: {estudiantes: {eq: "${id}"}}) {
        ${USER_COURSES}
    }
`
;
const GET_PROFESOR_COURSES = (id)=>`
    allCourses(filter: {profesor: {eq: "${id}"}}) {
        ${PROFESOR_COURSES}
    }
`
;
const GET_USER_POSTS = (id)=>`
    allEntries(filter: { author: { eq: "${id}" } }) {
        ${POSTS_OF_USER}
    }
`
;

;// CONCATENATED MODULE: ./gql/queries/index.js



;// CONCATENATED MODULE: ./gql/index.js




;// CONCATENATED MODULE: ./pages/api/login.js





// Initialize the cors middleware
const cors = initMiddleware(// You can read more about the available options here: https://github.com/expressjs/cors#configuration-options
external_cors_default()({
    // Only allow requests with GET, POST and OPTIONS
    methods: [
        "GET",
        "POST",
        "OPTIONS"
    ]
}));
/* harmony default export */ const login = ((0,withSession/* default */.Z)(async (req, res)=>{
    await cors(req, res);
    const { email , password  } = await req.body;
    try {
        const { user: userData  } = await request([
            GET_USER_LOGIN_DATA(email)
        ]);
        if (userData.password === password) {
            delete userData.password;
            const user = {
                isLoggedIn: true,
                ...userData
            };
            req.session.set("user", user);
            await req.session.save();
            res.json(user);
        } else {
            res.status(401).json({
                msg: "Contrase\xf1a incorrecta"
            });
        }
    } catch (error) {
        console.error(error);
        res.status(401).json({
            msg: "Contrase\xf1a incorrecta"
        });
    }
}));


/***/ }),

/***/ 612:
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
var __webpack_exports__ = (__webpack_exec__(942));
module.exports = __webpack_exports__;

})();