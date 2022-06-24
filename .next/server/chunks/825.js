"use strict";
exports.id = 825;
exports.ids = [825];
exports.modules = {

/***/ 825:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {


// EXPORTS
__webpack_require__.d(__webpack_exports__, {
  "iW": () => (/* reexport */ GET_ALL_ADS),
  "gS": () => (/* reexport */ GET_ALL_COURSES),
  "H9": () => (/* reexport */ GET_ALL_ENTRIES),
  "rm": () => (/* reexport */ GET_ALL_STUDENTS),
  "bW": () => (/* reexport */ GET_ENTRY_BY_ID),
  "WY": () => (/* binding */ request)
});

// UNUSED EXPORTS: GET_ALL_CATEGORIES, GET_COURSE, GET_USER_BY_EMAIL

// EXTERNAL MODULE: external "graphql-request"
var external_graphql_request_ = __webpack_require__(805);
;// CONCATENATED MODULE: ./gql/getAllEntries.js
const GET_ALL_ENTRIES = (page = 1, limit = 11)=>`
    allEntries(
        orderBy: _createdAt_DESC,
        first: "${limit}",
        skip: "${page > 1 ? (page - 1) * 11 : 0}"
        filter: {
            aprobacion: {eq: "Aprobado"}
        }
    ) {
        title
        description
        id
        coverimage {
            filename
            title
            url
        }
        curso {
            id
            title
        }
    }
`
;

;// CONCATENATED MODULE: ./gql/getEntryById.js
const GET_ENTRY_BY_ID = (entryId)=>`
    entry(filter: { id: { eq: ${entryId} } }) {
        author {
            name
            lastname
            id
        }
        coAutores {
            name
            lastname
            id
        }
        coverimage {
            id
            filename
            title
            url
        }
        curso {
            id
            title
        }
        createdAt
        description(markdown: false)
        files {
            filename
            id
            title
            url
        }
        id
        monografia {
            filename
            id
            title
            url
        }
        title
        tags {
            id
            tag
        }
        updatedAt
    }
`
;

;// CONCATENATED MODULE: ./gql/getAllAdvertisement.js
const GET_ALL_ADS = (page = 1)=>`
    allAdvertisements(
        first: "${page}",
        skip: "${page - 1}"
    ) {
        url
        description
        id
        name
        createdAt
        updatedAt
        image {
            alt
            filename
            id
            format
            title
            url
            video {
                streamingUrl
                thumbnailUrl
                mp4Url
            }
        }
    }
`
;

;// CONCATENATED MODULE: ./gql/getAllCourses.js
const GET_ALL_COURSES = `
    allCourses {
        id
        title
    }
`;

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
        const client = new external_graphql_request_.GraphQLClient(endpoint, {
            mode: "cors",
            headers: {
                authorization: `Bearer ${API_TOKEN}`
            }
        });
        const query = external_graphql_request_.gql`{
            ${queries}
        }`;
        return client.request(query);
    } catch (error) {
        console.error(error);
        return null;
    }
};










/***/ })

};
;