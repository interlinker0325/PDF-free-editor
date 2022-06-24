"use strict";
exports.id = 271;
exports.ids = [271];
exports.modules = {

/***/ 7271:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "T$": () => (/* reexport */ gqlConfig),
  "IO": () => (/* reexport */ queries_namespaceObject),
  "nZ": () => (/* reexport */ selectors_namespaceObject)
});

// NAMESPACE OBJECT: ./gql/selectors/user.js
var user_namespaceObject = {};
__webpack_require__.r(user_namespaceObject);
__webpack_require__.d(user_namespaceObject, {
  "Nx": () => (PRIVATE_USER_PROFILE),
  "m": () => (PUBLIC_USER_PROFILE),
  "FG": () => (USER_LOGIN_DATA)
});

// NAMESPACE OBJECT: ./gql/selectors/posts.js
var posts_namespaceObject = {};
__webpack_require__.r(posts_namespaceObject);
__webpack_require__.d(posts_namespaceObject, {
  "B": () => (POSTS_OF_USER)
});

// NAMESPACE OBJECT: ./gql/selectors/courses.js
var courses_namespaceObject = {};
__webpack_require__.r(courses_namespaceObject);
__webpack_require__.d(courses_namespaceObject, {
  "W": () => (PROFESOR_COURSES),
  "o": () => (USER_COURSES)
});

// NAMESPACE OBJECT: ./gql/selectors/index.js
var selectors_namespaceObject = {};
__webpack_require__.r(selectors_namespaceObject);
__webpack_require__.d(selectors_namespaceObject, {
  "ru": () => (courses_namespaceObject),
  "xu": () => (posts_namespaceObject),
  "EA": () => (user_namespaceObject)
});

// NAMESPACE OBJECT: ./gql/queries/User.js
var User_namespaceObject = {};
__webpack_require__.r(User_namespaceObject);
__webpack_require__.d(User_namespaceObject, {
  "GET_PRIVATE_USER_PROFILE": () => (GET_PRIVATE_USER_PROFILE),
  "GET_PROFESOR_COURSES": () => (GET_PROFESOR_COURSES),
  "GET_PUBLIC_USER_PROFILE": () => (GET_PUBLIC_USER_PROFILE),
  "GET_USER_COURSES": () => (GET_USER_COURSES),
  "GET_USER_LOGIN_DATA": () => (GET_USER_LOGIN_DATA),
  "GET_USER_POSTS": () => (GET_USER_POSTS)
});

// NAMESPACE OBJECT: ./gql/queries/Posts.js
var Posts_namespaceObject = {};
__webpack_require__.r(Posts_namespaceObject);
__webpack_require__.d(Posts_namespaceObject, {
  "GET_PROFESOR_COURSES_POSTS": () => (GET_PROFESOR_COURSES_POSTS)
});

// NAMESPACE OBJECT: ./gql/queries/index.js
var queries_namespaceObject = {};
__webpack_require__.r(queries_namespaceObject);
__webpack_require__.d(queries_namespaceObject, {
  "x": () => (Posts_namespaceObject),
  "E": () => (User_namespaceObject)
});

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

;// CONCATENATED MODULE: ./gql/queries/Posts.js
const GET_PROFESOR_COURSES_POSTS = (coursesIds)=>`
    allEntries(filter: {curso: {in: "${coursesIds.join(",")}"}}) {
        aprobacion
        createdAt
        id
        title
        description
    }
`
;

;// CONCATENATED MODULE: ./gql/queries/index.js



;// CONCATENATED MODULE: ./gql/index.js
// export * as MONKEYS from './queries/Monkeys';
// export * as ROLES from './queries/Roles';
// export * as ORGS from './queries/Orgs';
// export * as GROUPS from './queries/Groups';
// export * as SESSIONS from './queries/Sessions';





/***/ })

};
;