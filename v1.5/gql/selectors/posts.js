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

export const POSTS_OF_USER = `
    ${DEFAULT}
    ${AUTHOR}
    ${COAUTORS}
    ${TAGS}
    ${COVERIMAGE}
    ${MONOGRAPH}
    ${COURSE}
    ${FILES}
`;