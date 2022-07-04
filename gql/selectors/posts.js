const DEFAULT = `id
    title
    updatedAt
    description
    createdAt
    review`;

const AUTHOR = `author {
        id
        fullname
        email
    }`;

const COAUTORS = `coauthors {
        email
        fullname
        id
    }`;

const TAGS = `tags`;

const COVERIMAGE = `coverimage {
        url
        title
        filename
    }`;

const MONOGRAPH = `monograph {
        url
        title
        filename
    }`;

const COURSE = `course {
        id
        name
    }`;

const FILES = `attachments {
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